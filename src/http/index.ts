import axios, { AxiosRequestConfig } from 'axios'
import { accept20x, getErrorMessage } from './utils'

const baseURL = 'https://user.valurank.com/'

const http = axios.create({ baseURL })

export const apiCall = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const { status, data } = await http(config)

    if (!accept20x(status)) {
      throw new Error(data?.error)
    }

    return data?.result
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

export default http
