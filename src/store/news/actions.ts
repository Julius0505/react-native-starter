import { createAction } from '@reduxjs/toolkit'

const SET_QUERY = 'news/SET_QUERY'
const SET_SORT = 'news/SET_SORT'
const SET_SEARCH_AFTER = 'news/SET_SEARCH_AFTER'
const SET_CATEGORY = 'news/SET_CATEGORY'
const SET_CUTOFF = 'news/SET_CUTOFF'
const SET_SOURCE_CHECK = 'news/SET_SOURCE_CHECK'
const SET_UNCHECKED_SOURCES = 'news/SET_UNCHECKED_SOURCES'
const SET_NEWS = 'news/SET_NEWS'
const SET_ALLSOURCES= 'news/SET_ALLSOURCES'

export const setQuery = createAction<void>(SET_QUERY)
export const setSort = createAction<void>(SET_SORT)
export const setSearchAfter = createAction<void>(SET_SEARCH_AFTER)
export const setCategory = createAction<void>(SET_CATEGORY)
export const setCutOffs = createAction<void>(SET_CUTOFF)
export const setSourceCheck = createAction<void>(SET_SOURCE_CHECK)
export const setUnCheckedSources = createAction<void>(SET_UNCHECKED_SOURCES)
export const setAllSources = createAction<void>(SET_ALLSOURCES)
export const setNews = createAction<void>(SET_NEWS)
