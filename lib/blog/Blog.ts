export interface Blog {
    id: string
    info: BlogInfo
    topics: string[]
}

export interface BlogInfo {
    name: string
    url: string
    official: boolean
    rssFeedUrl: string | null
}

export interface BlogPost {
    title: string
    link: string
    image: string
    publishedAt: string
}