import { IEpisode, ISubscription, SelectItem } from "@services/models"
import { PODCAST_SEARCH_SORT } from "enums/constants"

export enum EPodcastCategory {
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
  id: EPodcastCategory
  title: string
}

export type PodcastSource = {
  count: number
  location: string
  name: string
  username: string
}

export const PodcastCategories = {
  [EPodcastCategory.ALL]: 'All podcast',
  [EPodcastCategory.POLITICS]: 'Politics' ,
  [EPodcastCategory.TECH]: 'Technology' ,
  [EPodcastCategory.WORLD]: 'World' ,
  [EPodcastCategory.ENTERTAINMENT]: 'Entertainment' ,
  [EPodcastCategory.BUSINESS]: 'Business' ,
  [EPodcastCategory.SCIENCE]: 'Science' ,
  [EPodcastCategory.HEALTH]: 'Health' ,
  [EPodcastCategory.SPORT]: 'Sports'
}

export const PODCAST_SORT: SelectItem<PODCAST_SEARCH_SORT>[] = [
  { text: "Relevance", value: PODCAST_SEARCH_SORT.RELEVANT },
  { text: "Popularity", value: PODCAST_SEARCH_SORT.POPULARITY },
];

export interface ICutOffs {
  [EPodcastCategory.POLITICS]: number
  [EPodcastCategory.TECH]: number
  [EPodcastCategory.WORLD]: number
  [EPodcastCategory.ENTERTAINMENT]: number
  [EPodcastCategory.BUSINESS]: number
  [EPodcastCategory.SCIENCE]: number
  [EPodcastCategory.HEALTH]: number
  [EPodcastCategory.SPORT]: number
}


export interface PodcastState {
  loading: boolean
  error: string | boolean
  success: string | boolean
  query: string,
  sort: SelectItem<PODCAST_SEARCH_SORT>,
  subscriptions: ISubscription[] 
  unChecks: string[]
  playing: boolean
  episode: IEpisode | null
}

export interface PodcastReturnHook extends PodcastState {
  setQuery: (query: string) => void
  setSort: (sort: SelectItem<PODCAST_SEARCH_SORT> ) => void
  setSubscriptions: (subscriptions: ISubscription[]) => void
  subscribe: (sub: ISubscription) => void
  setChecks: (checks: string) => void
  setEpisode: (episode: IEpisode) => void
  setPlaying: (playing: boolean) => void
}
