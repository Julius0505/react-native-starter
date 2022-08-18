import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

import {
  login as loginApi,
  register as registerApi,
  changePassword as changePasswordApi,
  forgotPassword as forgotPasswordApi,
  initPasswordReset as initPasswordResetApi
} from '../../http/auth'
import { setAuthSession as persistAuthSession } from './utils'
import {
  AuthSession,
  ChangePasswordData,
  LoginData,
  RegisterData
} from './types'

const SET_ERROR = 'auth/SET_ERROR'
const SET_SUCCESS = 'auth/SET_SUCCESS'
const LOGIN = 'auth/LOGIN'
const REGISTER = 'auth/REGISTER'
const CHANGE_PASSWORD = 'auth/CHANGE_PASSWORD'
const LOG_OUT = 'auth/LOG_OUT'
const SET_AUTH_SESSION = 'auth/SET_AUTH_SESSION'
const SET_SESSION = 'auth/SET_SESSION'
const SET_NEW_PASSWORD = 'auth/SET_NEW_PASSWORD'
const INIT_PASSWORD_RESET = 'auth/INIT_PASSWORD_RESET'

export const setError = createAction<string | boolean>(SET_ERROR)

export const setSuccess = createAction<string | boolean>(SET_SUCCESS)

export const logout = createAction<void>(LOG_OUT)

export const setAuthSession = createAction<AuthSession>(SET_AUTH_SESSION)

export const setSession = createAction<{
  session: string
  rememberMe: boolean
  username: string
}>(SET_SESSION)

export const login = createAsyncThunk<void, LoginData>(
  LOGIN,
  async ({ username, password, rememberMe }, { dispatch }) => {
    const { access_token, refresh_token, expires_in } = await loginApi(
      username,
      password
    )

    if (!access_token) return

    const authSession: AuthSession = {
      access_token: access_token ?? '',
      refresh_token: refresh_token ?? '',
      rememberMe,
      expires_in: Date.now() + (expires_in ?? 0) * 1000
    }

    persistAuthSession(authSession, rememberMe)
    dispatch(setAuthSession(authSession))
    return
  }
)

export const register = createAsyncThunk<void, RegisterData>(
  REGISTER,
  async ({ username, email, password }) => {
    await registerApi(username, email, password)
  }
)

export const changePassword = createAsyncThunk<void, ChangePasswordData>(
  CHANGE_PASSWORD,
  async ({ token, password }) => {
    await changePasswordApi(token, password)
  }
)

export const forgotPassword = createAsyncThunk<void, string>(
  SET_NEW_PASSWORD,
  async (email) => {
    await forgotPasswordApi(email)
    return
  }
)

export const initPasswordReset = createAsyncThunk<void, string>(
  INIT_PASSWORD_RESET,
  async (email) => {
    await initPasswordResetApi(email)
  }
)
