import { combineReducers } from '@reduxjs/toolkit'

import authReducer, { initialState as authState } from './auth/reducers'
import settingReducer, {
  initialState as settingState
} from './setting/reducers'
import userReducer, { initialState as userState } from './user/reducers'

export const initialRootState = {
  auth: authState,
  setting: settingState,
  user: userState
}

const rootReducer = combineReducers({
  auth: authReducer,
  setting: settingReducer,
  user: userReducer
})

export default rootReducer
