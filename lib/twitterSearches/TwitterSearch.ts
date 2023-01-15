export interface TwitterSearch {
  popular: TwitterSearchPopularitySettings
  searches: TwitterSearchQuery[]
  topic_id: string
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