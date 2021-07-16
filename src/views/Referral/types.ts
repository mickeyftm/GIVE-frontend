import { Address, ReferralConfig } from "config/constants/types";

export interface ReferralProps extends ReferralConfig {
    referralCount?: number
    userReferrerInformation?: Address
    isLoading?: boolean
    onDismiss?: () => void
    onReferredSuccess?: () => void
}