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

export interface ISearchResult {
  url: string;
  name: string;
  displayUrl: string;
  snippet: string;
  groupParent: string[];
  isBing: boolean;
  description: string
}