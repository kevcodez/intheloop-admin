<template>
  <div class="p-8">
    <blog-edit v-model="blog" />

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
      blog: {
        id: '',
        info: {
          url: '',
          rssFeedUrl: '',
          name: '',
          official: false,
        },
        topics: []
      },
    }
  },
  methods: {
    async save() {
      const { error } = await this.$supabase
        .from('blog')
        .insert(this.blog)

      if (!error) {
        this.$router.push(`/blogs/${this.blog.id}`)
      } else {
        alert(error)
        console.log(error)
      }
    },
  },
})
</script>
  