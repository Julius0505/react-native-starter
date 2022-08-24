import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'

import { EPodcastCategory, PodcastState, PODCAST_SORT } from './types'
import { setQuery, setSort, setSubscriptions, subscribe, setChecks } from './actions'

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
  loading: false,
  error: false,
  success: false,
  query: '',
  sort: PODCAST_SORT[0],
  subscriptions: [],
  checks: []
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

    builder.addCase(setSubscriptions, (state, { payload }) => {
      state.subscriptions = payload ?? []
    })

    builder.addCase(setChecks, (state, { payload }) => {
      if(!payload) return
      
      const index = state.checks.findIndex(cId => cId === payload)
      
      if(index >= 0) {
        state.checks.splice(index, 1)
      } else {
        state.checks.push(payload)
      }
    })

    builder.addCase(subscribe.pending, (state) => {
      state.loading = true
      state.error = false
      state.success = false
    })

    builder.addCase(subscribe.fulfilled, (state, {payload}) => {
      state.loading = false
      state.success = `subscribed successfully!`
      const index = state.subscriptions.findIndex(sub => sub.id === payload.id)
      
      if(index >= 0) {
        state.subscriptions.splice(index, 1)
      } else {
        state.subscriptions.push(payload)
      }
    })

    builder.addCase(subscribe.rejected, (state, { error }) => {
      state.loading = false
      state.error = error?.message ?? true
      state.success = false
    })
  }
})

export default podcastStore.reducer
