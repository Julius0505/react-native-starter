import { AuthResponse, SignInResponse } from '../../store/auth/types'
import { apiCall } from '../index'

export const login = (
  username: string,
  password: string
): Promise<SignInResponse> =>
  apiCall({
    method: 'get',
    url: 'auth/sign-in',
    auth: { username, password }
  })

export const register = (
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> =>
  apiCall({
    method: 'post',
    url: 'auth/sign-up',
    data: {
      username,
      email,
      password,
      redirect_to: 'https://otherweb.com?action=signin'
    }
  })

export const changePassword = (
  token: string,
  password: string
): Promise<null> =>
  apiCall({
    method: 'post',
    url: '/auth/change-password',
    data: { token, password }
  })

export const logout = (): Promise<null> =>
  apiCall({ method: 'GET', url: `/auth/sign-out` })

export const forgotPassword = (email: string): Promise<null> =>
  apiCall({
    method: 'post',
    url: '/auth/forgot-password',
    data: { email, redirect_to: 'https://otherweb.com/change-password' }
  })

export const initPasswordReset = (email: string): Promise<null> =>
  apiCall({ method: 'post', url: '/auth/password-reset/init', data: { email } })

export const confirmPasswordReset = (
  token: string,
  password: string
): Promise<SignInResponse> =>
  apiCall({
    method: 'post',
    url: '/auth/password-reset/confirm',
    data: { token, password }
  })
