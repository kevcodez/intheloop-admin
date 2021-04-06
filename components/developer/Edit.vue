<template>
  <div class="grid grid-cols-3 gap-4">
    <div>
      <span>Id</span>
      <el-input v-model="developer.id" />
    </div>

    <div>
      <span>Name</span>
      <el-input v-model="developer.info.name" />
    </div>

    <div>
      <span>Website</span>
      <el-input v-model="developer.info.website" />
    </div>

    <div>
      <span>Logo</span>
      <el-input v-model="developer.info.logoUrl" />
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
      developer: this.value,
      inputVisible: false,
      inputValue: '',
    }
  },
  watch: {
    developer: function (newDeveloper) {
      this.$emit('input', newDeveloper)
    },
  },
})
</script>
