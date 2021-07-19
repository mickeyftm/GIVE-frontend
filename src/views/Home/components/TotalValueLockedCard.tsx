import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useGetStats } from 'hooks/api'
import { useTotalValue } from "../../../state/hooks";

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
`

const TotalValueLockedCard = () => {
  const { t } = useTranslation()

  // this is the total liquidity of the active and unhidden farms and pools
  const tvlNum = useTotalValue() // this works
  // const tvlNum = useGetStats() // this number sometimes is wrong after refreshing- something to do with farm state?
  const tvl = tvlNum ? tvlNum.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading scale="lg" mb="24px">
          {t('Total Value Locked (TVL)')}
        </Heading>
        
        {tvlNum ? (
          <>
            <Heading scale="xl">{`$${tvl}`}</Heading>
            <Text color="textSubtle">{t('Across all Farms and Pools')}</Text>
          </>
        ) : (
          <Skeleton height={66} />
        )}
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
