<template>
  <div class="grid grid-cols-3 gap-4">
    <div>
      <span>Id</span>
      <el-input v-model="podcast.id" />
    </div>

    <div>
      <span>Name</span>
      <el-input v-model="podcast.info.name" />
    </div>

    <div>
      <span>Url</span>
      <el-input v-model="podcast.info.url" />
    </div>

    <div>
      <span>Description</span>
      <el-input v-model="podcast.info.description" />
    </div>

    <div>
      <a href="/topics" target="_blank" class="block">Topics</a>
      <topic-select-multiple v-model="podcast.topic_ids" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    value: {
      required: true,
      type: Object as PropType<any>,
    },
  },
  data() {
    return {
      podcast: this.value,
      inputVisible: false,
      inputValue: '',
    }
  },
  watch: {
    podcast: function (newPodcast) {
      this.$emit('input', newPodcast)
    },
  },
})
</script>
