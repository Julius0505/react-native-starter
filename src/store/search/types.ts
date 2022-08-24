export interface SearchState {
  query: string,
  lang: string
  market: string
  offset: number
  bingOffset: number
  filterSetting: string[]
}

export interface SearchReturnHook extends SearchState {
  setQuery: (query: string) => void
  setFilterSetting: (setting: string) => void
  setOffset: (offset: number) => void
  setBingOffset: (bingOffset: number) => void
}
