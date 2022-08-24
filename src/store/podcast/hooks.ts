import { shallowEqual, useSelector } from 'react-redux'

import { useActionCreator } from 'hooks'
import { PodcastReturnHook } from './types'
import { RootState } from '../types'
import {
  setChecks,
  setQuery,
  setSort,
  setSubscriptions,
  subscribe
} from './actions'

export const usePodcast = (): PodcastReturnHook => {
  const podcastState = useSelector(
    (state: RootState) => state.podcast,
    shallowEqual
  )

  return {
    ...podcastState,
    setQuery: useActionCreator(setQuery), 
    setSort: useActionCreator(setSort),
    setSubscriptions: useActionCreator(setSubscriptions),
    subscribe: useActionCreator(subscribe),
    setChecks: useActionCreator(setChecks)
  }
}
