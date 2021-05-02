import { Course, CourseInfo } from './Course'
import ky from 'ky'

export const scrapeCourse = async (url: string): Promise<Course | null> => {
  if (url.includes('udemy')) {
    return udemyCourse(url)
  }

  return null
}

const udemyCourse = async (url: string): Promise<Course | null> => {
  const udemyId = url.match(/course\/(.+)\//)?.[1]

  if (!udemyId) {
    return null
  }

  const response = await ky.get(`http://localhost:3030/https://www.udemy.com/api-2.0/courses/${udemyId}?fields[course]=@all`).json<any>()

  console.log(response)

  const courseInfo: CourseInfo = {
    authors: response.visible_instructors.map((it: any) => {
      return {
        name: it.display_name,
      }
    }),
    description: response.description,
    image: response.image_480x270,
    name: response.title,
    price: response.price_detail.price_string,
    url: `https://udemy.com${response.url}`,
    publishedAt: response.created,
  }

  return {
    id: udemyId,
    info: courseInfo,
  }
}
