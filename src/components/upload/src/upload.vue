<template>
    <div
        class="display-none"
        @click="handleClick"
    >
        <input ref="uploadInput"
               type="file"
               class="display-none"
               :multiple="multiple"
               @change="uploadChange"
        >
    </div>
</template>

<script>
import ajax from './ajax';

export default {
    name: 'upload',
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        multiple: {
            type: Boolean,
            default: true,
        },
        autoUpload: {
            type: Boolean,
            default: false,
        },
        httpRequest: {
            type: Function,
            default: ajax,
        },
        action: {
            type: String,
            required: true,
        },
        onSuccess: {
            type: Function,
            default: () => {},
        },
        onError: {
            type: Function,
            default: () => {},
        },
        onProgress: {
            type: Function,
            default: () => {},
        },
        headers: {
            type: Object,
            default: () => ({}),
        },
        withCredentials: {
            type: Boolean,
            default: true,
        },
        name: {
            type: String,
            default: 'file',
        },
    },
    data() {
        return {
            fileList: [],
            tempIndex: 1,
        };
    },
    methods: {
        uploadChange(e) {
            const files = e.target.files;
            // 类数组转数组
            let postFiles = Array.prototype.slice.call(files);
            if (!this.multiple) { postFiles = postFiles.slice(0, 1); }
            if (postFiles.length === 0) { return; }
            if (!this.multiple) {
                postFiles = postFiles.slice(0, 1);
            }

            postFiles.forEach(_ => {
                this.handleStart(_);
                if (this.autoUpload) {this.upload(_);}
            });
        },
        upload(rawFile) {
            this.$refs.uploadInput.value = null;
            return this.post(rawFile);
        },
        handleStart(rawFile) {
            rawFile.uid = Date.now() + this.tempIndex++;
            let file = {
                status: 'ready',
                name: rawFile.name,
                size: rawFile.size,
                percentage: 0,
                uid: rawFile.uid,
                raw: rawFile,
                file: rawFile.file,
            };
            file.url = URL.createObjectURL(rawFile);
            this.fileList.push(file);
            this.$emit('change', this.fileList);
        },
        post(rawFile) {
            const options = {
                headers: this.headers,
                withCredentials: this.withCredentials,
                file: rawFile,
                filename: this.name,
                action: this.action,
                onProgress: e => {
                    this.onProgress(e, rawFile);
                },
                onSuccess: res => {
                    this.onSuccess(res, rawFile);
                },
                onError: err => {
                    this.onError(err, rawFile);
                },
            };
            const req = this.httpRequest(options);
            if (req && req.then) {
                req.then(options.onSuccess, options.onError);
            }
        },
        handleClick() {
            if (!this.disabled) {
                this.$refs.uploadInput.value = null;
                this.$refs.uploadInput.click();
            }
        },
        // 手动调用，上传数据
        handleUpload() {
            this.fileList.forEach(_ => {
                this.upload(_.raw);
            });
        },
    },
};
</script>

<style scoped>
.display-none {
	display: none;
}
</style>

