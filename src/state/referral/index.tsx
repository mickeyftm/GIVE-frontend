/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReferralState } from '../types'
import fetchReferralInfo from "./fetchReferralInfo"

const initialState: ReferralState = {
    userDataLoaded: true,
    data: {
        referralsCount: 0,
        referrer: '0x0000000000000000000000000000000000000000'
    }
}

export const referralSlice = createSlice({
    name: 'Referral',
    initialState,
    reducers: {
        setBlock: (state, action) => {
            state.data = action.payload
        },
  },
})

// Actions
export const {setBlock} = referralSlice.actions

// Thunks
/*
export const fetchTeam = (teamId: number) => async (dispatch) => {
  try {
    dispatch(fetchStart())
    const team = await getTeam(teamId)
    dispatch(teamFetchSucceeded(team))
  } catch (error) {
    dispatch(fetchFailed())
  }
} */

export const getReferralInfo = (account: string) => async (dispatch) => {
    const referralUserData = await fetchReferralInfo(account)
    dispatch(setBlock(referralUserData))

}

export default referralSlice.reducer
