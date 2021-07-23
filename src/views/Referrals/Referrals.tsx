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
import { getReferralAddress } from 'utils/addressHelpers'
import { useReferralContract } from 'hooks/useContract'
import { Referral, State, ReferralState } from 'state/types'
import { getReferralContract } from 'utils/contractHelpers'
import { recordReferrer, useReferralData, getContractRefAddress, getRefCount } from 'utils/callHelpers'
import { useAppDispatch } from 'state'
import useRefresh from 'hooks/useRefresh'
import web3, { getWeb3NoAccount, getWeb3WithArchivedNodeProvider } from 'utils/web3'
import { ReferralIfoData } from 'hooks/ifo/types'
import makeBatchRequest from 'utils/makeBatchRequest'
import { createSlice } from '@reduxjs/toolkit'
import { getReferralInfo } from 'state/referral'
import CopyToClipboard from './CopyToClipboard'
import ReferralCounter from './components/ReferralCounter'

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
// fetch referral count
export const getUserDataInReferral = async () => {
  try {
    const archivedWeb3 = getWeb3WithArchivedNodeProvider()
    // window.alert(1)
    const referralContract = getReferralContract(archivedWeb3)
    // window.alert(2)
    const { account } = useWeb3React()
    // window.alert(3)
    // const refAddress = await referralContract.methods.getReferrer(account).call()
    const refAddress = await getContractRefAddress(referralContract, account)
    // window.alert(4)
    console.log(refAddress)
    // const referralCount = await referralContract.methods.referralsCount(refAddress).call()
    const referralCount = await getRefCount(referralContract, refAddress)
    // return new BigNumber(referralCount)
    return referralCount
  } catch (error) {
    console.error(`${error}`)
    return null
  }
}

/*
const getReferralCount = async(account, myContract) => {
  const myReferrer = await myContract.methods.referralsCount(account).call() 
  return myReferrer 
}
*/

const Referrals: React.FC = () => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (account) {
      dispatch(getReferralInfo(account))
    }
  }, [dispatch, account])

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
          {t('Your total referral is '.concat(`${getUserDataInReferral()}`))}
        </ControlContainer>
      </Page>
    </>
  )
}

export default Referrals
