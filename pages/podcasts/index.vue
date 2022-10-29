<template>
  <div>
    <div class="mb-5">
      <nuxt-link class="el-button" to="/podcasts/new">New</nuxt-link>
    </div>
    <div v-for="podcast in podcasts" :key="podcast.id">
      <nuxt-link :to="`/podcasts/${podcast.id}`">{{ podcast.id }}</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ app }) {
    const { data: podcasts } = await app.$supabase.from('podcast').select('*')

    return {
      podcasts,
    }
  },
})
</script>
