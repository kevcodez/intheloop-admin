<template>
    <select-entities
        v-model="internal"
        :optionLabel="optionLabel"
        table="newsletter"
        :searchFields="['url', 'name']"
    />
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
    props: {
        value: {
            required: false,
            type: Array as PropType<any[]>
        }
    },
    methods: {
        optionLabel(option: any) {
            return `${option.info.name} (${option.info.url})`
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