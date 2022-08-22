import { SEARCH_FIELD_TYPE } from "enums/constants"


export interface SearchState {
  query: string,
  type: SEARCH_FIELD_TYPE
  lang: string
  market: string
  offset: number
  bingOffset: number
  filterSetting: string[]
}

export interface SearchReturnHook extends SearchState {
  setQuery: (query: string) => void
  setType: (type: SEARCH_FIELD_TYPE) => void
  setFilterSetting: (setting: string) => void
  setOffset: (offset: number) => void
  setBingOffset: (bingOffset: number) => void
}
