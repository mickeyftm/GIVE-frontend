import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useReferralData } from 'utils/callHelpers'

const StyledLotteryCard = styled(Card)``

const Counter = () => {
  const { t } = useTranslation()
  const count = useReferralData()
    return (
      <>
        <Text>{count.referralsCount}</Text>
    </>
  )
}

export default Counter
