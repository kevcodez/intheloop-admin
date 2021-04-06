<template>
  <div v-if="book" class="p-8">
    <book-edit v-model="book" />

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
      book: null as any,
    }
  },
  async fetch() {
    // @ts-ignore
    const { body: books } = await this.$supabase
      .from<any>('book')
      .select('*')
      .eq('id', this.$route.params.id)

    this.book = books!![0]
  },
  methods: {
    async save() {
      const { error } = await this.$supabase
        .from('book')
        .update(this.book)
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
