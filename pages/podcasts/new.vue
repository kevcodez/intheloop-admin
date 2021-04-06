<template>
  <div class="p-8">
    <podcast-edit v-model="podcast" />

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
      podcast: {
        id: '',
        info: {
          url: '',
          name: '',
          description: '',
        }
      },
    }
  },
  methods: {
    async save() {
      const { error } = await this.$supabase
        .from('podcast')
        .insert(this.podcast)

      if (!error) {
        this.$router.push(`/podcasts/${this.podcast.id}`)
      } else {
        alert(error)
        console.log(error)
      }
    },
  },
})
</script>
  