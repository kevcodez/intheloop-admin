<template>
  <div class="container">
    <div>
      <div v-for="newsletter in newsletters" :key="newsletter.id">
        <nuxt-link :to="`/newsletters/${newsletter.id}`">{{ newsletter.id }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ app }) {
    const { body: newsletters } = await app.$supabase.from('newsletter').select('*')

    return {
      newsletters,
    }
  },
})
</script>
