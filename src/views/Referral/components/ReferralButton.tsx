import UnlockButton from 'components/UnlockButton'
import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { getReferralAddress } from 'utils/addressHelpers'


const ReferralButton = ({isRegistered}) => {
    const referralUrlAddress = getReferralAddress()
    const { t } = useTranslation()
    if(!isRegistered) {
        return (<UnlockButton width="100%" />)
    }
    return (
    <text> {`${window.location.protocol}//`}{`${window.location.host}/`}{t('%addr%', { addr: referralUrlAddress })} </text>)
}

export default ReferralButton