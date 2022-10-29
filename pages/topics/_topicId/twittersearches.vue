<template>
  <div class="p-4">
    <div class="grid grid-cols-4 gap-6">
      <div>
        <span class="block">Min Likes</span>
        <el-input-number v-model="search.info.popular.minLikes" />
      </div>

      <div>
        <span class="block">Min Replies</span>
        <el-input-number v-model="search.info.popular.minReplies" />
      </div>
    </div>

    <a class="mt-4" href="https://developer.twitter.com/en/docs/twitter-api/tweets/search/integrate/build-a-query" target="_blank"
      >Twitter Query Docs</a
    >

    <div class="mt-4">
      <el-button @click="addSearch">Add Search</el-button>
    </div>

    <div class="mt-4 grid grid-cols-4 gap-6">
      <div v-for="(query, i) in search.info.searches" :key="i">
        <span
          >Query
          <div class="float-right">
            <a class="cursor-pointer mr-2" @click="searchTweets(query, search.info.popular)">Test</a>
            <a class="cursor-pointer" @click="removeSearch(query)">X</a>
          </div>
        </span>
        <el-input v-model="query.query" />
      </div>
    </div>

    <div class="mt-5 grid grid-cols-4 gap-4" v-if="searchResults">
      <div v-for="tweet in searchResults" :key="tweet.id">
        {{ tweet.full_text }}
      </div>
    </div>

    <div class="mt-4">
      <el-button @click="save">Save</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TwitterSearch, TwitterSearchQuery, TwitterSearchRequest } from '~/lib/twitterSearches/TwitterSearch'

export default Vue.extend({
  name: 'TopicTwitterSearches',
  data() {
    return {
      search: {
        id: undefined,
        topic: this.$route.params.topicId,
        info: {
          popular: {
            minLikes: 30,
            minReplies: 30,
          },
          searches: [{ query: '' }],
        },
      } as TwitterSearch,
      searchResults: null as any,
    }
  },
  async fetch() {
    const { data: searches } = await this.$supabase
      .from<any, TwitterSearch>('twitter_search')
      .select('*')
      .eq('topic', this.$route.params.topicId)

    if (searches && searches.length) {
      this.search = searches[0]
    }
  },
  methods: {
    async save() {
      const { error } = await this.$supabase.from('twitter_search').upsert(this.search)
    },
    async searchTweets(search: TwitterSearchQuery) {
      try {
        const request: TwitterSearchRequest = { search, popularitySettings: this.search.info.popular }
        this.searchResults = await this.$http.$post('https://europe-west1-intheloop-dev.cloudfunctions.net/retrieveTweetsBySearch', request)
      } catch (err) {
        const errorText = await err.response.text()
        console.error(errorText)
      }
    },
    addSearch() {
      this.search.info.searches.push({ query: '' })
    },
    removeSearch(query: any) {
      this.search.info.searches.splice(this.search.info.searches.indexOf(query), 1)
    },
  },
})
</script>
