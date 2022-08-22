import { AUTH_SESSION_KEY } from '../../enums/constants'
import { AuthSession } from './types'
import AsyncStorage  from '@react-native-async-storage/async-storage';

export const setAuthSession = (data: AuthSession, rememberMe = false) => {
    AsyncStorage?.setItem(AUTH_SESSION_KEY, JSON.stringify(data))
}

export const getAutSession = (): AuthSession | null => {
  try {
    const savedSession =
    AsyncStorage?.getItem(AUTH_SESSION_KEY) 
    // if (savedSession) {
    //   const parsed = JSON.parse(savedSession)
    //   return parsed
    // }
    return null
  } catch (error) {
    return null
  }
}

export const clearAuthSession = (): void => {
  AsyncStorage?.removeItem(AUTH_SESSION_KEY)
}

