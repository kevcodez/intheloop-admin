<template>
  <div v-if="newsletter" class="p-8">
    <newsletter-edit v-model="newsletter" />

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
      newsletter: null as any,
    }
  },
  async fetch() {
    const { data: newsletters } = await this.$supabase
      .from<any, any>('newsletter')
      .select('*')
      .eq('id', this.$route.params.id)

    this.newsletter = newsletters!![0]
  },
  methods: {
    async save() {
      const { error } = await this.$supabase
        .from('newsletter')
        .update(this.newsletter)
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
