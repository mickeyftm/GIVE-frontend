import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Button } from '@pancakeswap/uikit'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'

const StyledRedirectCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }

  transition: opacity 200ms;
  &:hover {
    opacity: 0.65;
  }
`
const CardMidContent = styled(Heading).attrs({ scale: 'xl' })`
  line-height: 44px;
`

// card that links to nft website
const RedirectCard = () => {
  const { t } = useTranslation()

  return (
    <StyledRedirectCard>
      <a href="https://bcharity-nft-marketplace.netlify.app/" target="_blank" rel="noreferrer">
        <CardBody>
          <Heading color="contrast" scale="lg">
            {t('NFT website')}
          </Heading>
          <CardMidContent color="rgba(102, 102, 255,1)">{t('Available, Testing on Rinkeby network.')}</CardMidContent>
          <Flex justifyContent="space-between">
            <Heading color="contrast" scale="lg" />
            <ArrowForwardIcon mt={30} color="primary" />
          </Flex>
        </CardBody>
      </a>
    </StyledRedirectCard>
  )
}

export default RedirectCard
