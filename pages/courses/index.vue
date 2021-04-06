<template>
  <div class="container">
    <div>
      <div v-for="course in courses" :key="course.id">
        <nuxt-link :to="`/courses/${course.id}`">{{ course.id }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ app }) {
    const { body: courses } = await app.$supabase.from('course').select('*')

    return {
      courses,
    }
  },
})
</script>
