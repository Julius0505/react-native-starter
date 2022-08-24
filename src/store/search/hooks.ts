import { shallowEqual, useSelector } from 'react-redux'

import { useActionCreator } from 'hooks'
import { SearchReturnHook } from './types'
import { RootState } from '../types'
import {
  setQuery,
  setType,
  setFilterSetting,
  setOffset,
  setBingOffset,
  setSort,
} from './actions'

export const useSearch = (): SearchReturnHook => {
  const searchState = useSelector(
    (state: RootState) => state.search,
    shallowEqual
  )

  return {
    ...searchState,
    setQuery: useActionCreator(setQuery), 
    setType: useActionCreator(setType),
    setSort: useActionCreator(setSort),
    setFilterSetting: useActionCreator(setFilterSetting),
    setOffset: useActionCreator(setOffset),
    setBingOffset: useActionCreator(setBingOffset)
  }
}
