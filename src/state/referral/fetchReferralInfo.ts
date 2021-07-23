import { getReferralAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from "utils/formatBalance"
import multicall  from 'utils/multicall'
import referralAbi from "config/abi/referral.json"
import { BigNumber } from 'bignumber.js'

const fetchReferralInfo = async (account: string) => {
    const referralAddress = getReferralAddress()
  
    const calls = [
      {
        address: referralAddress,
        name: 'getReferrer',
        params: [account],
      },
      {
        address: referralAddress,
        name: 'referralsCount',
        params: [account],
      }
    ]
  
    const [referrer, referralsCount] = await multicall(referralAbi, calls)
    return {
      referrer: referrer[0],
      referralsCount: new BigNumber(referralsCount[0]._hex).toString(),
    }
  }

  export default fetchReferralInfo