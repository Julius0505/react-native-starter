import { AUTH_SESSION_KEY } from '../../enums/constants'
import { AuthSession } from './types'
import AsyncStorage  from '@react-native-async-storage/async-storage';

export const setAuthSession = async (data: AuthSession, rememberMe = false) => {
    await AsyncStorage?.setItem(AUTH_SESSION_KEY, JSON.stringify(data))
}

export const getAutSession = async (): Promise<AuthSession | null> => {
  try {
    const savedSession =
    await AsyncStorage?.getItem(AUTH_SESSION_KEY) 
    if (savedSession) {
      const parsed = JSON.parse(savedSession)
      return parsed
    }
    return null
  } catch (error) {
    return null
  }
}

export const clearAuthSession = (): void => {
  AsyncStorage?.removeItem(AUTH_SESSION_KEY)
}

