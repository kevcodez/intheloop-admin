<template>
    <div>
        <multiselect
            class="w-full"
            v-model="selectedValues"
            :options="options"
            :internal-search="false"
            :multiple="true"
            :searchable="true"
            open-direction="bottom"
            :loading="isLoading"
            @search-change="search"
            track-by="id"
            :custom-label="optionLabel"
        />
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
    props: {
        value: {
            required: true,
            type: Array as PropType<any[]>
        },
        table: {
            required: true,
            type: String
        },
        searchFields: {
            required: true,
            type: Array as PropType<string[]>
        },
        optionLabel: {
            required: true,
            type: Function
        }
    },
    data() {
        return {
            options: [] as any[],
            selectedValues: [] as any[],
            isLoading: false
        }
    },
    methods: {
        async search(query: string) {
            if (query.length < 3) return

            this.isLoading = true

            const { data, error } = await this.$supabase
                .from<any>(this.table)
                .select('*')
                .or( this.searchFields.map(it => `info->>${it}.ilike.*${query}*`).join(`,`))

            this.isLoading = false
            if (data) {
                this.options = data
            }
        },
        async loadFromValues() {
            if (!this.value) {
                this.selectedValues = []
            } else {
                const { data, error } = await this.$supabase
                    .from<any>(this.table)
                    .select('*')
                    .in("id", this.value)

                this.selectedValues = data || []
            }

        }
    },
    mounted() {
        this.loadFromValues()
    },
    watch: {
        selectedValues: function(selected: any[]) {
            const idsSelected = selected.map(it => it.id)

            this.$emit('input', idsSelected)
        }
    }
})

</script>