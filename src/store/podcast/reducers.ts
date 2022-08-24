import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'

import { EPodcastCategory, PodcastState, PODCAST_SORT } from './types'
import { setQuery, setSort, setSearchAfter, setCategory, setCutOffs, setSourceCheck, setUnCheckedSources, } from './actions'

export const defaultCutOffs = {
  [EPodcastCategory.POLITICS]: 85,
  [EPodcastCategory.TECH]: 85,
  [EPodcastCategory.WORLD]: 85,
  [EPodcastCategory.ENTERTAINMENT]: 100,
  [EPodcastCategory.BUSINESS]: 85,
  [EPodcastCategory.SCIENCE]: 85,
  [EPodcastCategory.HEALTH]: 85,
  [EPodcastCategory.SPORT]: 100
}



export const initialState: PodcastState = {
  query: '',
  sort: PODCAST_SORT[0],
  searchAfter: '',
  category: EPodcastCategory.ALL,
  cutoffs: defaultCutOffs,
  unCheckedSources: []
}

const podcastStore = createSlice({
  name: 'podcast',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<PodcastState>): void => {

    builder.addCase(setQuery, (state, { payload }) => {
      state.query = payload ?? ''
    })

    builder.addCase(setSort, (state, { payload }) => {
      state.sort = payload ?? PODCAST_SORT[0]
    })

    builder.addCase(setSearchAfter, (state, { payload }) => {
      state.searchAfter = payload ?? ''
    })

    builder.addCase(setCategory, (state, { payload }) => {
      state.category = payload ?? EPodcastCategory.ALL
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

export default podcastStore.reducer
