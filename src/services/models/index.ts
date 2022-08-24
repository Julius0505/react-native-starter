export interface SelectItem<T> {
  text: string,
  value: T
}

export interface INews {
  id: string;
  headline: string;
  source_name: string;
  created_at: string;
  source_url: string;
  summary: string;
}

export interface ISubscription {
  id: string
  title: string
}

export interface IPodcast {
  id: string;
  author: {
    name: string;
  }
  title: string;
  latestEpisodeDate: string;
  description: string;
  imageUrl: string;
}

export interface IEpisode {
  id: string
  title: string
  airDate: Date
  audioUrl: string
  description: string
  fileSize: number
  htmlDescription: string
  imageUrl: string
  length: number
  url: string
  podcast_id?: string
  podcast_title?: string
}

export interface ISearchResult {
  url: string;
  name: string;
  displayUrl: string;
  snippet: string;
  groupParent: string[];
  isBing: boolean;
  description: string
}