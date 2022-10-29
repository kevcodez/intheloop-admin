<template>
  <div>
    <div class="mb-5">
      <nuxt-link class="el-button" to="/blogs/new">New</nuxt-link>
    </div>

    <div v-for="blog in blogs" :key="blog.id">
      <nuxt-link :to="`/blogs/${blog.id}`">{{ blog.id }}</nuxt-link>
    </div>
  </div>
</template>
  
  <script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ app }) {
    const { data: blogs } = await app.$supabase.from('blog').select('*')

    return {
      blogs,
    }
  },
})
</script>
  