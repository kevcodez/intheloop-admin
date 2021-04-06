<template>
  <div class="p-8">
    <developer-edit v-model="developer" />

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
      developer: {
        id: '',
        info: {
          website: '',
          name: '',
          logoUrl: '',
        },
      },
    }
  },
  methods: {
    async save() {
      const { error } = await this.$supabase
        .from('developer')
        .insert(this.developer)

      if (!error) {
        this.$router.push(`/developers/${this.developer.id}`)
      } else {
        alert(error)
        console.log(error)
      }
    },
  },
})
</script>
  