import React from 'react'
import { Menu as UikitMenu } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
import { usePriceCakeBusd, useProfile } from 'state/hooks'
import { checkUrl, recordReferrer } from 'utils/callHelpers'
import { getReferralContract } from 'utils/contractHelpers'
import config from './config'

const Menu = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const myReferralContract = getReferralContract()
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = usePriceCakeBusd()
  const { profile } = useProfile()
  const { currentLanguage, setLanguage, t } = useTranslation()

  const getReferrerAddress = () => {
  const params = new URLSearchParams(document.location.search.substring(1))
  const name = params.get("ref")
  return name
}

const RecordReferral = () => {
  const isReferred = checkUrl()
  if (isReferred) {
    return (
      recordReferrer(myReferralContract,account,getReferrerAddress)
    )
  } return null
}

  return (
    <>
    {RecordReferral}
    <UikitMenu
      account={account}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      cakePriceUsd={cakePriceUsd.toNumber()}
      links={config(t)}
      profile={{
        username: profile?.username,
        image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
        profileLink: '/profile',
        noProfileLink: '/profile',
        showPip: !profile?.username,
      }}
      {...props}
    />
    </>
  )
}

export default Menu
