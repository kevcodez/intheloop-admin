<template>
  <div v-if="course" class="p-8">
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
      course: null as any,
    }
  },
  async fetch() {
    const { body: courses } = await this.$supabase
      .from<any>('course')
      .select('*')
      .eq('id', this.$route.params.id)

    this.course = courses!![0]
  },
  methods: {
    async save() {
      const { error } = await this.$supabase
        .from('course')
        .update(this.course)
        .eq('id', this.$route.params.id)

      console.log(error)
    },
  },
})
</script>

<style lang="scss">
textarea {
  @apply h-28;
}
</style>
