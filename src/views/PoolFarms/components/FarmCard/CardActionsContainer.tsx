import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { provider as ProviderType } from 'web3-core'
import BigNumber from 'bignumber.js'
import { Button, Flex, Text, useModal } from '@pancakeswap/uikit'
import { getAddress } from 'utils/addressHelpers'
import { getBep20Contract } from 'utils/contractHelpers'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { Farm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import useWeb3 from 'hooks/useWeb3'
import { useApprove } from 'hooks/useApprove'
import UnlockButton from 'components/UnlockButton'
import StakeAction from './StakeAction'
import HarvestAction from './HarvestAction'
import CompoundModal from './CompoundModal'
import useStake from "../../../../hooks/useStake";
import {BIG_TEN} from "../../../../utils/bigNumber";

const Action = styled.div`
  padding-top: 16px;
`

// for compound button
const CompoundButtonContainer = styled.div<{ isGivePool: boolean }>`
  margin-top: 2px;
  margin-bottom: 5px;
  display: ${ ({ isGivePool }) => isGivePool ? "flex": "none" };
  flex-direction: column;
  align-items: flex-end;
`

export interface FarmWithStakedValue extends Farm {
  apr?: number
}

interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  provider?: ProviderType
  account?: string
  addLiquidityUrl?: string
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, account, addLiquidityUrl }) => {
  const { t } = useTranslation()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses } = farm
  const {
    allowance: allowanceAsString = 0,
    tokenBalance: tokenBalanceAsString = 0,
    stakedBalance: stakedBalanceAsString = 0,
    earnings: earningsAsString = 0,
  } = farm.userData || {}
  const allowance = new BigNumber(allowanceAsString)
  const tokenBalance = new BigNumber(tokenBalanceAsString)
  const stakedBalance = new BigNumber(stakedBalanceAsString)
  const earnings = new BigNumber(earningsAsString)
  const lpAddress = getAddress(lpAddresses)
  const lpName = farm.lpSymbol.toUpperCase()
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const web3 = useWeb3()
  const dispatch = useAppDispatch()

  // changed getBep20 to our masterchef contract to see (didnt help)
  const lpContract = getBep20Contract(lpAddress, web3)

  const { onApprove } = useApprove(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, dispatch, account, pid])

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenName={lpName}
        pid={pid}
        addLiquidityUrl={addLiquidityUrl}
        tokenDecimals={BIG_TEN.pow(farm.token.decimals)}
      />
    ) : (
      <Button mt="8px" width="100%" disabled={requestedApproval} onClick={handleApprove}>
        {t('Approve Contract')}
      </Button>
    )
  }

  // for compounding
  const { onStake } = useStake(pid, BIG_TEN.pow(farm.token.decimals))
  const [onPresentCompound] = useModal(
      <CompoundModal earnings={earnings} onConfirm={onStake} tokenName={farm.lpSymbol} />,
  )


  return (
    <Action>
      <Flex>
        <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pr="3px">
          GIVE
        </Text>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          {t('Earned')}
        </Text>
      </Flex>
      <CompoundButtonContainer isGivePool={pid === 0}>
        <Button onClick={onPresentCompound}>Compound</Button>
      </CompoundButtonContainer>
      <HarvestAction earnings={earnings} pid={pid} />
      <Flex>
        <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pr="3px">
          {lpName}
        </Text>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          {t('Staked')}
        </Text>
      </Flex>
      {!account ? <UnlockButton mt="8px" width="100%" /> : renderApprovalOrStakeButton()}
    </Action>
  )
}

export default CardActions
