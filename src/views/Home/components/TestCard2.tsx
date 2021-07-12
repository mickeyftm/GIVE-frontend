import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@pancakeswap/uikit'
// import { harvest } from 'utils/callHelpers'
// import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
// import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
// import { useMasterchef } from 'hooks/useContract'
// import UnlockButton from 'components/UnlockButton'
// import CakeHarvestBalance from './CakeHarvestBalance'
// import CakeWalletBalance from './CakeWalletBalance'
// import { Button as testbutton } from 'bcharity-uikit'

// changed name to match card , changed background to gradient
// to stack a bg image on top of gradient, list it before linear-gradient
const StyledTestCard = styled(Card)`
  // background-image: linear-gradient(rgba(204, 204, 255, 1), rgba(252, 233, 246, 0.5));
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 250px;
  min-width: 180px;
  background-color: #f895ce;

  // for the phone but it screws up the desk top
  /* ${({ theme }) => theme.mediaQueries.lg} {
    min-height: 250px;
    max-width: 200px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 160px;
  } */
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 18px;
`

// colour and size hardcoded for now but for actual should reference theme like Label above
const TestText = styled.div`
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`
const ImagePositioning = styled.div`
  position: absolute;
  top: 0;
  left: 100px;

  // for the phone but it screws up the desk top
  /* ${({ theme }) => theme.mediaQueries.sm} {
    position: absolute;
    top: 107px;
  } */
`
const TextColor = styled.div`
  color: white;
  text-shadow: 2px 3px #7e4c69;
`
const TestCard = () => {
  // use this function for translations, for string to be translated,
  // need to include in the string in translation.json file
  // more is written about translation in CONTRIBUTING.md
  const { t } = useTranslation()

  // example string of text
  const exampleTextAbstract = 'Features Test Card'
  /* 'BCHARITY is a blockchain-based charity loyalty-point tokenomics ecosystem with better transparency and accountability ' +
    'driven by community DAOs of all the public and altruism stakeholders, including  donors, volunteers, employees, etc, through  system integration' +
    ' of decentralized protocols. BCHARITY products and services include  internal exchange to convert all kind of donations into BCHARITY Token, ' +
    'a built-in wallet to store and donate easily, an explorer to track donations transparently, tools to connect donors and service providers with ' +
    'all the actors involved in the non-profit sector and templates of smart contracts to run fundraising campaigns and programs.    ' */

  return (
    <StyledTestCard>
      <CardBody>
        <Heading scale="xl" mb="24px">
          <TextColor>
            {/* Card title */}
            {t('Pools')}
          </TextColor>
        </Heading>
        <ImagePositioning>
          <CardImage src="/images/BCharity-Images/Feature1.png" alt="Feature #2" width={250} height={250} />
        </ImagePositioning>
        {/* not good design to have blocks of text like this but this is just a example */}
        <Block>
          {/* <Label>{t('Subtitle')}:</Label> */}
          {/* <TestText>{t('this is a block of text')}</TestText> */}
        </Block>
        {/* <Block>
          <Label>{t('Example Text')}:</Label>
          <TestText>{t('Abstract: %text%', { text: exampleTextAbstract })}</TestText>
        </Block> */}
        <Actions>
          {/* <Button id="test-button" onClick={() => alert('you clicked the button :)')} width="100%">
            {t('Link button')}
          </Button> */}
        </Actions>
        {/* <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              width="100%"
            >
              {pendingTx
                ? t('Collecting CAKE')
                : t('Harvest all (%count%)', {
                    count: balancesWithValue.length,
                  })}
            </Button>
          ) : (
            <UnlockButton width="100%" />
          )}
        </Actions> */}
      </CardBody>
    </StyledTestCard>
  )
}

export default TestCard
