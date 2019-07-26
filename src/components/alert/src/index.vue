<script>
export default {
    name: 'Alert',
    props: {
        title: String,
        type: {
            type: String,
            default: 'error',
        },
        description: String,
        closable: {
            type: Boolean,
            default: false,
        },
        center: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            visible: true,
        };
    },
    methods: {
        closeBtnClick() {
            this.visible = false;
            this.$emit('close');
        },
    },
    render() {
        const showClass = `${ this.visible ? 'display-block' : 'display-none' }`;
        const typeClass = this.type === 'error' ? 'alert-error' : '';
        const title = this.$slots.title || this.title
            ? <div
                class="alert-content__title"
            >
                { this.$slots.title || this.title }
            </div>
            : '';
        const content = this.$slots.default && !this.description
            ? <p
                class="alert-content__description"
            >
                { this.$slots.default }
            </p>
            : !this.$slots.default && this.description
                ? <p
                    class="alert-content__description"
                >
                    { this.description }
                </p>
                : '';
        const closeIcon = this.closable ? <i
            class="alert-content__close icon-close"
            onClick={this.closeBtnClick.bind(this)}
        ></i> : '';
        return <div
            class={`alert-container ${typeClass} ${showClass}`}
        >
            <div
                class="alert-content"
            >
                { title }
                { content }
            </div>
            { closeIcon }
        </div>;
    },
};
</script>

<style lang="less" scoped>
.alert {
	&-container {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 8px 16px;
		margin: 0;
		box-sizing: border-box;
		border-radius: 4px;
		position: relative;
		background-color: #fff;
		overflow: hidden;
		opacity: 1;
		display: flex;
		align-items: center;
		transition: opacity .2s;
	}
	&-content {
		padding: 0 8px;
		&__title {
			font-size: 13px;
			line-height: 18px;
		}
		&__description {
			font-size: 12px;
			margin: 5px 0 0;
		}
		&__close {
			width: 16px;
			height: 16px;
		}
	}
	&-error {
		background-color: #fef0f0;
		color: #f56c6c;
	}
}
.display-none {
	display: none;
}
.display-block {
	display: flex;
}
</style>
