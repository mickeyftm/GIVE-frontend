import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import multicall from 'utils/multicall'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { FarmConfig } from 'config/constants/types'
import {BIG_TEN} from "../../utils/bigNumber";

export const fetchFarmUserAllowances = async (account: string, farmsToFetch: FarmConfig[]) => {
  const masterChefAddress = getMasterChefAddress()
  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses)
    return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAddress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (account: string, farmsToFetch: FarmConfig[]) => {
  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses)
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  // const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
  //   return new BigNumber(tokenBalance).toJSON()
  // },)

  // to account for different token decimal amounts
  const parsedTokenBalances = new Array(rawTokenBalances.length)
  let newBalance
  for (let i = 0; i < rawTokenBalances.length; i++){
    if (farmsToFetch[i].token.decimals ){
      newBalance = new BigNumber(rawTokenBalances[i]).times(BIG_TEN.pow(18-farmsToFetch[i].token.decimals)).toJSON()
    }
    else{
      newBalance = new BigNumber(rawTokenBalances[i]).toJSON()
    }
    parsedTokenBalances[i] = newBalance
  }

  return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (account: string, farmsToFetch: FarmConfig[]) => {
  const masterChefAddress = getMasterChefAddress()

  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'userInfo',
      params: [farm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(masterchefABI, calls)
  // const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
  //   return new BigNumber(stakedBalance[0]._hex).toJSON()
  // })

  // to account for different token decimal amounts
  const parsedStakedBalances = new Array(rawStakedBalances.length)
  let newBalance
  for (let i = 0; i < rawStakedBalances.length; i++){
    if (farmsToFetch[i].token.decimals ){
      newBalance = new BigNumber(rawStakedBalances[i][0]._hex).times(BIG_TEN.pow(18-farmsToFetch[i].token.decimals)).toJSON()
    }
    else{
      newBalance = new BigNumber(rawStakedBalances[i][0]._hex).toJSON()
    }
    parsedStakedBalances[i] = newBalance
  }

  return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (account: string, farmsToFetch: FarmConfig[]) => {
  const masterChefAddress = getMasterChefAddress()
  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'pendingGive', // make sure that this matches method name in masterchef contract
      params: [farm.pid, account],
    }
  })
  const rawEarnings = await multicall(masterchefABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
