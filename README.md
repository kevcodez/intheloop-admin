# Intheloop

[Intheloop](https://intheloop.dev) helps stay up-to-date with the technologies you're interested in.

## Admin Interface

This repository contains an admin interface (based on Nuxt SPA) to speed up the process of editing and adding topics.
If users are ever allowed to add/suggest books/courses/blogs, the automatic parsing should be moved outside this repository.
For now, parsing courses/books/blogs resides in this repository.

## Roadmap

The rough roadmap can be found [here](https://intheloop.dev/roadmap) and is powered by [productstash.io](productstash.io).

## Repositories

- [Web](https://github.com/kevcodez/intheloop) - Nuxt.js web app that powers [Intheloop](https://intheloop.dev)
- [Worker](https://github.com/kevcodez/intheloop-worker) - Nest.js+BullMQ worker for scraping data
- [Functions](https://github.com/kevcodez/intheloop-functions) - Firebase functions for API endpoints/scheduled functions
- [Admin](https://github.com/kevcodez/intheloop-admin) - Nuxt.js admin interface for adding/editing topics
