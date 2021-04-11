<template>
  <div>
    <div class="mb-5">
      <nuxt-link class="el-button" to="/books/new">New</nuxt-link>
    </div>
    <div v-for="book in books" :key="book.id">
      <nuxt-link :to="`/books/${book.id}`">{{ book.id }}</nuxt-link>
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
  