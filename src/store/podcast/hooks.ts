import { shallowEqual, useSelector } from 'react-redux'

import { useActionCreator } from 'hooks'
import { PodcastReturnHook } from './types'
import { RootState } from '../types'
import {
  setCategory,
  setCutOffs,
  setQuery,
  setSearchAfter,
  setSort,
  setSourceCheck,
  setUnCheckedSources
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
    setSearchAfter : useActionCreator(setSearchAfter),
    setCategory : useActionCreator(setCategory),
    setCutOffs : useActionCreator(setCutOffs),
    setSourceCheck: useActionCreator(setSourceCheck),
    setUnCheckedSources: useActionCreator(setUnCheckedSources)
  }
}
