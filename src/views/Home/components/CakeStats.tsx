import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getGiveAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import {useFarmFromPid, usePriceCakeBusd} from "../../../state/hooks";
import {CAKE_PER_BLOCK} from "../../../config";

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`
// Card that shows info about token stats on home page
// TODO: change to show our token stats instead of CAKE stats
const CakeStats = () => {
  const { t } = useTranslation()
  const totalSupply = useTotalSupply()
  const givePrice = usePriceCakeBusd()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getGiveAddress()))
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0);
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0
  const marketCap = givePrice.times(circSupply);

  // alert("givePrice".concat(givePrice.toString()))

  const farm0 = useFarmFromPid(0)
  let givePerBlock = CAKE_PER_BLOCK.toNumber() // backup use the number in config/index.ts
  // right now givePerBlock is undefined? so just using backup for now TODO: fix this
  if(farm0 && farm0.givePerBlock){
    givePerBlock = new BigNumber(farm0.givePerBlock).div(new BigNumber(10).pow(18)).toNumber();
  }



  return (
    <StyledCakeStats>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {t('GIVE Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{t('Market Cap')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(marketCap)} decimals={0} prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total Minted')}</Text>
          {cakeSupply && <CardValue fontSize="14px" decimals={0} value={getBalanceNumber(totalSupply)} />}
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total Burned')}</Text>
          <CardValue fontSize="14px" decimals={0} value={burnedBalance} />
        </Row>
        <Row>
          <Text fontSize="14px">{t( 'Circulating Supply')}</Text>
          {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{t( 'Seed Maximum Supply')}</Text>
          {cakeSupply && <CardValue fontSize="14px" value={210000} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{t('New GIVE/block')}</Text>
          <CardValue fontSize="14px" decimals={3} value={givePerBlock} />
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
