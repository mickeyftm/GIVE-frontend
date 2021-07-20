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
import {Referral, State, ReferralState} from "state/types"
import { getReferralContract } from 'utils/contractHelpers'
import {recordReferrer} from 'utils/callHelpers'
import { useAppDispatch } from 'state'
import useRefresh from 'hooks/useRefresh'
import web3, { getWeb3NoAccount, getWeb3WithArchivedNodeProvider } from 'utils/web3'
import { ReferralIfoData} from 'hooks/ifo/types'
import makeBatchRequest from 'utils/makeBatchRequest'
import CopyToClipboard from './CopyToClipboard'
/*
const initialState: ReferralState = {
  userDataLoaded: true
} */

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
export const getUserDataInReferral = async (address) => {
  try{
    const archivedWeb3 = getWeb3WithArchivedNodeProvider()
    const referralContract = getReferralContract(archivedWeb3)
    const referralCount =  await referralContract.methods.referralsCount(address).call()
    return new BigNumber(referralCount)
  }catch (error){
    console.error(`${error}`)
    return null
  }
}

/*
// fetch referral data from smart contract; and setstate
const useGetReferralIfoData = (referral: Referral): ReferralIfoData => {
  const { fastRefresh } = useRefresh()
  const [state, setState] = useState<ReferralIfoData>({

  const { address, referralsCount } = referral

  const { account } = useWeb3React()
  const contract = useReferralContract()
  const referralCount = getUserDataInReferral(address)


  const fetchReferrerData = async () => {
    const [referrer] = await makeBatchRequest([
      contract.methods.getReferrer(account).call,
    ])
  }

  return { ...state, referralCount, contract }
} */ 

export const useReferrals = (): ReferralState => {
  const referrals = useSelector((state: State) => state.referrals)
  return referrals
}

// fetch referral with a user address
export const useReferralFromAddress = (address): Referral => {
  try{
  const referral = useSelector((state: State) => state.referrals.data.find((f) => f.address === address))
  return referral}
  catch (error)  {
    console.error(`${error}`)
    return null
  }
}

const useReferralUser = (address) => {
  const referral = useReferralFromAddress(address)
  return {
    address: referral ? new BigNumber(referral.address) : BIG_ZERO,
    referralsCount: referral ? new BigNumber(referral.referralsCount) : BIG_ZERO,
    referrer: referral ? new BigNumber(referral.referrer) : BIG_ZERO,
  }
}


const Referrals: React.FC = () => {
  web3.eth.defaultAccount = web3.eth.accounts[0]
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const myContract = getReferralContract()
  
  const myReferrer = myContract.methods.referralsCount(account).call()

alert (myReferrer)
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
  )}
  
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
        </ControlContainer>
      </Page>
    </>
  )
}

export default Referrals
