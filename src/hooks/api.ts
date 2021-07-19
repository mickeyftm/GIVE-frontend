import {useEffect, useMemo, useState} from 'react'
import BigNumber from "bignumber.js";
import {useFarms, usePriceCakeBusd} from "../state/hooks";
import {useAppDispatch} from "../state";
import {fetchFarmsPublicDataAsync, nonArchivedFarms} from "../state/farms";



/* eslint-disable camelcase */
export interface DeBankTvlResponse {
  id: string
  chain: string
  name: string
  site_url: string
  logo_url: string
  has_supported_portfolio: boolean
  tvl: number
}

// used in TotalValueLockedCard.tsx in Home component to get stats
// refreshing causes the farm state to be kinda weird only some farms have data?
// use the function useTotalValue() instead
export const useGetStats = () => {
  const [data, setData] = useState<DeBankTvlResponse | null>(null)

  // start tvl calculation
  const [isFetchingFarmData, setIsFetchingFarmData] = useState(true)
  const { data: farmsLP } = useFarms()
  const cakePrice = usePriceCakeBusd()
  const dispatch = useAppDispatch()

  // Fetch farm data at beginning get all the liquidity
  useEffect(() => {
    const fetchFarmData = async () => {
      try {
        await dispatch(fetchFarmsPublicDataAsync(nonArchivedFarms.map((nonArchivedFarm) => nonArchivedFarm.pid)))
      } finally {
        setIsFetchingFarmData(false)
      }
    }

    fetchFarmData()
  }, [dispatch, setIsFetchingFarmData])

  const totalValueLocked = useMemo(() => {
    if (cakePrice.gt(0)) {
      let totalLiquidity = 0
      for (let i = 0; i <farmsLP.length; i++){
        const oldtotal = totalLiquidity
        if (!farmsLP[i].isSingleToken && farmsLP[i].multiplier !== '0X'&& !farmsLP[i].isHiddenFarm && farmsLP[i].lpTotalInQuoteToken && farmsLP[i].quoteToken.busdPrice) {
          totalLiquidity += new BigNumber(farmsLP[i].lpTotalInQuoteToken).times(farmsLP[i].quoteToken.busdPrice).toNumber()
        }
        // pool
        else if (farmsLP[i].isSingleToken && farmsLP[i].multiplier !== '0X' && !farmsLP[i].isHiddenFarm && farmsLP[i].lpTotalInQuoteToken && farmsLP[i].token.busdPrice){
          totalLiquidity += new BigNumber(farmsLP[i].lpTotalInQuoteToken).times(farmsLP[i].token.busdPrice).toNumber()
        }
        // // TEST
        // alert("pid: ".concat(farmsLP[i].pid.toString())
        //     .concat("\n isSingleToken: ").concat(farmsLP[i].isSingleToken ? farmsLP[i].isSingleToken.toString() : "not def - false")
        //     .concat("\n mult is not 0x?: ").concat((farmsLP[i].multiplier !== '0X').toString())
        //     .concat("\n lpTotalInQuoteToken: ").concat((farmsLP[i].lpTotalInQuoteToken ? farmsLP[i].lpTotalInQuoteToken.toString(): " no lp total"))
        //     .concat("\n quote token usd: ").concat((farmsLP[i].quoteToken.busdPrice ? farmsLP[i].quoteToken.busdPrice.toString(): "no quote token price"))
        //     .concat("\n token usd: ").concat((farmsLP[i].token.busdPrice ? farmsLP[i].token.busdPrice.toString(): "no token price"))
        //     .concat("\n total liq for this farm").concat((totalLiquidity - oldtotal).toString()))

      }
      return totalLiquidity


      // const liquidity = farmsLP.map((farm) => {
      //   let farmTotalLiquidity = 0
      //   // farm
      //   if (!farm.isSingleToken && farm.multiplier !== '0X' && farm.lpTotalInQuoteToken && farm.quoteToken.busdPrice) {
      //     farmTotalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice).toNumber()
      //   }
      //   // pool
      //   else if (farm.isSingleToken && farm.multiplier !== '0X' && farm.lpTotalInQuoteToken && farm.token.busdPrice){
      //     farmTotalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.token.busdPrice).toNumber()
      //   }
      //
      //   return farmTotalLiquidity
      // })
      //
      // const totalLiquidtyActiveFarmsPools = liquidity.reduce((a, b) => a + b, 0) // sums up all the individual liquidities
      // return totalLiquidtyActiveFarmsPools

    }
    return null
  }, [cakePrice, farmsLP])
  // end tvl calculation

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://openapi.debank.com/v1/protocol?id=bsc_pancakeswap')
  //       const responseData: DeBankTvlResponse = await response.json()
  //
  //       setData(responseData)
  //     } catch (error) {
  //       console.error('Unable to fetch data:', error)
  //     }
  //   }
  //
  //   fetchData()
  // }, [setData])

  return totalValueLocked
}
