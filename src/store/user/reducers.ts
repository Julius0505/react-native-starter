import { ActionReducerMapBuilder, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { UserState } from './types'
import {
  setError,
  setSuccess,
  updateUser,
  getUser,
  updateAvatar
} from './actions'
import { logout } from '../auth/actions'
import { authErrorHandler } from 'http/utils'

export const initialState: UserState = {
  loading: false,
  error: false,
  success: false,
  user: null
}

const userStore = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UserState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload
    })

    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload
    })

    builder.addCase(updateUser.fulfilled, (state) => {
      state.loading = false
      state.success = 'User updated successfully!'
    })

    builder.addCase(updateAvatar.fulfilled, (state) => {
      state.loading = false
      state.success = 'User updated successfully!'
    })

    builder.addCase(logout, () => initialState)

    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.loading = false
      state.user = payload
    })

    builder.addMatcher(
      isAnyOf(updateUser.pending, updateAvatar.pending, getUser.pending),
      (state) => {
        state.loading = true
        state.error = false
        state.success = false
      }
    )

    builder.addMatcher(
      isAnyOf(updateUser.rejected, getUser.rejected, updateAvatar.rejected),
      (state, { error }) => {
        state.loading = false
        state.error = authErrorHandler(error?.message ?? true)
        state.success = false
      }
    )
  }
})

export default userStore.reducer
