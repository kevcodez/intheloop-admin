<template>
  <div class="grid grid-cols-3 gap-4">
    <div>
      <span>Id</span>
      <el-input v-model="newsletter.id" />
    </div>

    <div>
      <span>Name</span>
      <el-input v-model="newsletter.info.name" />
    </div>

    <div>
      <span>Url</span>
      <el-input v-model="newsletter.info.url" />
    </div>

    <div>
      <span>Description</span>
      <el-input v-model="newsletter.info.description" />
    </div>

    <div>
      <a href="/topics" target="_blank" class="block">Topics</a>
      <topic-select-multiple v-model="newsletter.topics_ids" />
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
      newsletter: this.value,
      inputVisible: false,
      inputValue: '',
    }
  },
  watch: {
    newsletter: function (newsletter) {
      this.$emit('input', newsletter)
    },
  },
})
</script>
