import addresses from 'config/constants/contracts'
import tokens from 'config/constants/tokens'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const mainNetChainId = 137
  const chainId = process.env.REACT_APP_CHAIN_ID
  // const chainId = 4 // TODO: change back
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}

// Helper to get address for our own token
export const getGiveAddress = () => {
  return getAddress(tokens.give.address)
}
// export const getBscGiveAddress = () => {
//   return getAddress(tokens.bscGive.address)
// }
// // for testing our masterchef contract
// // TODO: delete later
// export const getTestMasterChefAddress = () => {
//   return getAddress(addresses.testMasterChef)
// }
//
// export const getBscMasterChefAddress = () => {
//   return getAddress(addresses.bscMasterChef)
// }

export const getCakeAddress = () => {
  // return getAddress(tokens.cake.address)
  return getAddress(tokens.give.address)
}
export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}
export const getWbnbAddress = () => {
  // return getAddress(tokens.wbnb.address)
  // NOT ACTUAL ADDRESS, JUST PLACEHOLDER
  return getAddress(addresses.placeholder)
}
export const getLotteryAddress = () => {
  // return getAddress(addresses.lottery)
  // NOT ACTUAL ADDRESS, JUST PLACEHOLDER
  return getAddress(addresses.placeholder)
}
export const getLotteryTicketAddress = () => {
  // return getAddress(addresses.lotteryNFT)
  // NOT ACTUAL ADDRESS, JUST PLACEHOLDER
  return getAddress(addresses.placeholder)
}
export const getLotteryV2Address = () => {
  // return getAddress(addresses.lotteryV2)
  // NOT ACTUAL ADDRESS, JUST PLACEHOLDER
  return getAddress(addresses.placeholder)
}
export const getPancakeProfileAddress = () => {
  // return getAddress(addresses.pancakeProfile)
  // NOT ACTUAL ADDRESS, JUST PLACEHOLDER
  return getAddress(addresses.placeholder)
}
export const getPancakeRabbitsAddress = () => {
  // return getAddress(addresses.pancakeRabbits)
  // NOT ACTUAL ADDRESS, JUST PLACEHOLDER
  return getAddress(addresses.placeholder)
}
export const getBunnyFactoryAddress = () => {
  // return getAddress(addresses.bunnyFactory)
  // NOT ACTUAL ADDRESS, JUST PLACEHOLDER
  return getAddress(addresses.placeholder)
}
export const getClaimRefundAddress = () => {
  // return getAddress(addresses.claimRefund)
  // NOT ACTUAL ADDRESS, JUST PLACEHOLDER
  return getAddress(addresses.placeholder)
}
export const getPointCenterIfoAddress = () => {
  // return getAddress(addresses.pointCenterIfo)
  // NOT ACTUAL ADDRESS, JUST PLACEHOLDER
  return getAddress(addresses.placeholder)
}
export const getBunnySpecialAddress = () => {
  // return getAddress(addresses.bunnySpecial)
  // NOT ACTUAL ADDRESS, JUST PLACEHOLDER
  return getAddress(addresses.placeholder)
}
export const getTradingCompetitionAddress = () => {
  // return getAddress(addresses.tradingCompetition)
  // NOT ACTUAL ADDRESS, JUST PLACEHOLDER
  return getAddress(addresses.placeholder)
}
export const getEasterNftAddress = () => {
  // return getAddress(addresses.easterNft)
  // NOT ACTUAL ADDRESS, JUST PLACEHOLDER
  return getAddress(addresses.placeholder)
}
export const getCakeVaultAddress = () => {
  // return getAddress(addresses.cakeVault)
  // NOT ACTUAL ADDRESS, JUST PLACEHOLDER
  return getAddress(addresses.placeholder)
}
export const getPredictionsAddress = () => {
  // return getAddress(addresses.predictions)
  // NOT ACTUAL ADDRESS, JUST PLACEHOLDER
  return getAddress(addresses.placeholder)
}
export const getChainlinkOracleAddress = () => {
  // return getAddress(addresses.chainlinkOracle)
  // NOT ACTUAL ADDRESS, JUST PLACEHOLDER
  return getAddress(addresses.placeholder)
}
