import { combineReducers } from '@reduxjs/toolkit'

import authReducer, { initialState as authState } from './auth/reducers'
import settingReducer, {
  initialState as settingState
} from './setting/reducers'
import userReducer, { initialState as userState } from './user/reducers'
import searchReducer, { initialState as searchState } from './search/reducers'

export const initialRootState = {
  auth: authState,
  setting: settingState,
  user: userState,
  search: searchState,
}

const rootReducer = combineReducers({
  auth: authReducer,
  setting: settingReducer,
  user: userReducer,
  search: searchReducer,
})

export default rootReducer
