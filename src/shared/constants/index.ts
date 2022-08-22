// ? Screens
export const SCREENS = {
  SEARCH: "Search",
  SEARCH_DEFAULT: 'Search Default',
  SEARCH_RESULT: 'Search Result',
  NEWS: "News",
  PODCAST: "Podcast",
  PROFILE: "Profile",
  DETAIL: "Detail",
  MORE: "More"
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
