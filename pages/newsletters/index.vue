<template>
  <div>
    <div class="mb-5">
      <nuxt-link class="el-button" to="/newsletters/new">New</nuxt-link>
    </div>
    <div v-for="newsletter in newsletters" :key="newsletter.id">
      <nuxt-link :to="`/newsletters/${newsletter.id}`">{{ newsletter.id }}</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ app }) {
    const { data: newsletters } = await app.$supabase.from('newsletter').select('*')

    return {
      newsletters,
    }
  },
})
</script>
