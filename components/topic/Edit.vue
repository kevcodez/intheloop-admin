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
                <el-input v-model="topic.info.logo" />
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
            <el-tag
                v-for="tag in topic.info.tags"
                :key="tag"
                closable
                :type="tag"
                @close="handleClose(tag)"
            >{{ tag }}</el-tag>

            <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="mini"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
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
            <div v-for="badge in topic.info.badges" :key="badge.url" class="space-y-2 shadow p-4">
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

            <div class="space-y-2 shadow p-4" v-for="social in topic.info.social" :key="social.url">
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

        <div class="mt-6">
            <div>
                <span class="block">Via</span>
                <el-select class="w-full" v-model="topic.info.fetchReleases.via">
                    <el-option label="Github" value="Github" />
                    <el-option label="NPM" value="npm" />
                </el-select>
            </div>

            <div v-if="topic.info.fetchReleases.via === 'Github'">
                <span>Repo</span>
                <el-input v-model="topic.info.fetchReleases.meta.repo" />

                <span>Owner</span>
                <el-input v-model="topic.info.fetchReleases.meta.owner" />
            </div>

            <div v-else-if="topic.info.fetchReleases.via === 'npm'">
                <span>Package</span>
                <el-input v-model="topic.info.fetchReleases.meta.package" />
            </div>
        </div>

        <div class="grid grid-cols-4 gap-6 mt-4">
            <div>
                <span class="block">Blogs</span>
                <topic-select-blogs v-model="topic.blogs" />
            </div>

            <div>
                <span class="block">Books</span>
                <topic-select-books v-model="topic.books" />
            </div>

            <div>
                <span class="block">Communities</span>
                <topic-select-communities v-model="topic.communities" />
            </div>

            <div>
                <span class="block">Courses</span>
                <topic-select-courses v-model="topic.courses" />
            </div>

            <div>
                <span class="block">Newsletters</span>
                <topic-select-newsletters v-model="topic.newsletters" />
            </div>

            <div>
                <span class="block">Developers</span>
                <topic-select-developers v-model="topic.developers" />
            </div>

            <div>
                <span class="block">Podcasts</span>
                <topic-select-podcasts v-model="topic.podcasts" />
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
            inputVisible: false,
            inputValue: ''
        }
    },
    watch: {
        topic: function(newTopic) {
            this.$emit('input', newTopic)
        }
    },
    methods: {
        handleClose(tag: string) {
            this.topic.info.tags.splice(this.topic.info.tags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            // @ts-ignore
            this.$nextTick((_) => {
                // @ts-ignore
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.topic.info.tags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },

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

.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>
