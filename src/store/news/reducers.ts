import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'

import { ENewsCategory, NewsState } from './types'
import { setQuery, setSort, setSearchAfter, setCategory, setCutOffs, setSourceCheck, setUnCheckedSources, } from './actions'
import { NEWS_SORT } from '@screens/news/news-default/NewsScreen'

export const defaultCutOffs = {
  [ENewsCategory.POLITICS]: 85,
  [ENewsCategory.TECH]: 85,
  [ENewsCategory.WORLD]: 85,
  [ENewsCategory.ENTERTAINMENT]: 100,
  [ENewsCategory.BUSINESS]: 85,
  [ENewsCategory.SCIENCE]: 85,
  [ENewsCategory.HEALTH]: 85,
  [ENewsCategory.SPORT]: 100
}

export const initialState: NewsState = {
  query: '',
  sort: NEWS_SORT[0],
  searchAfter: '',
  category: ENewsCategory.ALL,
  cutoffs: defaultCutOffs,
  unCheckedSources: []
}

const newsStore = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<NewsState>): void => {

    builder.addCase(setQuery, (state, { payload }) => {
      state.query = payload ?? ''
    })

    builder.addCase(setSort, (state, { payload }) => {
      state.sort = payload ?? NEWS_SORT[0]
    })

    builder.addCase(setSearchAfter, (state, { payload }) => {
      state.searchAfter = payload ?? ''
    })

    builder.addCase(setCategory, (state, { payload }) => {
      state.category = payload ?? ENewsCategory.ALL
    })

    builder.addCase(setCutOffs, (state, { payload }) => {
      state.cutoffs = payload ?? defaultCutOffs
    })

    builder.addCase(setUnCheckedSources, (state, { payload }) => {
      state.unCheckedSources = payload ?? []
    })

    builder.addCase(setSourceCheck, (state, { payload }) => {
      if(!payload) return

      const index = state.unCheckedSources.findIndex(source => source === payload)
      
      if(index >= 0) {
        state.unCheckedSources.splice(index, 1)
      } else {
        state.unCheckedSources.push(payload)
      }
    })

  }
})

export default newsStore.reducer
