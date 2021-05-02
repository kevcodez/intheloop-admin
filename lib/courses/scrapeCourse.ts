import { Course, CourseInfo, CoursePlatform } from './Course'
import ky from 'ky'

export const scrapeCourse = async (url: string): Promise<Course | null> => {
  if (url.includes('udemy')) {
    return udemyCourse(url)
  } else if (url.includes('egghead')) {
    return eggheadCourse(url)
  }

  return null
}

const udemyCourse = async (url: string): Promise<Course | null> => {
  const udemyId = url.match(/course\/(.+)\//)?.[1]

  if (!udemyId) {
    return null
  }

  const response = await ky.get(`http://localhost:3030/https://www.udemy.com/api-2.0/courses/${udemyId}?fields[course]=@all`).json<any>()

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
    platform: CoursePlatform.UDEMY,
    interactive: false,
    free: !response.is_paid
  }

  return {
    id: 'udemy-' + udemyId,
    info: courseInfo,
  }
}

const eggheadCourse = async (url: string): Promise<Course | null> => {
  const response = await ky.get(`http://localhost:3030/${url}`).text()

  const parser = new DOMParser()
  const htmlDoc = parser.parseFromString(response, 'text/html')

  const name = htmlDoc.querySelector('title')!!.text
  const description = htmlDoc.querySelector('div.prose')!!.innerHTML
  const author = htmlDoc.querySelector('span.font-semibold.text-base')!!.textContent!!
  const image = htmlDoc.querySelector('a[href^="/lessons/"] noscript > img')?.getAttribute('src')!!
  const createdAt = response.match(/"created_at":"(.*?)"/)?.[1]

  const eggheadId = url.match(/courses\/(.+)/)?.[1]

  return {
    id: 'egghead-' + eggheadId!!,
    info: {
      description,
      name,
      url,
      authors: [{ name: author }],
      price: '$25', // some are free, some require membership which starts at $25/month
      image,
      publishedAt: createdAt,
      platform: CoursePlatform.EGGHEAD,
      interactive: false,
      free: false,
    },
  }
}
