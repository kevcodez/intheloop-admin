import { Blog } from "./Blog";
import ky from 'ky'

export async function parseBlog(url: string): Blog | null {
    try {
        const constructedUrl = new URL(url)

        const response = await ky.get('http://localhost:3030/' + url).text()

        let rssFeedUrl = null
        const parser = new DOMParser()
        const htmlDoc = parser.parseFromString(response, 'text/html')
        rssFeedUrl = htmlDoc.querySelector("link[type='application/rss+xml']")?.getAttribute('href') || null

        if (rssFeedUrl && rssFeedUrl.startsWith("/")) {
            // attach domain if path is relative
            rssFeedUrl = constructedUrl.protocol + "//" + constructedUrl.host + rssFeedUrl
        }

        let type = null
        let name = null
        if (url.includes("medium")) {
            type = "medium"
            name = "Medium"
        } else if (url.includes("hashnode")) {
            type = "hashnode"
            name = "Hashnode"
        } else if (url.includes("dev.to")) {
            type = "dev-to"
            name = "dev.to"
        } else {
            const domain = constructedUrl.host.split('.')[0]
            name = domain
            type = domain
        }

        const blog: Blog = {
            id: type ? `${type}-` : '',
            info: {
                name: name || '',
                official: false,
                url,
                rssFeedUrl
            },
            topics: []
        }

        return blog
    } catch (err) {
        console.log(err)
    }

    return null
}