import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'

import { SearchState } from './types'
import { setBingOffset, setFilterSetting, setOffset, setQuery } from './actions'

export const initialState: SearchState = {
  query: '',
  filterSetting: [],
  lang: 'en',
  market: 'en-US', 
  offset: 0,
  bingOffset: 0
}

const searchStore = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<SearchState>): void => {

    builder.addCase(setQuery, (state, { payload }) => {
      state.query = payload ?? ''
    })

    builder.addCase(setOffset, (state, { payload }) => {
      state.offset = payload ?? 0 
    })
    
    builder.addCase(setBingOffset, (state, { payload }) => {
      state.bingOffset = payload ?? 0
    })

    builder.addCase(setFilterSetting, (state, { payload }) => {
      if(!payload) return

      const index = state.filterSetting.findIndex(setting => setting === payload)
      
      if(index >= 0) {
        state.filterSetting.splice(index, 1)
      } else {
        state.filterSetting.push(payload)
      }
    })
  }
})

export default searchStore.reducer
