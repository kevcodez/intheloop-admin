<template>
    <div>
        <div class="grid grid-cols-6 gap-6">
            <div>
                <span>ID</span>
                <el-input v-model="topic.id" />
            </div>
            <div>
                <span>Name</span>
                <el-input v-model="topic.info.name" />
            </div>

            <div>
                <span class="block">Live</span>
                <el-switch v-model="topic.info.live" />
            </div>

            <div>
                <span>Logo</span>
                <edit-image v-model="topic.info.logo" />
            </div>

            <div>
                <span class="block">Color</span>
                <el-color-picker v-model="topic.info.color" />
            </div>
        </div>

        <div class="grid grid-cols-2 gap-6 mt-4">
            <div>
                <span>Description</span>
                <el-input v-model="topic.info.description" type="textarea" />
            </div>

            <div>
                <span>Short Description</span>
                <el-input v-model="topic.info.shortDescription" type="textarea" />
            </div>
        </div>

        <div class="mt-4">
            <tag-list v-model="topic.info.tags" />
        </div>

        <div class="mt-4 grid grid-cols-4 gap-6">
            <div>
                <span>Website</span>
                <el-input v-model="topic.info.website" />
            </div>

            <div>
                <span>Playground</span>
                <el-input v-model="topic.info.playground" />
            </div>

            <div>
                <span>Issue Tracker</span>
                <el-input v-model="topic.info.issueTracker" />
            </div>

            <div>
                <span>Documentation</span>
                <el-input v-model="topic.info.documentation" />
            </div>

            <div>
                <span>Changelog</span>
                <el-input v-model="topic.info.changelog" />
            </div>
        </div>

        <div class="grid grid-cols-4 gap-6 mt-4">
            <div>
                <span class="block">SCM Type</span>
                <el-select class="w-full" v-model="topic.info.scm.type" placeholder="Select">
                    <el-option label="Github" value="Github" />
                </el-select>
            </div>

            <div>
                <span>SCM Url</span>
                <el-input v-model="topic.info.scm.url" />
            </div>

            <div>
                <span>SCM DisplayName</span>
                <el-input v-model="topic.info.scm.displayName" />
            </div>
        </div>

        <div class="grid grid-cols-4 mt-4 gap-6">
            <div>
                <span>License URL</span>
                <el-input v-model="topic.info.license.url" />
            </div>

            <div>
                <span>License Name</span>

                <el-input v-model="topic.info.license.name" />
            </div>
        </div>

        <div class="mt-4">
            <el-button @click="addBadge">Add Badge</el-button>
            <el-button @click="addSocialLink">Add Social Link</el-button>
        </div>

        <div class="mt-2 grid grid-cols-4 gap-6">
            <div v-for="(badge, i) in topic.info.badges" :key="i" class="space-y-2 shadow p-4">
                <a class="float-right" @click="removeBadge(badge)">Remove</a>

                <div>
                    <span class="block">Badge Type</span>
                    <el-select class="w-full" v-model="badge.type">
                        <el-option label="MavenCentral" value="MavenCentral" />
                        <el-option label="NPM" value="NPM" />
                    </el-select>
                </div>

                <div>
                    <span>Badge URL</span>
                    <el-input v-model="badge.url" />
                </div>
            </div>

            <div class="space-y-2 shadow p-4" v-for="(social, i) in topic.info.social" :key="i">
                <a class="float-right" @click="removeSocial(social)">Remove</a>
                <div>
                    <span class="block">Social Type</span>
                    <el-select class="w-full" v-model="social.type">
                        <el-option label="Twitter" value="Twitter" />
                        <el-option label="Youtube" value="Youtube" />
                    </el-select>
                </div>

                <div>
                    <span>URL</span>
                    <el-input v-model="social.url" />
                </div>

                <div>
                    <span>Label</span>
                    <el-input v-model="social.label" />
                </div>
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
            type: Object as PropType<any>
        }
    },
    data() {
        return {
            topic: this.value,
        }
    },
    watch: {
        topic: function (newTopic) {
            this.$emit('input', newTopic)
        }
    },
    methods: {
        addBadge() {
            this.topic.info.badges.push({ type: '', url: '' })
        },

        addSocialLink() {
            this.topic.info.social.push({ type: '', url: '', label: '' })
        },

        removeBadge(badge: any) {
            this.topic.info.badges.splice(this.topic.info.badges.indexOf(badge), 1);
        },

        removeSocial(social: any) {
            this.topic.info.social.splice(this.topic.info.social.indexOf(social), 1);
        }
    }
})
</script>


<style lang="scss">
textarea {
    @apply h-28;
}
</style>
