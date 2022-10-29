<template>
  <div>
    <div class="mb-5">
      <nuxt-link class="el-button" to="/communities/new">New</nuxt-link>
    </div>
    <div v-for="community in communities" :key="community.id">
      <nuxt-link :to="`/communities/${community.id}`">{{ community.id }}</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ app }) {
    const { data: communities } = await app.$supabase.from('community').select('*')

    return {
      communities,
    }
  },
})
</script>
