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
                "strategy": "github_release",
                "meta": {
                    "repo": "",
                    "owner": "",
                    "package": "",
                    "markdownFileUrl": "",
                    "tagTemplate": ""
                },
            }
        }
    },
    async fetch() {
        const { data: scrapeSettings } = await this.$supabase
            .from('scrape_settings')
            .select('changelogs')
            .eq('topic_id', this.topicId)

        if (scrapeSettings && scrapeSettings.length) {
            this.scrapeSettings = scrapeSettings[0].changelogs
        }

        if (!this.scrapeSettings.strategy) {
            this.scrapeSettings = {
                "strategy": "github_release",
                "meta": {
                    "repo": "",
                    "owner": "",
                    "package": "",
                    "markdownFileUrl": "",
                    "tagTemplate": ""
                }
            }
        }
    },
    methods: {
        async save() {
            const { error } = await this.$supabase.from('scrape_settings').update({ changelogs: this.scrapeSettings }).eq('topic_id', this.topicId)

            if (error) {
                console.error(error)
                Vue.swal({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Error',
                    showConfirmButton: true,
                });
            } else {
                Vue.swal({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Saved',
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        },
    }
})
</script>

<template>

    <div>
        <div>
            <span class="block">Strategy</span>
            <el-select class="w-full" v-model="scrapeSettings.strategy">
                <el-option label="Github-Release" value="github_release" />
                <el-option label="Markdown-File" value="markdown_file" />
            </el-select>
        </div>

        <div v-if="scrapeSettings.strategy === 'github_release'">
            <span>Repo</span>
            <el-input v-model="scrapeSettings.meta.repo" />

            <span>Owner</span>
            <el-input v-model="scrapeSettings.meta.owner" />

            <span>Tag-Template ($version)</span>
            <el-input v-model="scrapeSettings.meta.tagTemplate" />
        </div>

        <div v-else-if="scrapeSettings.strategy === 'markdown_file'">
            <span>Markdown-File-URL</span>
            <el-input v-model="scrapeSettings.meta.markdownFileUrl" />
        </div>

        <div class="mt-4">
            <el-button @click="save">Save</el-button>
        </div>
    </div>
</template>