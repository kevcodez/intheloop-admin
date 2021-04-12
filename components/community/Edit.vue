<template>
  <div class="grid grid-cols-3 gap-4">
    <div>
      <span>Id</span>
      <el-input v-model="community.id" />
    </div>

    <div>
      <span>Name</span>
      <el-input v-model="community.info.name" />
    </div>

    <div>
      <span>Url</span>
      <el-input v-model="community.info.url" />
    </div>

    <div>
      <span class="block">Type</span>
      <el-select v-model="community.info.type">
        <el-option value="Forum" label="Forum" />
        <el-option value="Discord" label="Discord" />
        <el-option value="LinkedIn" label="LinkedIn" />
        <el-option value="StackOverflow" label="StackOverflow" />
        <el-option value="Slack" label="Slack" />
        <el-option value="Reddit" label="Reddit" />
        <el-option value="Github" label="Github" />
        <el-option value="Gitter" label="Gitter" />
      </el-select>
    </div>

    <div>
      <span class="block">Official</span>
      <el-switch v-model="community.info.official" />
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
      community: this.value,
      inputVisible: false,
      inputValue: '',
    }
  },
  watch: {
    community: function (newCommunity) {
      this.$emit('input', newCommunity)
    },
  },
})
</script>
