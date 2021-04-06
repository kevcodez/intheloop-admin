<template>
  <div class="container">
    <div>
      <div v-for="developer in developers" :key="developer.id">
        <nuxt-link :to="`/developers/${developer.id}`">{{
          developer.id
        }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ app }) {
    const { body: developers } = await app.$supabase
      .from('developer')
      .select('*')

    return {
      developers,
    }
  },
})
</script>
