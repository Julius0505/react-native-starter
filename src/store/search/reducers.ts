import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'

import { SearchState } from './types'
import { setBingOffset, setFilterSetting, setOffset, setQuery, setType, setSort } from './actions'
import { SEARCH_FIELD_TYPE } from 'enums/constants'
import { NEWS_SORT } from '@screens/news/news-default/NewsScreen'

export const initialState: SearchState = {
  query: '',
  sort: NEWS_SORT[0],
  type: SEARCH_FIELD_TYPE.SEARCH,
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

    builder.addCase(setType, (state, { payload }) => {
      state.type = payload ?? SEARCH_FIELD_TYPE.SEARCH
    })

    builder.addCase(setOffset, (state, { payload }) => {
      state.offset = payload ?? 0 
    })
    
    builder.addCase(setSort, (state, { payload }) => {
      state.sort = payload ?? NEWS_SORT[0]
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
