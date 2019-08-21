export default {
    data() {
        return {};
    },
    methods: {
        downloadByTagA(url) {
            const tagA = document.createElement('a');
            tagA.href = url;
            tagA.setAttribute('download', '');
            document.body.appendChild(tagA);
            tagA.click();
            tagA.remove();
        },
    },
};
