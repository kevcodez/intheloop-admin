<template>
  <div class="p-8">
    <book-edit v-model="book" />

    <div class="mt-5">
      <el-button type="primary" @click="save">Save</el-button>
    </div>
  </div>
</template>
  
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      book: {
        id: '',
        info: {
          url: '',
          image: '',
          title: '',
          description: '',
          publishedAt: '2020-01-01',
          authors: [],
          buyLinks: []
        },
        topics: [],
        authors: []
      },
    }
  },
  methods: {
    async save() {
      const { error } = await this.$supabase
        .from('book')
        .insert(this.book)

      if (!error) {
        this.$router.push(`/books/${this.book.id}`)
      } else {
        alert(error)
        console.log(error)
      }
    },
  },
})
</script>
  