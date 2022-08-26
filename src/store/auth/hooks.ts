import { useCallback } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { logout as logoutApi } from 'http/auth'

import { AuthReturnHook } from './types'
import { RootState } from '../types'
import {
  login,
  setError,
  changePassword,
  setSuccess,
  logout as logoutAction,
  forgotPassword,
  initPasswordReset,
  register
} from './actions'
import { clearAuthAsyncStorage } from './utils'
import { useActionCreator } from '../../hooks'

export const useAuth = (): AuthReturnHook => {
  const authState = useSelector((state: RootState) => state.auth, shallowEqual)
  const dispatch = useDispatch()

  const logout = useCallback(async () => {
    await logoutApi()
    await clearAuthAsyncStorage()
    dispatch(logoutAction())
  }, [dispatch])

  return {
    ...authState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    login: useActionCreator(login),
    register: useActionCreator(register),
    changePassword: useActionCreator(changePassword),
    logout: useActionCreator(logout),
    forgotPassword: useActionCreator(forgotPassword),
    initPasswordReset: useActionCreator(initPasswordReset)
  }
}
