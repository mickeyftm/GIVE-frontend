import UnlockButton from 'components/UnlockButton'
import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'

import { getReferralAddress } from 'utils/addressHelpers'
const referralUrlAddress = getReferralAddress()
const { t } = useTranslation()
const ReferralButton = ({isRegistered}) => {
    if(!isRegistered) {
        return (<UnlockButton width="100%" />)
    }
    return (
    <Text> {`${window.location.protocol}//`}{`${window.location.host}/`}{t('%addr%', { addr: referralUrlAddress })} </Text>)
}

export default ReferralButton