import { shallowEqual, useSelector } from 'react-redux'

import { useActionCreator } from 'hooks'
import { UserReturnHook } from './types'
import { RootState } from '../types'
import {
  setError,
  setSuccess,
  updateUser,
  getUser,
  updateAvatar
} from './actions'

export const useUser = (): UserReturnHook => {
  const userState = useSelector((state: RootState) => state.user, shallowEqual)

  return {
    ...userState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    updateUser: useActionCreator(updateUser),
    updateAvatar: useActionCreator(updateAvatar),
    getUser: useActionCreator(getUser)
  }
}
