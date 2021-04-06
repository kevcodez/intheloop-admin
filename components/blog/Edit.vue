<template>
    <div class="grid grid-cols-2 gap-4">
        <div>
            <span>Id</span>
            <el-input v-model="blog.id" />
        </div>

        <div>
            <span>Name</span>
            <el-input v-model="blog.info.name" />
        </div>

        <div>
            <span>Url</span>
            <el-input v-model="blog.info.url" />
        </div>

        <div>
            <span>Rss Feed Url</span>
            <el-input v-model="blog.info.rssFeedUrl" />
        </div>

        <div>
            <span>Topics</span>
            <topic-select-multiple v-model="blog.topics" />
        </div>
    </div>
</template>


<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
    props: {
        value: {
            required: true,
            type: Object as PropType<any>
        }
    },
    data() {
        return {
            blog: this.value,
            inputVisible: false,
            inputValue: ''
        }
    },
    watch: {
        blog: function(newBlog) {
            this.$emit('input', newBlog)
        }
    },
})
</script>
