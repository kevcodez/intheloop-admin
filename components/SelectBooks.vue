<template>
    <select-topic-entities
        v-model="internal"
        :optionLabel="optionLabel"
        table="book"
        :searchFields="['title', 'description']"
    />
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
    props: {
        value: {
            required: true,
            type: Array as PropType<any[]>
        }
    },
    methods: {
        optionLabel(option: any) {
            return option.info.title
        }
    },
    data() {
        return {
            internal: this.value
        }
    },
    watch: {
        internal: function(selected: any[]) {
            this.$emit('input', selected)
        }
    }
})
</script>