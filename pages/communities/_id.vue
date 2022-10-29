<template>
  <div v-if="community" class="p-8">
    <community-edit v-model="community" />

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
      community: null as any,
    }
  },
  async fetch() {
    const { data: communities } = await this.$supabase
      .from<any, any>('community')
      .select('*')
      .eq('id', this.$route.params.id)

    this.community = communities!![0]
  },
  methods: {
    async save() {
      const { error } = await this.$supabase
        .from('community')
        .update(this.community)
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
