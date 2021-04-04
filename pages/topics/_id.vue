<template>
  <div>
    {{ topic.id }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ app, route }) {
    const { body: topics } = await app.$supabase
      .from('topic')
      .select('*')
      .eq('id', route.params.id)

    return {
      topic: topics[0],
    }
  },
})
</script>
