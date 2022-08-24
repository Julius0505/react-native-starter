import { SelectItem } from "@services/models"
import { NEWS_SEARCH_SORT } from "enums/constants"

export enum ENewsCategory {
  ALL = 'all',
  POLITICS = 'politics',
  TECH = 'tech',
  WORLD = 'world',
  ENTERTAINMENT = 'entertainment',
  BUSINESS = 'business',
  SCIENCE = 'science',
  HEALTH = 'health',
  SPORT = 'sport'
}

export type SettingType = {
  id: ENewsCategory
  title: string
}

export type NewsSource = {
  count: number
  location: string
  name: string
  username: string
}

export const NewsCategories = {
  [ENewsCategory.ALL]: 'All news',
  [ENewsCategory.POLITICS]: 'Politics' ,
  [ENewsCategory.TECH]: 'Technology' ,
  [ENewsCategory.WORLD]: 'World' ,
  [ENewsCategory.ENTERTAINMENT]: 'Entertainment' ,
  [ENewsCategory.BUSINESS]: 'Business' ,
  [ENewsCategory.SCIENCE]: 'Science' ,
  [ENewsCategory.HEALTH]: 'Health' ,
  [ENewsCategory.SPORT]: 'Sports'
}

export interface ICutOffs {
  [ENewsCategory.POLITICS]: number
  [ENewsCategory.TECH]: number
  [ENewsCategory.WORLD]: number
  [ENewsCategory.ENTERTAINMENT]: number
  [ENewsCategory.BUSINESS]: number
  [ENewsCategory.SCIENCE]: number
  [ENewsCategory.HEALTH]: number
  [ENewsCategory.SPORT]: number
}

export interface NewsState {
  query: string,
  sort: SelectItem<NEWS_SEARCH_SORT>,
  searchAfter: string,
  category: ENewsCategory,
  cutoffs: ICutOffs,
  unCheckedSources: string[]
}

export interface NewsReturnHook extends NewsState {
  setQuery: (query: string) => void
  setSort: (sort: SelectItem<NEWS_SEARCH_SORT> ) => void
  setSearchAfter: (searchAfter: string) => void
  setCategory: (category: ENewsCategory) => void
  setCutOffs: (cutoffs: ICutOffs) => void
  setSourceCheck: (source: string) => void
  setUnCheckedSources: (sourceList: string[]) => void
}
