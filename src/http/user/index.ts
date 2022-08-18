import { UpdateUserRequestData, User } from 'store/user/types'
import { apiCall } from '../index'

export const getUser = (): Promise<User> =>
  apiCall({ method: 'get', url: `/account/data` })

export const updateUser = (
  data: Partial<UpdateUserRequestData>
): Promise<null> => apiCall({ method: 'post', url: `/account/data`, data })

export const updateAvatar = (avatar: any): Promise<null> => {
  const formData = new FormData()
  formData.append('file', avatar)
  return apiCall({
    method: 'post',
    url: `/account/upload-avatar`,
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData
  })
}
