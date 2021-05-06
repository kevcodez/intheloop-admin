<template>
  <div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <span>Id</span>
        <el-input v-model="book.id" />
      </div>

      <div>
        <span>Title</span>
        <el-input v-model="book.info.title" />
      </div>

      <div>
        <span>Description</span>
        <el-input v-model="book.info.description" type="textarea" />
      </div>

      <div>
        <span>Url</span>
        <el-input v-model="book.info.url" />
      </div>

      <div>
        <span>Image</span>
        <edit-image v-model="book.info.image" />
      </div>

      <div>
        <span class="block">Published At</span>
        <el-date-picker v-model="book.info.publishedAt" />
      </div>

    </div>

    <div class="mt-4">
      <el-button @click="addAuthor">Add author</el-button>
    </div>
    <div class="grid grid-cols-2 gap-6 mt-4">
      <div class="shadow p-4" v-for="(author, i) in book.info.authors" :key="i">
        <a @click="removeAuthor(author)" class="float-right">Remove</a>
        <span>Name</span>
        <el-input v-model="author.name" />
      </div>
    </div>

    <div class="mt-4">
      <el-button @click="addBuyLink">Add Buylink</el-button>
    </div>
    <div class="grid grid-cols-2 gap-6 mt-4">
      <div class="shadow p-4" v-for="(buyLink, i) in book.info.buyLinks" :key="i">
        <a @click="removeBuyLink(buyLink)" class="float-right">Remove</a>
        <span>URL</span>
        <el-input v-model="buyLink.url" />
      </div>
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
      book: this.value,
      inputVisible: false,
      inputValue: '',
    }
  },
  methods: {
    addAuthor() {
      this.book.info.authors.push({ name: '' })
    },
    removeAuthor(author: any) {
      this.book.info.authors.splice(this.book.info.authors.indexOf(author), 1)
    },

    addBuyLink() {
      this.book.info.buyLinks.push({ url: '' })
    },
    removeBuyLink(buyLink: any) {
      this.book.info.buyLinks.splice(this.book.info.buyLinks.indexOf(buyLink), 1)
    },
  },
  watch: {
    book: function (newbook) {
      this.$emit('input', newbook)
    },
  },
})
</script>
