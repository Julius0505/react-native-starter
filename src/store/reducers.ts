import { combineReducers } from '@reduxjs/toolkit'

import authReducer, { initialState as authState } from './auth/reducers'
import settingReducer, {
  initialState as settingState
} from './setting/reducers'
import userReducer, { initialState as userState } from './user/reducers'
import searchReducer, { initialState as searchState } from './search/reducers'
import newsReducer, { initialState as newsState } from './news/reducers'

export const initialRootState = {
  auth: authState,
  setting: settingState,
  user: userState,
  search: searchState,
  news: newsState,
}

const rootReducer = combineReducers({
  auth: authReducer,
  setting: settingReducer,
  user: userReducer,
  search: searchReducer,
  news: newsReducer,
})

export default rootReducer
