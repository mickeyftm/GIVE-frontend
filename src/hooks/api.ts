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
// use use total value locked(tvl) number though
// if we want to to use need to change link below
export const useGetStats = () => {
  const [data, setData] = useState<DeBankTvlResponse | null>(null)

  // start tvl calculation
  const [isFetchingFarmData, setIsFetchingFarmData] = useState(true)
  const { data: farmsLP } = useFarms()
  const cakePrice = usePriceCakeBusd()
  const dispatch = useAppDispatch()

  // Fetch farm data once to get all the liquidity
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
      const liquidity = farmsLP.map((farm) => {
        // Filter inactive farms, because their theoretical APR is super high. In practice, it's 0.
        let totalLiquidity = 0
        if (farm.pid !== 0 && farm.multiplier !== '0X' && farm.lpTotalInQuoteToken && farm.quoteToken.busdPrice && !farm.isSingleToken) {
          totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice).toNumber()
        }
        else if (farm.isSingleToken && farm.multiplier !== '0X' && farm.lpTotalInQuoteToken && farm.token.busdPrice){
          totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.token.busdPrice).toNumber()
        }
        return totalLiquidity
      })

      const maxApr = liquidity.reduce((a, b) => a + b, 0) // sums up all the individual liquidities
      return maxApr
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
