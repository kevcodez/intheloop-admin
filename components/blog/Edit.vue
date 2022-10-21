<template>
  <div>
    <div class="flex flex-col mb-4">
      <span class="font-medium">Examples for RSS feed URLs</span>
      <span>https://hashnode.com/tag/nuxt/rss</span>
      <span>https://dev.to/feed/tag/vite</span>
      <span>https://medium.com/feed/tag/kotlin</span>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <span>Id</span>
        <el-input v-model="blog.id" />
      </div>

      <div>
        <span>Name</span>
        <el-input v-model="blog.info.name" />
      </div>

      <div>
        <span>Url</span>
        <el-input v-model="blog.info.url" />
      </div>

      <div>
        <span>Rss Feed Url</span>
        <el-input v-model="blog.info.rssFeedUrl" />
      </div>

      <div>
        <span>Official</span>
        <el-switch v-model="blog.info.official" />
      </div>

      <div>
        <span>Topics</span>
        <topic-select-multiple v-model="blog.topics" />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue, { PropType } from 'vue'
import { parseBlog } from '~/lib/blog/parseBlog'

export default Vue.extend({
  props: {
    value: {
      required: true,
      type: Object as PropType<any>,
    },
  },
  data() {
    return {
      blog: this.value,
      inputVisible: false,
      inputValue: '',
    }
  },
  watch: {
    blog: function (newBlog) {
      this.$emit('input', newBlog)
    },
    'blog.info.url': async function (url) {
      if (url && !this.blog.id) {
        const blog = await parseBlog(url)
        if (blog) {
          this.blog = blog
        }
      }
    },
  },
})
</script>
