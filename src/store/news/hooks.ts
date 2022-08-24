import { shallowEqual, useSelector } from 'react-redux'

import { useActionCreator } from 'hooks'
import { NewsReturnHook } from './types'
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

export const useNews = (): NewsReturnHook => {
  const newsState = useSelector(
    (state: RootState) => state.news,
    shallowEqual
  )

  return {
    ...newsState,
    setQuery: useActionCreator(setQuery), 
    setSort: useActionCreator(setSort),
    setSearchAfter : useActionCreator(setSearchAfter),
    setCategory : useActionCreator(setCategory),
    setCutOffs : useActionCreator(setCutOffs),
    setSourceCheck: useActionCreator(setSourceCheck),
    setUnCheckedSources: useActionCreator(setUnCheckedSources)
  }
}
