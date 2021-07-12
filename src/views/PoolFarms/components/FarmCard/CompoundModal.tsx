import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import React, { useMemo, useState } from 'react'
import { Button, Modal } from '@pancakeswap/uikit'
import ModalActions from 'components/ModalActions'
import Balance from 'components/Balance'
import { getFullDisplayBalance } from 'utils/formatBalance'
import {useTranslation} from "../../../../contexts/Localization";

interface DepositModalProps {
    earnings: BigNumber
    onConfirm: (amount: string) => void
    onDismiss?: () => void
    tokenName?: string
}

// the modal that pops up when the compound button is pressed on the GIVE pool card
const CompoundModal: React.FC<DepositModalProps> = ({ earnings, onConfirm, onDismiss, tokenName = '' }) => {
    const [pendingTx, setPendingTx] = useState(false)
    const { t } = useTranslation()
    const fullBalance = useMemo(() => {
        return getFullDisplayBalance(earnings)
    }, [earnings])

    return (
        <Modal
            title={`${t('Compound')} ${t(`${tokenName} Earned`)}`}
            onDismiss={onDismiss}
        >
            <BalanceRow>
                <Balance value={Number(fullBalance)} />
            </BalanceRow>
            <ModalActions>
                <Button variant="secondary" onClick={onDismiss}>
                    {t('Cancel')}
                </Button>
                <Button
                    id="compound-cake"
                    disabled={pendingTx}
                    onClick={async () => {
                        setPendingTx(true)
                        await onConfirm(fullBalance)
                        setPendingTx(false)
                        onDismiss()
                    }}
                >
                    {pendingTx ? t('Pending Confirmation') : t('Confirm')}
                </Button>
            </ModalActions>
        </Modal>
    )
}

export default CompoundModal

const BalanceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`
