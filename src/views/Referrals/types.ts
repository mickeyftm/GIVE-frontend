import { Address, ReferralConfig } from "config/constants/types";

export interface ReferralProps extends ReferralConfig {
    referralsCount?: number
    isLoading?: boolean
    onDismiss?: () => void
    onReferredSuccess?: () => void
}