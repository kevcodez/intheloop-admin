<template>
    <div class="container">
      <div>
        <div v-for="blog in blogs" :key="blog.id">
          <nuxt-link :to="`/blogs/${blog.id}`">{{ blog.id }}</nuxt-link>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue'
  
  export default Vue.extend({
    async asyncData({ app }) {
      const { body: blogs } = await app.$supabase.from('blog').select('*')
  
      return {
        blogs,
      }
    },
  })
  </script>
  