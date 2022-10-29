<template>
  <div>
    <div class="mb-5">
      <nuxt-link class="el-button" to="/courses/new">New</nuxt-link>
    </div>
    <div v-for="course in courses" :key="course.id">
      <nuxt-link :to="`/courses/${course.id}`">{{ course.id }}</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ app }) {
    const { data: courses } = await app.$supabase.from('course').select('*')

    return {
      courses,
    }
  },
})
</script>
