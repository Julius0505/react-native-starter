import { apiCall } from '../index'

// eslint-disable-next-line
export const getSetting = (keys: string[]): Promise<any> =>
  apiCall({
    method: 'get',
    url: `/storage/get?${keys.map((key) => `key=${key}`).join('&')}`
  })

// eslint-disable-next-line
export const createSetting = (data: any): Promise<any> =>
  apiCall({
    method: 'post',
    url: '/storage/set',
    data
  })

export const deleteSetting = (key: string): Promise<null> =>
  apiCall({ method: 'post', url: `/storage/delete`, data: { key } })
