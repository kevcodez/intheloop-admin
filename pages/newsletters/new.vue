<template>
  <div class="p-8">
    <newsletter-edit v-model="newsletter" />

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
      newsletter: {
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
        .from('newsletter')
        .insert(this.newsletter)

      if (!error) {
        this.$router.push(`/newsletters/${this.newsletter.id}`)
      } else {
        alert(error)
        console.log(error)
      }
    },
  },
})
</script>
  