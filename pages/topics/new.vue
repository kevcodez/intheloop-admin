<template>
    <div v-if="topic" class="p-8">
      <topic-edit v-model="topic" />
  
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
        topic: {
            id: '',
            info: {
                scm: {
                    url: '',
                    type: '',
                    displayName: ''
                },
                live: false,
                logo: '',
                name: '',
                tags: [],
                color: '',
                badges: [],
                social: [],
                license: {
                    url: '',
                    name: '',
                },
                website: '',
                changelog: '',
                playground: '',
                documentation: '',
                issueTracker: '',
                description:'',
                shortDescription: '',
                fetchReleases: {
                    via: ''
                }
            },
            developers: [],
            books: [],
            blogs: [],
            newsletters: [],
            podcasts: [],
            communities: [],
            courses: [],
        },
      }
    },
    methods: {
      async save() {
        const { error } = await this.$supabase
          .from('topic')
          .insert(this.topic)

          if (!error) {
              this.$router.push(`/topics/${this.topic.id}`)
          } else {
              alert(error)
              console.log(error)
          }
      },
    },
  })
  </script>
  
  <style lang="scss">
  textarea {
    @apply h-28;
  }
  </style>
  