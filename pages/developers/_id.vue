<template>
  <div v-if="developer" class="p-8">
    <developer-edit v-model="developer" />

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
      developer: null as any,
    }
  },
  async fetch() {
    // @ts-ignore
    const { body: developers } = await this.$supabase
      .from<any>('developer')
      .select('*')
      .eq('id', this.$route.params.id)

    this.developer = developers!![0]
  },
  methods: {
    async save() {
      const { error } = await this.$supabase
        .from('developer')
        .update(this.developer)
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
