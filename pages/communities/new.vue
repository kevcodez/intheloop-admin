<template>
  <div class="p-8">
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
      community: {
        id: '',
        info: {
          name: '',
          url: '',
          type: '',
          official: false
        },
      },
    }
  },
  methods: {
    async save() {
      const { error } = await this.$supabase
        .from('community')
        .insert(this.community)

      if (!error) {
        this.$router.push(`/communities/${this.community.id}`)
      } else {
        alert(error)
        console.log(error)
      }
    },
  },
})
</script>
  