import React, {useState, useCallback, useEffect, useMemo} from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@pancakeswap/uikit'
import BigNumber from "bignumber.js";
import { useTranslation } from 'contexts/Localization'
import max from "lodash/max";
import {useBurnedBalance, useTotalSupply} from "../../../hooks/useTokenBalance";
import {getBalanceNumber} from "../../../utils/formatBalance";
import {getGiveAddress} from "../../../utils/addressHelpers";
import {useFarmFromPid, useFarms, usePriceCakeBusd} from "../../../state/hooks";
import {CAKE_PER_BLOCK} from "../../../config";
import {useAppDispatch} from "../../../state";
import {fetchFarmsPublicDataAsync, nonArchivedFarms} from "../../../state/farms";
import {getFarmApr} from "../../../utils/apr";
import useTheme from "../../../hooks/useTheme";


// font import

const APRFormat = styled.div`
  font-family: 'Tw Cen MT'; 
  color: black;
  text-align: center;
  font-size: 100px;
  color: #459bdb;
  margin-bottom: 20px;
`

const EarningTextColor = styled.div<{isDark: boolean}>`
  font-family: 'Tw Cen MT'; 
  color: ${({isDark}) => isDark ? "white": "black"};
  text-align: center;
  font-size: 50px;
  margin-bottom: 20px;
  margin-top: 200px;
  ${({ theme }) => theme.mediaQueries.nav} {
      margin-top: 80px;
    }
`

const TextColor = styled.div<{isDark: boolean}>`
  font-family: 'Tw Cen MT'; 
  color: ${({isDark}) => isDark ? "white": "black"};;
  text-align: center;
  font-size: 50px;
  margin-bottom: 20px;
`

const BlueCircle = styled.div`
  background-image: linear-gradient(165deg, #ADFCAC, #9895DB, #67B4EB);
  border-radius: 50%;
  width: 200px;
  height: 200px;
  float: left;
  margin-top: -490px;
  margin-left: 20px;
  ${({ theme }) => theme.mediaQueries.nav} {
      width: 250px;
      height: 250px;
      margin-top: -350px;
      margin-left: 40px;
    }
`

const BlueCircleA = styled.div`
  background-image: linear-gradient(165deg, #ADFCAC, #9895DB, #67B4EB);
  border-radius: 50%;
  width: 200px;
  height: 200px;
  float: left;
  margin-top: -470px;
  margin-left: 50px;
  margin-right: 10px;
  opacity: 0.5;
  ${({ theme }) => theme.mediaQueries.nav} {
      width: 250px;
      height: 250px;
      margin-top: -330px;
      margin-left: 70px;
    }
`

const OrangeCircle = styled.div`
  background-image: linear-gradient(165deg, #FF7AB0, #FEBD95, #FFAF43);
  border-radius: 50%;
  width: 180px;
  height: 180px;
  float: left;
  margin-top: -200px;
  margin-left: 90px;
  ${({ theme }) => theme.mediaQueries.nav} {
      width: 200px;
      height: 200px;
      margin-top: -54px;
      margin-left: -180px;
    }
`
const OrangeCircleA = styled.div`
  background-image: linear-gradient(165deg, #FF7AB0, #FEBD95, #FFAF43);
  border-radius: 50%;
  width: 180px;
  height: 180px;
  float: right;
  margin-top: 10px;
  margin-left: 170px;
  opacity: 0.5;
  ${({ theme }) => theme.mediaQueries.nav} {
      float: left;
      margin-top: -55px;
      margin-left: 170px;
    }
`

const PinkCircle = styled.div`
  background-image: linear-gradient(165deg, #C36CF3, #F9C0D6, #EA5CF1);
  border-radius: 50%;
  width: 240px;
  height: 240px;
  float: right;
  margin-right: -240px;
  margin-top: 10px;
  ${({ theme }) => theme.mediaQueries.nav} {
      margin-right: -320px;
      margin-top: -220px;
      width: 300px;
      height: 300px;
    }
  
`

const PinkCircleA = styled.div`
  background-image: linear-gradient(165deg, #C36CF3, #F9C0D6, #EA5CF1);
  border-radius: 50%;
  width: 240px;
  height: 240px;
  float: right;
  margin-top: 30px;
  margin-right: 80px;
  opacity: 0.5;
  ${({ theme }) => theme.mediaQueries.nav} {
      margin-top: -200px;
      margin-right: 0px;
      width: 300px;
      height: 300px;
    }
`

const BlueCircleText = styled.div`
  font-family: 'Tw Cen MT'; 
  color: white;
  text-align: center;
  font-size: 60px;
  position: relative;
  margin-top: 25%;
  ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 70px;
    }
`

const BlueCircleTextA = styled.div`
  font-family: 'Tw Cen MT'; 
  color: white;
  text-align: center;
  font-size: 40px;
  position: relative;
  // margin-top: 20%;
  ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 50px;
    }
`


const OrangeCircleTextA = styled.div`
  font-family: 'Tw Cen MT'; 
  color: white;
  text-align: center;
  font-size: 60px;
  position: relative;
  margin-top: 20%;
  ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 70px;
    }
`

const OrangeCircleText = styled.div`
  font-family: 'Tw Cen MT'; 
  color: white;
  text-align: center;
  font-size: 25px;
  position: relative;
  ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 35px;
    }
`

const PinkCircleText = styled.div`
  font-family: 'Tw Cen MT'; 
  color: white;
  text-align: center;
  font-size: 60px;
  position: relative;
  margin-top: 30%;
  ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 70px;
    }
`

const TextColorBlue = styled.div`
`
const TextColorPink = styled.div`
  color: #f895ce;
`
const SmallerFont = styled.div`
  font-size: 13px;
`
const ImageDiv = styled.div``
const TextContainer = styled.div`
  max-height: 250px;
  max-width: 250px;
`

const FSCard2 = () => {

  const { t } = useTranslation()
  const { isDark } = useTheme()

    const totalSupply = useTotalSupply()
    const parsedTotalSupply = totalSupply ? getBalanceNumber(totalSupply): 0
    const burnedBalance = getBalanceNumber(useBurnedBalance(getGiveAddress()))
    const circSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0
    const farm0 = useFarmFromPid(0)
    let givePerBlock = CAKE_PER_BLOCK.toNumber() // backup use the number in config/index.ts
    // right now givePerBlock is undefined? so just using backup for now TODO: fix this
    if(farm0 && farm0.givePerBlock){
        givePerBlock = new BigNumber(farm0.givePerBlock).div(new BigNumber(10).pow(18)).toNumber();
    }

    // start apr calculation
    const [isFetchingFarmData, setIsFetchingFarmData] = useState(true)
    const { data: farmsLP } = useFarms()
    const cakePrice = usePriceCakeBusd()
    const dispatch = useAppDispatch()

    // Fetch farm data once to get the max APR
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

    const highestApr = useMemo(() => {
        if (cakePrice.gt(0)) {
            const aprs = farmsLP.map((farm) => {
                // Filter inactive farms, because their theoretical APR is super high. In practice, it's 0.
                // also filtered out pools
                if (farm.pid !== 0 && farm.multiplier !== '0X' && farm.lpTotalInQuoteToken && farm.quoteToken.busdPrice && !farm.isSingleToken) {
                    const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
                    return getFarmApr(new BigNumber(farm.poolWeight), cakePrice, totalLiquidity)
                }
                return null
            })

            const maxApr = max(aprs)
            return maxApr?.toLocaleString('en-US', { maximumFractionDigits: 0 })
        }
        return null
    }, [cakePrice, farmsLP])
    // end apr calculation



    return (
      <CardBody>
        <EarningTextColor isDark={isDark}>{t("Earn up to")}</EarningTextColor>
        <APRFormat>{highestApr}%</APRFormat>
        <TextColor isDark={isDark} >{t("APR in Farms")}</TextColor>

        <BlueCircleA> </BlueCircleA>
        <BlueCircle>
            <BlueCircleText> {Math.round(parsedTotalSupply)} </BlueCircleText>
            <BlueCircleTextA>{t("Minted")}</BlueCircleTextA>
        </BlueCircle>

        <OrangeCircleA> </OrangeCircleA>
        <OrangeCircle>
            <OrangeCircleTextA>{givePerBlock}</OrangeCircleTextA>
            <OrangeCircleText>{t("GIVE per Block")}</OrangeCircleText>
        </OrangeCircle>

        <PinkCircleA> </PinkCircleA>
        <PinkCircle>
            <PinkCircleText>{Math.round(circSupply)} {t("Supply")}</PinkCircleText>
        </PinkCircle>

      </CardBody>
  )
}

export default FSCard2
