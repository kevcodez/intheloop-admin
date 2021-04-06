<template>
    <select-topic-entities
        v-model="internal"
        :optionLabel="optionLabel"
        table="course"
        :searchFields="['url', 'name']"
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
            return option.info.name
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