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

// font import

// changed name to match card , changed background to gradient
// to stack a bg image on top of gradient, list it before linear-gradient
const StyledTestCard = styled(Card)`
  // background-image: linear-gradient(rgba(204, 204, 255, 1), rgba(252, 233, 246, 0.5));
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 500px;
  min-width: 180px;
  background-color: #ffffff;

  // for the phone but it screws up the desk top
  /* ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 160px;
  } */
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 0px;
  margin-right: 0px;
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
  top: 200px;
  left: 500px;

  // for the phone but it screws up the desk top
  /* ${({ theme }) => theme.mediaQueries.sm} {
    position: absolute;
    top: 110px;
  } */
`
const ImagePositioningTL = styled.div`
  position: absolute;
  top: 200px;
  left: 500px;
`
const TestContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const TextColor = styled.div`
  font-family: Tw Cen MT;
  color: black;
  font-size: 55px;
  width: 300px;
`
const TextColorBlue = styled.div`
  color: #459bdb;
  font-family: Tw Cen MT;
  font-size: 55px;
  margin-top: -15px;
  `
const TextColorPink = styled.div`
  color: #f895ce;
  font-family: Tw Cen MT;
  font-size: 55px;
  margin-top: -15px;
`
const SmallerFont = styled.div`
  font-size: 15px;
  color: black;
  margin-top: 25px;
  letter-spacing: 1px;
  width: 250px;
`
const ImageDiv = styled.div``
const TextContainer = styled.div`
  max-height: 250px;
  max-width: 250px;
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
      <CardBody>
        <TestContainer>
          <CardImage src="/images/BCharity-Images/Info1.png" alt="Money" width={600} height={600} />
          <TextContainer>
              <TextColor>
                {/* Card title */}
                {t('Farming and')}
              </TextColor>
              <TextColorBlue>{t('Staking')}</TextColorBlue>
              <SmallerFont>
                {t(
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis molestie dolor nec maximus.',
                )}
              </SmallerFont>
          </TextContainer>
        </TestContainer>
        <TestContainer>
          <TextContainer>
              <TextColor>
                {/* Card title */}
                {t('Farming and')}
              </TextColor>
              <TextColorPink>{t('Staking')}</TextColorPink>
              <SmallerFont>
                {t(
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis molestie dolor nec maximus.',
                )}
              </SmallerFont>
          </TextContainer>
          <CardImage src="/images/BCharity-Images/Info2.png" alt="Money" width={700} height={700} />
        </TestContainer>
        {/* <ImagePositioning>
          <CardImage src="/images/BCharity-Images/Info2.png" alt="Hand" width={550} height={550} />
        </ImagePositioning> */}
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
  )
}

export default TestCard
