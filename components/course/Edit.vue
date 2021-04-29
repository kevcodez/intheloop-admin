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
        <span>Description</span>
        <el-input v-model="course.info.description" type="textarea" />
      </div>

      <div>
        <span>Url</span>
        <el-input v-model="course.info.url" />
      </div>

      <div>
        <span>Image</span>
        <edit-image v-model="course.info.image" />
      </div>

      <div>
        <span>Price</span>
        <el-input v-model="course.info.price" />
      </div>
    </div>
    <div class="mt-4">
      <el-button @click="addAuthor">Add author</el-button>
    </div>
    <div class="grid grid-cols-2 gap-6 mt-4">
      <div class="shadow p-4" v-for="(author, i) in course.info.authors" :key="i">
        <a @click="removeAuthor(author)" class="float-right">Remove</a>
        <span>Name</span>
        <el-input v-model="author.name" />
      </div>
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
        console.log(url)
      }
    },
  },
})
</script>
