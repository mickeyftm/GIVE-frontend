/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchReferralUserInfo } from 'utils/callHelpers'
import { ReferralState } from '../types'

const initialState: ReferralState = {
    userDataLoaded: true,
    data: {
        referralsCount: 0,
        referrer: ''
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
const {setBlock} = referralSlice.actions

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

export const getReferralInfo = (account) => async (dispatch) => {
    const referralUserData = await fetchReferralUserInfo(account)
    dispatch(setBlock(referralUserData))

}

export default referralSlice.reducer
