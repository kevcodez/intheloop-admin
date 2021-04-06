<template>
  <div class="container">
    <div>
      <div v-for="community in communities" :key="community.id">
        <nuxt-link :to="`/communities/${community.id}`">{{
          community.id
        }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ app }) {
    const { body: communities } = await app.$supabase
      .from('community')
      .select('*')

    return {
      communities,
    }
  },
})
</script>
