import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { ISubscription } from '@services/models'
import { addSubscribe } from 'http/podcast'

const SET_QUERY = 'podcast/SET_QUERY'
const SET_SORT = 'podcast/SET_SORT'
const SET_SUBSCRIPTIONS = 'podcast/SET_SUBSCRIPTIONS'
const SET_CHECKS = 'podcast/SET_CHECKS'
const SUBSCRIBE = 'podcast/SUBSCRIBE'
const SET_EPISODE = 'podcast/SET_EPISODE'
const SET_PLAYING = 'podcast/SET_PLAYING'

export const setQuery = createAction<void>(SET_QUERY)
export const setSort = createAction<void>(SET_SORT)
export const setSubscriptions = createAction<void>(SET_SUBSCRIPTIONS)
export const setChecks = createAction<void>(SET_CHECKS)
export const setEpisode = createAction<void>(SET_EPISODE)
export const setPlaying = createAction<void>(SET_PLAYING)
export const subscribe = createAsyncThunk<ISubscription, ISubscription>(
    SUBSCRIBE,
    async (data) => {
      await addSubscribe(data.id)
      return data
    }
  )

