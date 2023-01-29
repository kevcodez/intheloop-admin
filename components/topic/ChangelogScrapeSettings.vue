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
                    "package": ""
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
                    "package": ""
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
            </el-select>
        </div>

        <div v-if="scrapeSettings.strategy === 'github_release'">
            <span>Repo</span>
            <el-input v-model="scrapeSettings.meta.repo" />

            <span>Owner</span>
            <el-input v-model="scrapeSettings.meta.owner" />
        </div>

        <div class="mt-4">
            <el-button @click="save">Save</el-button>
        </div>
    </div>
</template>