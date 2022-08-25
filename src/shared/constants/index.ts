// ? Screens
export const SCREENS = {
  HOME: 'Home',
  SEARCH: "Search",
  SEARCH_DEFAULT: 'SearchDefault',
  SEARCH_RESULT: 'SearchResult',
  NEWS: "News",
  NEWS_DEFAULT: 'NewsDefault',
  NEWS_DETAIL: 'NewsDetail',
  NEWS_FILTER: 'NewsFilter',
  PODCAST: "Podcast",
  PODCAST_DEFAULT: 'PodcastDefault',
  PODCAST_FILTER: 'PodcastFilter',
  PODCAST_DETAIL: 'PodcastDetail',
  PODCAST_NEW: 'PodcastNew',
  PROFILE: "Profile",
  WIKI: "Wikipedia",
  SCIENCE: "Scienific Studies",
  COURCES: "Courses",
  BOOKS: "Books",
  MORE: "More",
  OPINION: "Opinion"
};

export interface SettingType {
  id: string;
  title: string;
}

export const SearchFilterSettings: SettingType[] = [
  { id: 'not_informative', title: 'Not Informative' },
  { id: 'hateful', title: 'Hateful' },
  { id: 'offensive', title: 'Offensive' },
  { id: 'highly_subjective', title: 'Highly Subjective' },
  { id: 'short_lived', title: 'Short Lived' },
  { id: 'lacking_references', title: 'Lacking References' },
  { id: 'containing_affiliate_links', title: 'Containing Affiliate Links' },
  { id: 'containing_many_aids', title: 'Containing Many Aids' }
]
