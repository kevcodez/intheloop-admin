<template>
    <div>
        <el-tag
            v-for="tag in tags"
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
</template>


<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
    props: {
        value: {
            required: true,
            type: Array as PropType<string[]>
        }
    },
    data() {
        return {
            tags: this.value,
            inputVisible: false,
            inputValue: ''
        }
    },
    methods: {
        handleClose(tag: string) {
            this.tags.splice(this.tags.indexOf(tag), 1);
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
                this.tags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
    },
    watch: {
        tags: function(tags) {
            this.$emit('input', tags)
        }
    },
})
</script>

<style lang="scss">
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