<template>
  <div v-if="topic" class="p-8">
    <div class="grid grid-cols-4 gap-6">
      <div>
        <span>Name</span>
        <el-input v-model="topic.info.name" />
      </div>

      <div>
        <span class="block">Live</span>
        <el-switch v-model="topic.info.live" />
      </div>

      <div>
        <span>Logo</span>
        <el-input v-model="topic.info.logo" />
      </div>

      <div>
        <span class="block">Color</span>
        <el-color-picker v-model="topic.info.color" />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6 mt-4">
      <div>
        <span>Description</span>
        <el-input v-model="topic.info.description" type="textarea" />
      </div>

      <div>
        <span>Short Description</span>
        <el-input v-model="topic.info.shortDescription" type="textarea" />
      </div>
    </div>

    <div class="mt-4">
      <el-tag v-for="tag in topic.info.tags" :key="tag" closable :type="tag">
        {{ tag }}
      </el-tag>
    </div>

    <div class="mt-4 grid grid-cols-4 gap-6">
      <div>
        <span>Website</span>
        <el-input v-model="topic.info.website" />
      </div>

      <div>
        <span>Playground</span>
        <el-input v-model="topic.info.playground" />
      </div>

      <div>
        <span>Issue Tracker</span>
        <el-input v-model="topic.info.issueTracker" />
      </div>

      <div>
        <span>Documentation</span>
        <el-input v-model="topic.info.documentation" />
      </div>
    </div>

    <div class="grid grid-cols-4 gap-6 mt-4">
      <div>
        <span class="block">SCM Type</span>
        <el-select
          class="w-full"
          v-model="topic.info.scm.type"
          placeholder="Select"
        >
          <el-option label="Github" value="Github" />
        </el-select>
      </div>

      <div>
        <span>SCM Url</span>
        <el-input v-model="topic.info.scm.url" />
      </div>

      <div>
        <span>SCM DisplayName</span>
        <el-input v-model="topic.info.scm.displayName" />
      </div>
    </div>

    <div class="grid grid-cols-4 mt-4 gap-6">
      <div>
        <span>License URL</span>
        <el-input v-model="topic.info.license.url" />
      </div>

      <div>
        <span>License Name</span>

        <el-input v-model="topic.info.license.name" />
      </div>
    </div>

    <div class="mt-4 grid grid-cols-4 gap-6">
      <div
        v-for="badge in topic.info.badges"
        :key="badge.url"
        class="space-y-2 shadow p-4"
      >
        <div>
          <span class="block">Badge Type</span>
          <el-select class="w-full" v-model="badge.type">
            <el-option label="MavenCentral" value="MavenCentral" />
            <el-option label="NPM" value="NPM" />
          </el-select>
        </div>

        <div>
          <span>Badge URL</span>
          <el-input v-model="badge.url" />
        </div>
      </div>
    </div>

    <div class="mt-4 grid grid-cols-4 gap-6">
      <div
        class="space-y-2 shadow p-4"
        v-for="social in topic.info.social"
        :key="social.url"
      >
        <div>
          <span class="block">Social Type</span>
          <el-select class="w-full" v-model="social.type">
            <el-option label="Twitter" value="Twitter" />
            <el-option label="Youtube" value="Youtube" />
          </el-select>
        </div>

        <div>
          <span>URL</span>
          <el-input v-model="social.url" />
        </div>

        <div>
          <span>Label</span>
          <el-input v-model="social.label" />
        </div>
      </div>
    </div>

    <div class="mt-6">
        <div>
          <span class="block">Via</span>
          <el-select class="w-full" v-model="topic.info.fetchReleases.via">
            <el-option label="Github" value="Github" />
            <el-option label="NPM" value="npm" />
          </el-select>
        </div>

        <div v-if="topic.info.fetchReleases.via === 'Github'">
          <span>Repo</span>
          <el-input v-model="topic.info.fetchReleases.meta.repo" />

          <span>Owner</span>
          <el-input v-model="topic.info.fetchReleases.meta.owner" />
        </div>

        <div v-else-if="topic.info.fetchReleases.via === 'npm'">
          <span>Package</span>
          <el-input v-model="topic.info.fetchReleases.meta.package" />
        </div>
      </div>

    <div class="grid grid-cols-4 gap-6 mt-4">
      <div>
        <span class="block">Blogs</span>
        <select-blogs v-model="topic.blogs"  />
      </div>

      <div>
        <span class="block">Books</span>
        <select-books v-model="topic.books"  />
      </div>

      <div>
        <span class="block">Communities</span>
        <select-communities v-model="topic.communities"  />
      </div>

      <div>
        <span class="block">Courses</span>
        <select-courses v-model="topic.courses"  />
      </div>

      <div>
        <span class="block">Newsletters</span>
        <select-newsletters v-model="topic.newsletters"  />
      </div>

      <div>
        <span class="block">Developers</span>
        <select-developers v-model="topic.developers"  />
      </div>

      <div>
        <span class="block">Podcasts</span>
        <select-podcasts v-model="topic.podcasts"  />
      </div>
    </div>

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
      topic: null as any,
    }
  },
  async fetch() {
    // @ts-ignore
    const { body: topics } = await this.$supabase
      .from<any>('topic')
      .select('*')
      .eq('id', this.$route.params.id)

    this.topic = topics!![0]
  },
  methods: {
    async save() {
      const { error } = await this.$supabase
        .from('topic')
        .update(this.topic)
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
