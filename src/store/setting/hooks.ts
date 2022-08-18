import { shallowEqual, useSelector } from 'react-redux'

import { useActionCreator } from 'hooks'
import { SettingReturnHook } from './types'
import { RootState } from '../types'
import {
  setError,
  setSuccess,
  setSetting,
  createSetting as createSettingAction,
  getSetting
} from './actions'

export const useSetting = (): SettingReturnHook => {
  const settingState = useSelector(
    (state: RootState) => state.setting,
    shallowEqual
  )

  return {
    ...settingState,
    setError: useActionCreator(setError),
    setSetting: useActionCreator(setSetting),
    setSuccess: useActionCreator(setSuccess),
    createSetting: useActionCreator(createSettingAction),
    getSetting: useActionCreator(getSetting)
  }
}
