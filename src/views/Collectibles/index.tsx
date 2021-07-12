import React from 'react'
import styled from 'styled-components'
import { Heading } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/layout/Page'
import NftList from './components/NftList'
import RedirectCard from './components/RedirectCard'

const StyledHero = styled.div`
  background-image: url(images/BCharity-Images/cat3.png);
  background-size: 15%;
  background-repeat: no-repeat;
  background-position: bottom right;
  border-bottom: 2px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 22px;
  
`

const StyledPage = styled(Page)`
    background-image: radial-gradient(farthest-corner at 40px 40px, #b2deee 0%, #b69adb 100%);
`
const StyledDiv = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   padding-top: 20px
`


const Collectibles = () => {
  const { t } = useTranslation()

  return (
    <StyledPage>
      <StyledHero>
        <Heading as="h1" scale="xxl" color="secondary">
          {t('BCharity NFTs')}
        </Heading>
      </StyledHero>
      {/* <NftList /> */}
      <RedirectCard />
      <StyledDiv>
          <img src="images/BCharity-Images/Frame1.png" alt="frame with plants and cats" width="70%"/>
      </StyledDiv>
    </StyledPage>
  )
}

export default Collectibles
