export interface TwitterSearch {
  id: number | undefined
  info: TwitterSearchInfo
  topic: string
}

export interface TwitterSearchInfo {
  popular: TwitterSearchPopularitySettings
  searches: TwitterSearchQuery[]
}

export interface TwitterSearchQuery {
  query: string
}

export interface TwitterSearchPopularitySettings {
  minLikes: number
  minReplies: number
}

export interface TwitterSearchRequest {
  search: TwitterSearchQuery
  popularitySettings: TwitterSearchPopularitySettings
}