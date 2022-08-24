import { INews, SelectItem } from "@services/models"
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
export const defaultCutOffs = {
  [ENewsCategory.POLITICS]: 85,
  [ENewsCategory.TECH]: 85,
  [ENewsCategory.WORLD]: 85,
  [ENewsCategory.ENTERTAINMENT]: 100,
  [ENewsCategory.BUSINESS]: 85,
  [ENewsCategory.SCIENCE]: 85,
  [ENewsCategory.HEALTH]: 85,
  [ENewsCategory.SPORT]: 100
}

export const NEWS_SORT: SelectItem<NEWS_SEARCH_SORT>[] = [
  { text: "Most relevant first", value: NEWS_SEARCH_SORT.RELEVANT },
  { text: "Most recent first", value: NEWS_SEARCH_SORT.RECENT },
  { text: "Most informative first", value: NEWS_SEARCH_SORT.INFORMATIVE },
];


export interface NewsState {
  query: string,
  sort: SelectItem<NEWS_SEARCH_SORT>,
  searchAfter: string,
  category: ENewsCategory,
  cutoffs: ICutOffs,
  unCheckedSources: string[],
  news: INews | null,
  allSources: NewsSource[]
}

export interface NewsReturnHook extends NewsState {
  setQuery: (query: string) => void
  setSort: (sort: SelectItem<NEWS_SEARCH_SORT> ) => void
  setSearchAfter: (searchAfter: string) => void
  setCategory: (category: ENewsCategory) => void
  setCutOffs: (cutoffs: ICutOffs) => void
  setSourceCheck: (source: string) => void
  setUnCheckedSources: (sourceList: string[]) => void
  setNews: (news: INews) => void
  setAllSources: (allSources: NewsSource[]) => void
}
