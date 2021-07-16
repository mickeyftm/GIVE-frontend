import React from 'react'
import referralAbi from 'config/abi/referral.json'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import PageHeader from 'components/PageHeader'
import Page from 'components/layout/Page'
import styled from 'styled-components'
import { Image, Heading, RowType, Toggle, Text, Button } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import UnlockButton from 'components/UnlockButton'
import { getReferralAddress } from 'utils/addressHelpers'
import { useReferralContract } from 'hooks/useContract'
import { getReferralContract } from 'utils/contractHelpers'
import CopyToClipboard from './CopyToClipboard'

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`
const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`
const RightHeader = styled.div`
  display: inline-block;
  vertical-align: top;
`
const LeftHeader = styled.div`
  display: inline-block;
`

const referralAddress = ' '
const referralContract = getReferralContract()

const getReferrer = async () => {
  referralContract.methods.getReferrer().call()
}
const ReferralButton = ({ isRegistered }) => {
  const { t } = useTranslation()
  if (!isRegistered) {
    return <UnlockButton width="100%" />
  }
  return <ReferralAddress isRegistered />
}

const ReferralAddress = ({ isRegistered }) => {
  const { t } = useTranslation()
  if (isRegistered) {
    return (
      <Text>
        {' '}
        {`${window.location.protocol}//`}
        {`${window.location.host}/`}
        {t('%addr%', { addr: referralAddress })}{' '}
      </Text>
    )
  }
  return <Text>{t('Please Log in')}</Text>
}
const Referral: React.FC = () => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  return (
    <>
      <PageHeader>
        <LeftHeader>
          <Heading as="h1" scale="xxl" color="secondary" mb="24px">
            {t('Referral Program')}
          </Heading>
          <Heading scale="lg" color="text">
            {t('Share the referral link below to invite your friends and earn 1% of your friends earnings.')}
          </Heading>
        </LeftHeader>
      </PageHeader>
      <Page>
        <ControlContainer>
          <ReferralButton isRegistered={account} />
          <CopyToClipboard
            toCopy={' '.concat(
              `${window.location.protocol}//`,
              `${window.location.host}/`,
              '%addr%',
              t('%addr%', { addr: referralAddress }),
            )}
          >
            Copy Address
          </CopyToClipboard>
        </ControlContainer>
      </Page>
    </>
  )
}

export default Referral
