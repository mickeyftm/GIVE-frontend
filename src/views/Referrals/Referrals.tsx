import React, { useCallback, useEffect, useState } from 'react'
import referralAbi from 'config/abi/referral.json'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import PageHeader from 'components/PageHeader'
import Page from 'components/layout/Page'
import styled from 'styled-components'
import { Image, Heading, RowType, Toggle, Text, Button } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import UnlockButton from 'components/UnlockButton'
import { getReferralContract } from 'utils/contractHelpers'
import { useReferralData, getContractRefAddress, getRefCount, countHolder } from 'utils/callHelpers'
import { useAppDispatch } from 'state'
import { getReferralInfo } from 'state/referral'
import useWeb3 from 'hooks/useWeb3'
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

const ReferralCountContainer = styled.div<{account: string}>`
  display: ${({ account }) => account ? "flex": "none"}
`

// fetch referral count
export const getUserDataInReferral = async () => {
  try {
    const web3 = useWeb3()
    const referralContract = getReferralContract(web3)
    const { account } = useWeb3React()
    const referralCount = await getRefCount(referralContract, account)
    const test = await localStorage.getItem('refCount')
    console.log(test)
    return test
  } catch (error) {
    console.error(`${error}`)
    return null
  }
}

const getReferralCount = async (account, myContract) => {
  const myReferrer = await myContract.methods.referralsCount(account).call()
  return myReferrer
}

const Referrals: React.FC = () => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const referContract = getReferralContract()

  useEffect(() => {
    if (account) {
      dispatch(getReferralInfo(account))
    }
  }, [dispatch, account])

  const count = async () => {
    const test = await getReferralCount(account, referContract)
    return test
  }
  const ReferralAddress = ({ isRegistered }) => {
    if (isRegistered) {
      return (
        <Text>
          {' '}
          {`${window.location.protocol}//`}
          {`${window.location.host}/?ref=`}
          {t('%addr%', { addr: account })}{' '}
        </Text>
      )
    }
    return <Text>{t('Please Log in')}</Text>
  }
  const ReferralButton = ({ isRegistered }) => {
    if (!isRegistered) {
      return <UnlockButton width="100%" />
    }
    return (
      <>
        <ReferralAddress isRegistered />
        <CopyToClipboard
          toCopy={' '.concat(
            `${window.location.protocol}//`,
            `${window.location.host}/?ref=`,
            t('%addr%', { addr: account }),
          )}
        >
          Copy Address
        </CopyToClipboard>
      </>
    )
  }

  getUserDataInReferral()

  return (
    <>
      <PageHeader>
        <LeftHeader>
          <Heading as="h1" scale="xxl" color="secondary" mb="24px">
            {t('Referral Program')}
          </Heading>
          <Heading scale="lg" color="text">
          Invite your friends and earn 1% of your friends earnings!
            {/* {t('Share the referral link below to invite your friends and earn 1% of your friends earnings.')} */}
          </Heading>
        </LeftHeader>
      </PageHeader>
      <Page>
        <ControlContainer>
          <ReferralButton isRegistered={account} />
          <ReferralCountContainer account={account}>
            {t('Total referrals: ')} {localStorage.getItem('refCount') ? localStorage.getItem('refCount').toString(): '0'}
          </ReferralCountContainer>
        </ControlContainer>
      </Page>
    </>
  )
}

export default Referrals
