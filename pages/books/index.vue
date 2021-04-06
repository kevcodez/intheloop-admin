<template>
    <div class="container">
      <div>
        <div v-for="book in books" :key="book.id">
          <nuxt-link :to="`/books/${book.id}`">{{ book.id }}</nuxt-link>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue'
  
  export default Vue.extend({
    async asyncData({ app }) {
      const { body: books } = await app.$supabase.from('book').select('*')
  
      return {
        books,
      }
    },
  })
  </script>
  