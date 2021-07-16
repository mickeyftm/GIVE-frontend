import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Timeline } from 'react-twitter-widgets'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms } from '../../../state/hooks'


const StyledTwitterCard = styled(Card)`
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

const TwitterCard = () => {
  const TranslateString = useI18n()
  const { t } = useTranslation()

  return (
    <StyledTwitterCard>
      <CardBody>

        <Heading scale="xl" mb="24px">
            {t("News")}
        </Heading>
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'bcharityfi'
          }}
          options={{
            height: '350',
            chrome: "noheader, nofooter",
            width: "500"
          }}
        />
      </CardBody>
    </StyledTwitterCard>
  )
}

export default TwitterCard
