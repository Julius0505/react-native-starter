import { createAction } from '@reduxjs/toolkit'

const SET_QUERY = 'search/SET_QUERY'
const SET_TYPE = 'search/SET_TYPE'
const SET_FILTER_SETTING = 'search/SET_FILTER_SETTING'
const SET_OFFSET = 'search/SET_OFFSET'
const SET_BING_OFFSET = 'search/SET_BING_OFFSET'
const SET_SORT = 'search/SET_SORT'

export const setQuery = createAction<void>(SET_QUERY)
export const setType = createAction<void>(SET_TYPE)
export const setFilterSetting = createAction<void>(SET_FILTER_SETTING)
export const setOffset = createAction<void>(SET_OFFSET)
export const setBingOffset = createAction<void>(SET_BING_OFFSET)
export const setSort = createAction<void>(SET_SORT)

