import { ActionReducerMapBuilder, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { SettingState } from './types'
import {
  setError,
  setSuccess,
  setSetting,
  createSetting,
  getSetting,
  setSearchType
} from './actions'
import { logout } from '../auth/actions'
import { SEARCH_FIELD_TYPE } from 'enums/constants'

export const initialState: SettingState = {
  loading: false,
  error: false,
  success: false,
  setting: null,
  searchType: SEARCH_FIELD_TYPE.SEARCH
}

const settingStore = createSlice({
  name: 'setting',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<SettingState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload
    })

    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload
    })

    builder.addCase(setSetting, (state, { payload }) => {
      state.setting = payload
    })

    builder.addCase(createSetting.fulfilled, (state) => {
      state.loading = false
      state.success = `Setting created successfully!`
    })

    builder.addCase(logout, () => initialState)

    builder.addCase(setSearchType, (state, { payload }) => {
      state.searchType = payload ?? SEARCH_FIELD_TYPE.SEARCH
    })

    builder.addCase(getSetting.fulfilled, (state, { payload }) => {
      state.loading = false
      state.setting = payload?.hits?.hits?.[0]?._source
    })

    builder.addMatcher(
      isAnyOf(createSetting.pending, getSetting.pending),
      (state) => {
        state.loading = true
        state.error = false
        state.success = false
      }
    )

    builder.addMatcher(
      isAnyOf(createSetting.rejected, getSetting.rejected),
      (state, { error }) => {
        state.loading = false
        state.error = error?.message ?? true
        state.success = false
      }
    )

   
  }
})

export default settingStore.reducer
