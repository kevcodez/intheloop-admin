<template>
  <div class="container">
    <div>
      <h1 class="title">intheloop</h1>

      <div v-for="topic in topics" :key="topic.id">
        <nuxt-link :to="`/topics/${topic.id}`">{{ topic.id }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ app }) {
    const { body: topics } = await app.$supabase.from('topic').select('*')

    return {
      topics,
    }
  },
})
</script>
