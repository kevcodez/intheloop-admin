<template>
  <div v-if="topic" class="p-8">
    <topic-edit v-model="topic" />

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
      topic: null as any,
    }
  },
  async fetch() {
    const { body: topics } = await this.$supabase
      .from<any>('topic')
      .select('*')
      .eq('id', this.$route.params.topicId)

    this.topic = topics!![0]
  },
  methods: {
    async save() {
      const { error } = await this.$supabase
        .from('topic')
        .update(this.topic)
        .eq('id', this.$route.params.topicId)

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
