/* ApyButton.tsx

APY Calculator Component

*/
import React from 'react'
import BigNumber from 'bignumber.js'
import { IconButton, useModal, CalculateIcon } from '@pancakeswap/uikit'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import { useTranslation } from 'contexts/Localization'

export interface ApyButtonProps {
  lpLabel?: string
  cakePrice?: BigNumber
  apr?: number
  addLiquidityUrl?: string
}


const ApyButton: React.FC<ApyButtonProps> = ({ lpLabel, cakePrice, apr, addLiquidityUrl }) => {
  const { t } = useTranslation()
  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal
    //  i.e. Get CAKE-BNB LP
      linkLabel={t('Get %symbol%', { symbol: lpLabel })}
      tokenPrice={cakePrice.toNumber()}
      //  APR %, 2 decimal places i.e. 22.55%
      apr={apr}
      linkHref={addLiquidityUrl}
    />,
  )

  const handleClickButton = (event): void => {
    event.stopPropagation()
    onPresentApyModal()
  }

  return (
    <IconButton onClick={handleClickButton} variant="text" scale="sm" ml="4px">
      <CalculateIcon width="18px" />
    </IconButton>
  )
}

export default ApyButton
