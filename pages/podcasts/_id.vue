<template>
  <div v-if="podcast" class="p-8">
    <podcast-edit v-model="podcast" />

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
      podcast: null as any,
    }
  },
  async fetch() {
    const { body: podcasts } = await this.$supabase
      .from<any>('podcast')
      .select('*')
      .eq('id', this.$route.params.id)

    this.podcast = podcasts!![0]
  },
  methods: {
    async save() {
      const { error } = await this.$supabase
        .from('podcast')
        .update(this.podcast)
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
