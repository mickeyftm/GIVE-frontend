import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import { ethers } from 'ethers'
import { useSelector } from 'react-redux'
import { Pair, TokenAmount, Token } from '@pancakeswap-libs/sdk'
import { getLpContract, getMasterchefContract } from 'utils/contractHelpers'
import farms from 'config/constants/farms'
import { getAddress, getCakeAddress, getReferralAddress } from 'utils/addressHelpers'
import tokens from 'config/constants/tokens'
import pools from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import { Referral, State, ReferralState } from 'state/types'
import referralAbi from 'config/abi/referral.json'
import { multicallv2 } from './multicall'
import { getWeb3WithArchivedNodeProvider } from './web3'
import { getBalanceAmount } from './formatBalance'
import { BIG_TEN, BIG_ZERO } from './bigNumber'

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const stake = async (masterChefContract, pid, amount, account, tokenDecimals) => {
  // if (pid === 0)
  // {
  //   return masterChefContract.methods
  //     .enterStaking(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()) // TODO: change to include referer
  //     .send({ from: account, gas: DEFAULT_GAS_LIMIT })
  //     .on('transactionHash', (tx) => {
  //       return tx.transactionHash
  //     })
  // }

  // Gets the referrer address, if there isnt one, use the 0 address
  const refCheck = getReferrerAddress()
  let refAdd = null
  if (refCheck != null) {
    refAdd = refCheck
  } else {
    refAdd = '0x0000000000000000000000000000000000000000'
  }
  return masterChefContract.methods
    .deposit(pid, new BigNumber(amount).times(tokenDecimals).toString(), refAdd) // TODO: changed to use referrer address or 0 address
    .send({ from: account, gas: DEFAULT_GAS_LIMIT })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}


// input: address user, address referrer
export const recordReferrer = async (referralContract, account, referrer) => {
  return referralContract.methods
    .recordReferral(new BigNumber(account), new BigNumber(referrer))
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

// fetch referral
export const useReferralData = async () => {
  const data = useSelector((state: State) => state.referrals.data)
  return data
}

/*
export const checkReferrer = async (referralContract, account) => {
  return referralContract.methods.getReferrer(account).call()
} */

/*
const getReferAdd() {
  const referAdd = localStorage.getItem('referral')
  if (referral) {
    return referral
  }
  return 
} */

export const useReferralRecord = (referralContract: Contract, referrer: string) => {
  const { account } = useWeb3React()
  const toRecord = useCallback(async () => {
    const tx = await referralContract.methods.recordReferrer(account, referrer).send({ from: account })
    return tx
  }, [account, referrer])
  return toRecord
}

export const getReferrerAddress = () => {
  const params = new URLSearchParams(document.location.search.substring(1))
  const referrerAdd = params.get('ref')
  return referrerAdd
}

export const sousStake = async (sousChefContract, amount, decimals = 18, account) => {
  return sousChefContract.methods
    .deposit(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString())
    .send({ from: account, gas: DEFAULT_GAS_LIMIT })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStakeBnb = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .deposit()
    .send({
      from: account,
      gas: DEFAULT_GAS_LIMIT,
      value: new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(),
    })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account, tokenDecimals) => {
  // if (pid === 0) {
  //   return masterChefContract.methods
  //     .leaveStaking(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
  //     .send({ from: account, gas: DEFAULT_GAS_LIMIT })
  //     .on('transactionHash', (tx) => {
  //       return tx.transactionHash
  //     })
  // }

  return masterChefContract.methods
    .withdraw(pid, new BigNumber(amount).times(tokenDecimals).toString())
    .send({ from: account, gas: DEFAULT_GAS_LIMIT })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousUnstake = async (sousChefContract, amount, decimals, account) => {
  return sousChefContract.methods
    .withdraw(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString())
    .send({ from: account, gas: DEFAULT_GAS_LIMIT })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousEmergencyUnstake = async (sousChefContract, account) => {
  return sousChefContract.methods
    .emergencyWithdraw()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const harvest = async (masterChefContract, pid, account) => {
  // if (pid === 0) {
  //   return masterChefContract.methods
  //     .leaveStaking('0') // TODO: maybe need referer here
  //     .send({ from: account, gas: DEFAULT_GAS_LIMIT })
  //     .on('transactionHash', (tx) => {
  //       return tx.transactionHash
  //     })
  // }

  // Gets the referrer address, if there isnt one, use the 0 address
  const refCheck = getReferrerAddress()
  let refAdd = null
  if (refCheck != null) {
    refAdd = refCheck
  } else {
    refAdd = '0x0000000000000000000000000000000000000000'
  }
  return masterChefContract.methods
    .deposit(pid, '0', refAdd) // TODO: changed to use referrer address or 0 address
    .send({ from: account, gas: DEFAULT_GAS_LIMIT })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvest = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit('0')
    .send({ from: account, gas: DEFAULT_GAS_LIMIT })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvestBnb = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit()
    .send({ from: account, gas: DEFAULT_GAS_LIMIT, value: BIG_ZERO })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
const cakeBnbPid = 251
const cakeBnbFarm = farms.find((farm) => farm.pid === cakeBnbPid)

const CAKE_TOKEN = new Token(chainId, getCakeAddress(), 18)
// const WBNB_TOKEN = new Token(chainId, tokens.wbnb.address[chainId], 18)
const WBNB_TOKEN = new Token(chainId, tokens.weth.address[process.env.REACT_APP_CHAIN_ID], 18) // CHANGED TO WETH, TODO: remove hardcoded chainID
// const CAKE_BNB_TOKEN = new Token(chainId, getAddress(cakeBnbFarm.lpAddresses), 18)

/**
 * Returns the total CAKE staked in the CAKE-BNB LP
 */
export const getUserStakeInCakeBnbLp = async (account: string, block?: number) => {
  // try {
  //   const archivedWeb3 = getWeb3WithArchivedNodeProvider()
  //   const masterContract = getMasterchefContract(archivedWeb3)
  //   const cakeBnbContract = getLpContract(getAddress(cakeBnbFarm.lpAddresses), archivedWeb3)
  //   const totalSupplyLP = await cakeBnbContract.methods.totalSupply().call(undefined, block)
  //   const reservesLP = await cakeBnbContract.methods.getReserves().call(undefined, block)
  //   const cakeBnbBalance = await masterContract.methods.userInfo(cakeBnbPid, account).call(undefined, block)
  //
  //   const pair: Pair = new Pair(
  //     new TokenAmount(CAKE_TOKEN, reservesLP._reserve0.toString()),
  //     new TokenAmount(WBNB_TOKEN, reservesLP._reserve1.toString()),
  //   )
  //   const cakeLPBalance = pair.getLiquidityValue(
  //     pair.token0,
  //     new TokenAmount(CAKE_BNB_TOKEN, totalSupplyLP.toString()),
  //     new TokenAmount(CAKE_BNB_TOKEN, cakeBnbBalance.amount.toString()),
  //     false,
  //   )
  //
  //   return new BigNumber(cakeLPBalance.toSignificant(18))
  // } catch (error) {
  //   console.error(`CAKE-BNB LP error: ${error}`)
  //   return BIG_ZERO
  // }
  console.error('This function getUserStakeInCakeBnbLp is not implemented')
  return BIG_ZERO
}

/**
 * Gets the cake staked in the main pool
 */
export const getUserStakeInCakePool = async (account: string, block?: number) => {
  try {
    const archivedWeb3 = getWeb3WithArchivedNodeProvider()
    const masterContract = getMasterchefContract(archivedWeb3)
    const response = await masterContract.methods.userInfo(0, account).call(undefined, block)

    return getBalanceAmount(new BigNumber(response.amount))
  } catch (error) {
    console.error('Error getting stake in CAKE pool', error)
    return BIG_ZERO
  }
}

/**
 * Returns total staked value of active pools
 */
export const getUserStakeInPools = async (account: string, block?: number) => {
  try {
    const multicallOptions = {
      web3: getWeb3WithArchivedNodeProvider(),
      blockNumber: block,
      requireSuccess: false,
    }
    const eligiblePools = pools
      .filter((pool) => pool.sousId !== 0)
      .filter((pool) => pool.isFinished === false || pool.isFinished === undefined)

    // Get the ending block is eligible pools
    const endBlockCalls = eligiblePools.map((eligiblePool) => ({
      address: getAddress(eligiblePool.contractAddress),
      name: 'bonusEndBlock',
    }))
    const startBlockCalls = eligiblePools.map((eligiblePool) => ({
      address: getAddress(eligiblePool.contractAddress),
      name: 'startBlock',
    }))
    const endBlocks = await multicallv2(sousChefABI, endBlockCalls, multicallOptions)
    const startBlocks = await multicallv2(sousChefABI, startBlockCalls, multicallOptions)

    // Filter out pools that have ended
    const activePools = eligiblePools.filter((eligiblePool, index) => {
      const endBlock = new BigNumber(endBlocks[index])
      const startBlock = new BigNumber(startBlocks[index])

      return startBlock.lte(block) && endBlock.gte(block)
    })

    // Get the user info of each pool
    const userInfoCalls = activePools.map((activePool) => ({
      address: getAddress(activePool.contractAddress),
      name: 'userInfo',
      params: [account],
    }))
    const userInfos = await multicallv2(sousChefABI, userInfoCalls, multicallOptions)

    return userInfos.reduce((accum: BigNumber, userInfo) => {
      return accum.plus(new BigNumber(userInfo.amount._hex))
    }, new BigNumber(0))
  } catch (error) {
    console.error('Error fetching staked values:', error)
    return BIG_ZERO
  }
}
