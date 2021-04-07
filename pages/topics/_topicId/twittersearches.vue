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

    <div class="mt-4">
      <el-button @click="addSearch">Add Search</el-button>
    </div>

    <div class="mt-4 grid grid-cols-4 gap-6">
      <div v-for="s in search.info.searches" :key="s.query">
        <span
          >Query
          <a class="float-right cursor-pointer" @click="removeSearch(s)"
            >X</a
          ></span
        >
        <el-input v-model="s.query" />
      </div>
    </div>

    <div class="mt-4">
      <el-button @click="save">Save</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TopicTwitterSearches',
  data() {
    return {
      search: null as any,
    }
  },
  async fetch() {
    const { body: searches } = await this.$supabase
      .from<any>('twitter_search')
      .select('*')
      .eq('topic', this.$route.params.topicId)

    this.search = searches!![0]
  },
  methods: {
    async save() {
      const { error } = await this.$supabase
        .from('twitter_search')
        .update(this.search)
        .eq('id', this.search.id)
    },
    addSearch() {
      this.search.info.searches.push({ query: '' })
    },
    removeSearch(s: any) {
      this.search.info.searches.splice(this.search.info.searches.indexOf(s), 1)
    },
  },
})
</script>
