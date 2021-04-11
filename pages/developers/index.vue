<template>
  <div>
    <div class="mb-5">
      <nuxt-link class="el-button" to="/developers/new">New</nuxt-link>
    </div>

    <div v-for="developer in developers" :key="developer.id">
      <nuxt-link :to="`/developers/${developer.id}`">{{ developer.id }}</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ app }) {
    const { body: developers } = await app.$supabase.from('developer').select('*')

    return {
      developers,
    }
  },
})
</script>
