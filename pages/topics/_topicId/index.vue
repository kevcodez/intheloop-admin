<template>
  <div v-if="topic" class="p-8">
    <topic-edit v-model="topic" />

    <div class="mt-5">
      <nuxt-link :to="`/topics/${topic.id}/twittersearches`">Twitter Searches</nuxt-link>
    </div>

    <div class="mt-5">
      <el-button type="primary" @click="save">Save</el-button>
    </div>

    <div class="grid grid-cols-2 mt-6 gap-8">
      <div>
        <p class="text-lg font-medium">Release Scrape Settings</p>
        <topic-release-scrape-settings :topic-id="topic.id" />
      </div>

      <div>
        <p class="text-lg font-medium">Twitter Scrape Settings</p>
        <twitter-searches :topic-id="topic.id" />
      </div>
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
    const { data: topics } = await this.$supabase.from<any, any>('topic').select('*').eq('id', this.$route.params.topicId)

    this.topic = topics!![0]
  },
  methods: {
    async save() {
      const { error } = await this.$supabase.from('topic').update(this.topic).eq('id', this.$route.params.topicId)

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
