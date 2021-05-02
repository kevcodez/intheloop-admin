<template>
  <div>
    <div class="grid grid-cols-3 gap-4">
      <div>
        <span>Id</span>
        <el-input v-model="course.id" />
      </div>

      <div>
        <span>Name</span>
        <el-input v-model="course.info.name" />
      </div>

      <div>
        <span>Url</span>
        <el-input v-model="course.info.url" />
      </div>

      <div>
        <span class="block">Platform</span>
        <el-select v-model="course.info.platform" class="w-full">
          <el-option value="UDEMY" label="Udemy" />
          <el-option value="EGGHEAD" label="Egghead" />
        </el-select>
      </div>

      <div>
        <span>Image</span>
        <edit-image v-model="course.info.image" />
      </div>

      <div>
        <span class="block">Published At</span>
        <el-date-picker v-model="course.info.publishedAt" class="w-full" />
      </div>

      <div>
        <span>Price</span>
        <el-input v-model="course.info.price" />
      </div>

      <div>
        <span class="block">Free</span>
        <el-switch v-model="course.info.free" />
      </div>

      <div>
        <span class="block">Interactive</span>
        <el-switch v-model="course.info.interactive" />
      </div>
    </div>
    <div class="mt-4">
      <el-button @click="addAuthor">Add author</el-button>
    </div>
    <div class="grid grid-cols-2 gap-6 mt-4">
      <div class="p-4 shadow" v-for="(author, i) in course.info.authors" :key="i">
        <a @click="removeAuthor(author)" class="float-right">Remove</a>
        <span>Name</span>
        <el-input v-model="author.name" />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6 mt-4">
      <div>
        <span>Description</span>
        <el-input v-model="course.info.description" type="textarea" />
      </div>
      <div v-if="course.info.description" style="max-height: 300px" class="overflow-scroll prose" v-html="course.info.description"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { CourseInfo } from '~/lib/courses/Course'
import { scrapeCourse } from '~/lib/courses/scrapeCourse'

export default Vue.extend({
  props: {
    value: {
      required: true,
      type: Object as PropType<any>,
    },
  },
  data() {
    return {
      course: this.value,
      inputVisible: false,
      inputValue: '',
    }
  },
  methods: {
    addAuthor() {
      this.course.info.authors.push({ name: '' })
    },
    removeAuthor(author: any) {
      this.course.info.authors.splice(this.course.info.authors.indexOf(author), 1)
    },
  },
  watch: {
    course: function (newcourse: CourseInfo) {
      this.$emit('input', newcourse)
    },
    'course.info.url': async function (url: string) {
      if (!this.course.info.id && url) {
        const scraped = await scrapeCourse(url)
        if (scraped) {
          this.course = scraped
        }
      }
    },
  },
})
</script>

<style lang="scss">
textarea {
  min-height: 250px !important;
}
</style>
