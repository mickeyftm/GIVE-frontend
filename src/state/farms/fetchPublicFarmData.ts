import BigNumber from 'bignumber.js'
import masterchefABI from 'config/abi/masterchef.json'
import erc20 from 'config/abi/erc20.json'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber'
import multicall from 'utils/multicall'
import { Farm, SerializedBigNumber } from '../types'

type PublicFarmData = {
  tokenAmountMc: SerializedBigNumber
  quoteTokenAmountMc: SerializedBigNumber
  tokenAmountTotal: SerializedBigNumber
  quoteTokenAmountTotal: SerializedBigNumber
  lpTotalInQuoteToken: SerializedBigNumber
  lpTotalSupply: SerializedBigNumber
  tokenPriceVsQuote: SerializedBigNumber
  poolWeight: SerializedBigNumber
  multiplier: string
  depositFeeBP: number
  givePerBlock: number
}

const fetchFarm = async (farm: Farm): Promise<PublicFarmData> => {
  const { pid, lpAddresses, token, quoteToken, qlpAddresses} = farm
  const lpAddress = getAddress(lpAddresses)
  const calls = [
    // Balance of token in the LP contract
    // for pools we use the qlpAddress for the token prices
    {
      address: getAddress(token.address),
      name: 'balanceOf',
      params: farm.isSingleToken ? [getAddress(qlpAddresses)] : [lpAddress],
    },
    // Balance of quote token on LP contract
    // for pools we use the qlpAddress for the token prices
    {
      address: getAddress(quoteToken.address),
      name: 'balanceOf',
      params: farm.isSingleToken ? [getAddress(qlpAddresses)] : [lpAddress],
    },
    // Balance of LP tokens in the master chef contract
    {
      address: lpAddress,
      name: 'balanceOf',
      params: [getMasterChefAddress()],
    },
    // Total supply of LP tokens
    {
      address: farm.isSingleToken ? getAddress(qlpAddresses) : lpAddress,
      name: 'totalSupply',
    },
    // Token decimals
    {
      address: getAddress(token.address),
      name: 'decimals',
    },
    // Quote token decimals
    {
      address: getAddress(quoteToken.address),
      name: 'decimals',
    },
  ]

  const [tokenBalanceLP, quoteTokenBalanceLP, lpTokenBalanceMC, lpTotalSupply, tokenDecimals, quoteTokenDecimals] =
    await multicall(erc20, calls)

  // Ratio in % of LP tokens that are staked in the MC, vs the total number in circulation
  const lpTokenRatio = farm.isSingleToken ? 1 : new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

  // Raw amount of token in the LP, including those not staked
  // For pools, we use the qlp address to get token amounts to use for price calculation
  const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals))
  const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))

  // Amount of token in the LP that are staked in the MC (i.e amount of token * lp ratio)
  const tokenAmountMc = farm.isSingleToken ? new BigNumber(lpTokenBalanceMC).div(BIG_TEN.pow(tokenDecimals)) : tokenAmountTotal.times(lpTokenRatio)
  const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio)

  // Total staked in LP, in quote token value
  const lpTotalInQuoteToken = farm.isSingleToken ? tokenAmountMc : quoteTokenAmountMc.times(new BigNumber(2))

  // // for testing
  // if (pid === 5){
  //   alert("pId: ".concat(pid.toString())
  //       .concat("\n lpTotalInQuoteToken: ").concat(lpTotalInQuoteToken.toString())
  //       .concat("\n tokenBalanceLP: ").concat(tokenBalanceLP.toString())
  //       .concat("\n quoteTokenBalanceLP: ").concat(quoteTokenBalanceLP.toString())
  //       .concat("\n lpTokenBalanceMC: ").concat(lpTokenBalanceMC.toString())
  //       .concat("\n lpTotalSupply: ").concat(lpTotalSupply.toString())
  //       .concat("\n tokenAmountTotal: ").concat(tokenAmountTotal.toString())
  //       .concat("\n quoteTokenAmountTotal: ").concat(quoteTokenAmountTotal.toString())
  //       .concat("\n tokenAmountMc: ").concat(tokenAmountMc.toString())
  //       .concat("\n quoteTokenAmountMc: ").concat(quoteTokenAmountMc.toString())
  //       .concat("\n tokenPriceVsQuote: ").concat( quoteTokenAmountTotal.div(tokenAmountTotal).toString())
  //       .concat(" \n tokenDecimals").concat(tokenDecimals.toString())
  //       .concat(" \n quoteTokenDecimals").concat(quoteTokenDecimals.toString())
  //   )
  // }

  // Only make masterchef calls if farm has pid
  const [info, totalAllocPoint, givePerBlock] =
    pid || pid === 0
      ? await multicall(masterchefABI, [
          {
            address: getMasterChefAddress(),
            name: 'poolInfo',
            params: [pid],
          },
          {
            address: getMasterChefAddress(),
            name: 'totalAllocPoint',
          },
          {
            address: getMasterChefAddress(),
            name: 'givePerBlock',
          },
        ])
      : [null, null, null]

  const allocPoint = info ? new BigNumber(info.allocPoint?._hex) : BIG_ZERO
  const poolWeight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : BIG_ZERO

  const depositFee = pid >= 1 ? info.depositFeeBP : 0
  const parsedGivePerBlock = new BigNumber(givePerBlock).toNumber()

  return {
    tokenAmountMc: tokenAmountMc.toJSON(),
    quoteTokenAmountMc: quoteTokenAmountMc.toJSON(),
    tokenAmountTotal: tokenAmountTotal.toJSON(),
    quoteTokenAmountTotal: quoteTokenAmountTotal.toJSON(),
    lpTotalSupply: new BigNumber(lpTotalSupply).toJSON(),
    lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
    tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toJSON(),
    poolWeight: poolWeight.toJSON(),
    // change back if theres calculation errors
    multiplier: `${allocPoint.div(1).toString()}X`,
    depositFeeBP: depositFee,
    givePerBlock: parsedGivePerBlock
  }
}

export default fetchFarm
