import React from 'react'
import styled from 'styled-components'
import { Flex, CardBody, CardFooter, Heading, Text, BaseLayout } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import TwitterCard from 'views/Home/components/TwitterCard'
import LotteryCard from 'views/Home/components/LotteryCard'
import CakeStats from 'views/Home/components/CakeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPRCard from 'views/Home/components/EarnAPRCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import WinCard from 'views/Home/components/WinCard'
// new
import { NavLink } from 'react-router-dom'
// import TestCard2 from 'views/Home/components/TestCard2'
// import TestCard3 from 'views/Home/components/TestCard3'
// import TestCard from 'views/Home/components/TestCard'

import MainCard from 'views/Home/components/MainCard'
import MainCard1 from 'views/Home/components/MainCard1'
import MainCard2 from 'views/Home/components/MainCard2'
import FarmingandstakingCard from 'views/Home/components/FarmingandstakingCard'
import FSCard2 from 'views/Home/components/FarmingandstakingCard2'
import BottomCard from 'views/Home/components/BottomCard'

import HomeHeaderCard from './components/HomeHeaderCard' // TODO: remove later, this is just test component

const CardHeader = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 24px;
  margin-top: 10px;
  grid-gap: 24px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 32px;
    grid-gap: 32px;

    & > div {
      grid-column: span 6;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 24px;
  grid-gap: 24px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 32px;
    grid-gap: 32px;

    & > div {
      grid-column: span 4;
    }
  }
`

// testing different spans for the cards
const HomeHeaderCardLayout = styled(BaseLayout)`
  align-items: stretch;
  display: flex;
  justify-content: stretch;
  margin-bottom: 24px;
  grid-gap: 24px;
  max-height: 275px;
  min-height: 275px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 10;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 40px;
    grid-gap: 32px;

    & > div {
      grid-column: span 12;
    }
  }
`
// make space between cards scale
// testing different spans for the cards
const TestCardLayout = styled(BaseLayout)`
  // align-items: start;
  // display: flex;
  // justify-content: stretch;
  margin-bottom: 24px;
  // grid-gap: 24px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 10;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 0px;
    // grid-gap: 32px;

    & > div {
      grid-column: span 12;
    }
  }
`



const FarmsAndStaking = styled(BaseLayout)`
  align-items: stretch;
  display: flex;
  justify-content: stretch;
  margin-bottom: 24px;
  grid-gap: 24px;
  // max-height: 275px;
  // min-height: 275px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 10;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    // margin-bottom: -175px;
    grid-gap: 32px;

    & > div {
      grid-column: span 12;
    }
  }
`


const FeatureCardDiv = styled(BaseLayout)`
  // align-items: stretch;
  justify-content: space-between;
  margin-bottom: 24px;
  grid-gap: 24px;
  display: flex;

  & > div {
    grid-column: span 6vw;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }


//  change to make veritcal
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 32px;
    grid-gap: 50px;

    & > div {
      grid-column: span 2;
    }
  }
`

const FeatureText = styled.div`
  color: black;
  font-size: 50px;
`
const TextColor = styled.div`
  color: black;
  font-family: 'Tw Cen MT'; 
  font-size: 50px;
  margin-bottom: 20px;
`

const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <div>
        <HomeHeaderCardLayout>
          <HomeHeaderCard />
        </HomeHeaderCardLayout>
      </div>



      <div>
          <Cards>
            <FarmStakingCard />
            <TwitterCard />
          </Cards> 
          
          <Cards>
            <CakeStats />
            <TotalValueLockedCard />
          </Cards>
          
          <FarmsAndStaking>
            <FSCard2 />
          </FarmsAndStaking>
      </div>

      <div>

        {/* <FarmsAndStaking>
          <BottomCard />
        </FarmsAndStaking> */}
      </div>

    </Page>
  )
}

export default Home
