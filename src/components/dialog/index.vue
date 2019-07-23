<template>
	<div
		v-show="visible"
		class="dialog__wrapper"
		@click.self="handleWrapperClick"
	>
		<div
			class="dialog__content"
		>
			<div
				class="dialog__content-header"
			>
				<div class="dialog__content-header__title">
					<slot name="title">
						<span>{{ title }}</span>
					</slot>
				</div>
				<div
					class="dialog__content-header__close icon-close"
					@click="handleClose"
				/>
			</div>
			<div class="dialog__content-main">
				<slot
				/>
			</div>
			<div
				v-if="$slots.footer"
				class="dialog__content-footer"
			>
				<slot name="footer"></slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'MyDialog',
		props: {
			visible: {
				type: Boolean,
				default: false,
			},
			beforeClose: Function,
			title: String,
		},
		data() {
			return {

			};
		},
		methods: {
			hide() {
				this.$emit('update:visible', false);
				this.$emit('close');
			},
			handleClose() {
				return typeof this.beforeClose === 'function'
					? this.beforeClose(this.hide())
					: this.hide();
			},
			handleWrapperClick() {
				this.handleClose();
			},
		},
	};
</script>

<style lang="less" scoped>
.dialog {
	&__wrapper {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.3);
		// opacity: 0.5;
		overflow: auto;
	}
	&__content {
		margin: 15vh auto 50px;
		border-radius: 2px;
		box-shadow: 0 1px 3px rgba(0,0,0,.3);
		box-sizing: border-box;
		width: 50%;
		background-color: #fff;
		opacity: 1;
		color: #000;
		position: relative;
		z-index: 9999;
		&-header {
			display: flex;
			padding: 10px 15px;
			border-bottom: 1px solid #ccc;
			&__title {
				flex: 1;
			}
			&__close {
				cursor: pointer;
			}
		}
		&-main {
			padding: 10px 15px;
		}
		&-footer {
			padding: 10px 15px;
		}
	}
}
</style>
