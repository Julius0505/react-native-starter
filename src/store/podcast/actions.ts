import { createAction } from '@reduxjs/toolkit'

const SET_QUERY = 'podcast/SET_QUERY'
const SET_SORT = 'podcast/SET_SORT'
const SET_SEARCH_AFTER = 'podcast/SET_SEARCH_AFTER'
const SET_CATEGORY = 'podcast/SET_CATEGORY'
const SET_CUTOFF = 'podcast/SET_CUTOFF'
const SET_SOURCE_CHECK = 'podcast/SET_SOURCE_CHECK'
const SET_UNCHECKED_SOURCES = 'podcast/SET_UNCHECKED_SOURCES'

export const setQuery = createAction<void>(SET_QUERY)
export const setSort = createAction<void>(SET_SORT)
export const setSearchAfter = createAction<void>(SET_SEARCH_AFTER)
export const setCategory = createAction<void>(SET_CATEGORY)
export const setCutOffs = createAction<void>(SET_CUTOFF)
export const setSourceCheck = createAction<void>(SET_SOURCE_CHECK)
export const setUnCheckedSources = createAction<void>(SET_UNCHECKED_SOURCES)

