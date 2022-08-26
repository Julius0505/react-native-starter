import { AUTH_STORAGE_KEY } from '../../enums/constants'
import { AuthStorage } from './types'
import AsyncStorage  from '@react-native-async-storage/async-storage';

export const getAuthAsyncStorage = async () : Promise<AuthStorage | null> => {
  try {
    const data = await AsyncStorage.getItem(AUTH_STORAGE_KEY)
    if (data) {
      const parsed: AuthStorage = JSON.parse(data)
      return parsed
    } 
    return null
  } catch (error) {
    return null
  }
}

export const setAuthAsyncStorage = async (data: AuthStorage, rememberMe = false) => {
  await AsyncStorage?.setItem(AUTH_STORAGE_KEY, JSON.stringify(data))
}

export const clearAuthAsyncStorage = async () => {
  await AsyncStorage?.removeItem(AUTH_STORAGE_KEY)
}

