<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
    props: {
        topicId: {
            required: true,
            type: String
        }
    },
    data() {
        return {
            scrapeSettings: {
                "via": "github",
                "meta": {
                    "repo": "",
                    "owner": "",
                    "package": ""
                }
            },
        }
    },
    async fetch() {
        const { data: scrapeSettings } = await this.$supabase
            .from('scrape_settings')
            .select('releases')
            .eq('topic_id', this.topicId)

        if (scrapeSettings && scrapeSettings.length) {
            this.scrapeSettings = scrapeSettings[0].releases
        }
    },
    methods: {
        async save() {
            const { error } = await this.$supabase.from('scrape_settings').update({ releases: this.scrapeSettings }).eq('topic_id', this.topicId)
        },
    }
})
</script>

<template>

    <div>
        <div>
            <span class="block">Via</span>
            <el-select class="w-full" v-model="scrapeSettings.via">
                <el-option label="Github" value="Github" />
                <el-option label="NPM" value="npm" />
            </el-select>
        </div>

        <div v-if="scrapeSettings.via === 'Github'">
            <span>Repo</span>
            <el-input v-model="scrapeSettings.meta.repo" />

            <span>Owner</span>
            <el-input v-model="scrapeSettings.meta.owner" />
        </div>

        <div v-else-if="scrapeSettings.via === 'npm'">
            <span>Package</span>
            <el-input v-model="scrapeSettings.meta.package" />
        </div>

        <div class="mt-4">
            <el-button @click="save">Save</el-button>
        </div>
    </div>
</template>