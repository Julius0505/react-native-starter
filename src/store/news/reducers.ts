import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'

import { defaultCutOffs, ENewsCategory, NewsState, NEWS_SORT } from './types'
import { setQuery, setSort, setSearchAfter, setCategory, setCutOffs, setSourceCheck, setUnCheckedSources, setNews, setAllSources} from './actions'


export const initialState: NewsState = {
  query: '',
  sort: NEWS_SORT[0],
  searchAfter: '',
  category: ENewsCategory.ALL,
  cutoffs: defaultCutOffs,
  unCheckedSources: [],
  news: null,
  allSources: []
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

    builder.addCase(setAllSources, (state, { payload }) => {
      state.allSources = payload ?? []
    })

    builder.addCase(setNews, (state, { payload }) => {
      state.news = payload ?? null
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
