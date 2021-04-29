import { Author } from "./Author"

export interface CourseInfo {
    name: string
    publishedAt?: string
    price: string
    url: string
    image: string
    description: string
    authors: Author[]
}