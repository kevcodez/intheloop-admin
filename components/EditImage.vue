<template>
  <div class="flex space-x-2">
    <a v-if="value" target="_blank" :href="internal"
      ><img class="h-6 w-6" :src="internal"
    /></a>
    <el-input v-model="internal" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      internal: this.value,
    }
  },
  watch: {
    internal(newVal) {
      this.$emit('input', newVal)
    },
  },
})
</script>
