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

  max-height: 600px;
  min-width: 180px;
  background-color: #FAF9FA;
  border-radius: 0px;

  // for the phone but it screws up the desk top
  /* ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 160px;
  } */
`

const OuterBox = styled.div`
  // background-image: linear-gradient(165deg, #DE70E7, #459bdb, #459bdb);
  background-color: purple;
  opacity: 0.5;
  height: 100px;
  width: 1000px;
`

const BotCard = styled.div`
  margin-top: 200px;
  margin-left: 1%;
  background-image: linear-gradient(0.3turn, #EC77E5, #356EDF);
  height: 1200px;
  width: 1200px;
  border-radius: 100px;
  transform: rotate(340deg);
  background-color: #FAF9FA;
`

const Block = styled.div`
  margin-bottom: 16px;
  max-width: 100px;
  overflow: hidden;
`

const CardImage = styled.img`
  margin-bottom: 0x;
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
  font-style: Tw Cen MT;
  color: black;
`
const TextColorBlue = styled.div`
  color: #459bdb;
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

const Title = styled.div`
  font-family: Tw Cen MT;
  float: right;
  color: white;
  font-size: 100px;
  transform: rotate(20deg);
  margin-top: 100px;
`

const Subtitle = styled.div`
  float: right;
  font-family: Tw Cen MT;
  color: white;
  font-size: 35px;
  transform: rotate(20deg);
  margin-top: 170px;
  margin-right: -340px;
  text-align: right;
  width: 550px;
`

const ButtonButton = styled.button`
  float: right;
  font-family: Tw Cen MT;
  border-radius: 5px;
  font-size: 35px;
  transform: rotate(20deg);
  margin-top: 320px;
  margin-right: -510px;
  text-align: center;
  width: 150px;
  height: 50px;
  font-size: 30px;
`


const BottomCard = () => {
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
        <BotCard>
          <Title>BCharity</Title>
          <Subtitle>Better transparency and accountability for charity tokenomics ecosystem.</Subtitle>
          <ButtonButton>Contact Us</ButtonButton>
        </BotCard>
        
      </StyledTestCard>
  )
}

export default BottomCard