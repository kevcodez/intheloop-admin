<template>
  <div class="p-8">
    <course-edit v-model="course" />

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
      course: {
        id: '',
        info: {
          url: '',
          name: '',
          image: '',
          price: '',
          description: '',
          authors: [],
          platform: null,
          free: false,
          interactive: false,
        },
        topics: [],
      },
    }
  },
  methods: {
    async save() {
      const { error } = await this.$supabase
        .from('course')
        .insert(this.course)

      if (!error) {
        this.$router.push(`/courses/${this.course.id}`)
      } else {
        alert(error)
        console.log(error)
      }
    },
  },
})
</script>
