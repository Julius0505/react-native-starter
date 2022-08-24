import { SelectItem } from "@services/models"
import { NEWS_SEARCH_SORT, SEARCH_FIELD_TYPE } from "enums/constants"


export interface SearchState {
  query: string,
  sort: SelectItem<NEWS_SEARCH_SORT>,
  type: SEARCH_FIELD_TYPE
  lang: string
  market: string
  offset: number
  bingOffset: number
  filterSetting: string[]
}

export interface SearchReturnHook extends SearchState {
  setQuery: (query: string) => void
  setSort: (sort: SelectItem<NEWS_SEARCH_SORT> ) => void
  setType: (type: SEARCH_FIELD_TYPE) => void
  setFilterSetting: (setting: string) => void
  setOffset: (offset: number) => void
  setBingOffset: (bingOffset: number) => void
}
