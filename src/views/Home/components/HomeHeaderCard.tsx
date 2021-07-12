import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

const StyledHeadingCard = styled(Card)`
  margin-top: 35px;
  background-image: linear-gradient(165deg, #6f12e0, #459bdb, #459bdb);
  // box-shadow: 12px 16px 5px #e4e3e9;
  // max-height: 1000%;
  max-width: 100%;
  overflow: visible;
  position: relative;
  padding-bottom: 0;
`

const VerticalLine = styled.line`
  border-left: 3px solid white;
  height: 37px;
  position: absolute;
  left: 10.5%;
  margin-left: -3px;
  top: 63px;
`

const HorizontalLineOrange = styled.line`
  border-top: 25px solid #FFC37B;
  width: 500px;
  position: absolute;
  left: 10px;
  top: 99%;
`

const HorizontalLinePink = styled.line`
  border-top: 25px solid #F895CE;
  width: 680px;
  position: absolute;
  right: 10px;
  top: 99%;
`

const CardImage = styled.img`
  position: absolute;
  width: 400px;
  float: right;
  bottom: 0px;
  right: 5%;
`

const Update = styled.div`
  color: #F895CE;
  font-size: 13px;
  max-width: 500px;
  padding-left: 10%;
  padding-bottom: 10px;
  padding-top: 40px;
  letter-spacing: 2px;
  font-family: 'Tw Cen MT'; 
`

const Subtitle = styled.div`
  color: white;
  font-size: 18px;
  max-width: 500px;
  padding-left: 11%;
  padding-bottom: 10px;
  letter-spacing: 2px;
  font-family: 'Tw Cen MT'; 
`

const LearnMoreButton = styled.button`
  border: 2px solid white;
  background-color: rgba(0,0,0,0);
  color: white;
  margin-left: 10%;
  margin-top: 10px;
  padding: 1px 10px;
  font-size: 13px;
  cursor: pointer;
  border-radius: 8px;
  letter-spacing: 1px;
`

const HorizontalLayout = styled.div`
  float: left;
`

const Title = styled.div`
  color: white;
  font-size: 55px;
  max-width: 400px;
  margin-left: 10%;
  // padding-top: 85px;
  // text-shadow: 3px 4px 2px rgba(98, 61, 222, 0.6);
  font-family: 'Tw Cen MT'; 
  // text-align: center;
`

const HomeHeaderCard = () => {
  // use this function for translations, for string to be translated,
  // need to include in the string in translation.json file
  // more is written about translation in CONTRIBUTING.md
  const { t } = useTranslation()

  const subtitle = 'Better transparency and accountability for charity tokenomics ecosystem.'
  const title = 'BCharity'
  return (
    <StyledHeadingCard>

        <VerticalLine />
        <Update color="pink">VISION</Update>
        <Subtitle color="white"> {subtitle} </Subtitle>
        <Title>{title}</Title>
        <LearnMoreButton>Learn More...</LearnMoreButton>
        <CardImage src="/images/BCharity-Images/cat1-compressed.png" alt="cartoon cat holding coffee mug" />
        <HorizontalLineOrange />
        <HorizontalLinePink />

    </StyledHeadingCard>
  )
}

export default HomeHeaderCard