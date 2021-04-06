<template>
  <div class="container">
    <div>
      <div v-for="podcast in podcasts" :key="podcast.id">
        <nuxt-link :to="`/podcasts/${podcast.id}`">{{ podcast.id }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ app }) {
    const { body: podcasts } = await app.$supabase.from('podcast').select('*')

    return {
      podcasts,
    }
  },
})
</script>
