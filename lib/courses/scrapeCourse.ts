import { CourseInfo } from './Course'
import ky from 'ky'

export const scrapeCourse = async (url: string): Promise<CourseInfo | null> => {
    if (url.includes("udemy")) {
        return udemyCourse(url)
    }

    return null
}

const udemyCourse = async (url: string): Promise<CourseInfo | null> => {
    const udemyId = url.match(/course\/(.+)\//)?.[1]
    console.log(url)
    console.log("udemy " + udemyId)

    if (!udemyId) {
        return null
    }

    const response = await ky.get(`http://localhost:3030/https://www.udemy.com/api-2.0/courses/${udemyId}`).json<any>()

    const course: CourseInfo = {
        authors: response.visible_instructors.map((it: any) => it.display_name),
        description: response.description,
        image: response.image_480x270,
        name: response.title,
        price: response.price_detail.price_detail,
        url: `https://udemy.com${response.url}`,
        publishedAt: response.created
    }

    return course
}

