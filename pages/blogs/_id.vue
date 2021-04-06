<template>
  <div v-if="blog" class="p-8">
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
      blog: null as any,
    }
  },
  async fetch() {
    const { body: blogs } = await this.$supabase
      .from<any>('blog')
      .select('*')
      .eq('id', this.$route.params.id)

    this.blog = blogs!![0]
  },
  methods: {
    async save() {
      const { error } = await this.$supabase
        .from('blog')
        .update(this.blog)
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
