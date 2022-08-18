import { ActionReducerMapBuilder, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { AuthState } from './types'
import {
  setError,
  login,
  changePassword,
  setSuccess,
  logout,
  setSession,
  setAuthSession,
  forgotPassword,
  initPasswordReset,
  register
} from './actions'
import { getAutSession } from './utils'
import { authErrorHandler } from 'http/utils'

export const initialState: AuthState = {
  loading: false,
  error: false,
  success: false,
  access_token: null,
  refresh_token: null,
  expires_in: null,
  session: null,
  id: null,
  username: null,
  role: null,
  rememberMe: false
}

const getInitialState = async (): Promise<AuthState> => {
  const initialAuthSession = await getAutSession()
  return {
    ...initialState,
    ...(initialAuthSession ?? {})
  }
}

const authStore = createSlice({
  name: 'auth',
  initialState: await getInitialState(),
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload
    })

    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload
    })

    builder.addCase(changePassword.fulfilled, (state) => {
      state.loading = false
      state.success = 'Changed password successfully!'
    })

    // builder.addCase(logout, () => getInitialState())

    builder.addCase(register.fulfilled, (state) => {
      state.loading = false
      state.success =
        'Registration successful, we sent you an email message with a link to activate your account'
    })

    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.loading = false
      state.success = 'Please check your email box.'
    })

    builder.addCase(setSession, (state, { payload }) => {
      state.session = payload.session
      state.rememberMe = payload.rememberMe
      state.username = payload.username
    })

    builder.addCase(setAuthSession, (state, { payload }) => {
      state.access_token = payload.access_token
      state.refresh_token = payload.refresh_token
      state.expires_in = payload.expires_in
      state.rememberMe = payload.rememberMe
      state.session = null
    })

    builder.addCase(initPasswordReset.fulfilled, (state) => {
      state.loading = false
      state.success = true
    })

    builder.addMatcher(isAnyOf(login.fulfilled), (state) => {
      state.loading = false
      state.success = true
    })

    builder.addMatcher(
      isAnyOf(
        login.pending,
        changePassword.pending,
        register.pending,
        forgotPassword.pending,
        initPasswordReset.pending
      ),
      (state) => {
        state.loading = true
        state.error = false
        state.success = false
      }
    )

    builder.addMatcher(
      isAnyOf(
        changePassword.rejected,
        forgotPassword.rejected,
        register.rejected,
        login.rejected,
        initPasswordReset.rejected
      ),
      (state, { error }) => {
        state.loading = false
        state.success = false
        state.error = authErrorHandler(error?.message ?? true)
      }
    )
  }
})

export default authStore.reducer
