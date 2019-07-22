<template lang="html">
	<div
		class="editor-container"
	>
		<div
			class="editor-container__header"
		>
			ZEditor
		</div>
		<div
			class="editor-container__operation"
		>
			<div
				v-for="(_, i) in operationOptions"
				:key="i"
				class="editor-container__operation-one"
			>
				<component
					:is="_.template ? _.template : outputDefaultTemplate(_.templateParams)"
				/>
			</div>
		</div>
		<div
			ref="boardRef"
			contenteditable
			class="editor-container__board"
			@input="boardInput"
		>

		</div>
	</div>
</template>

<script>
export default {
	name: 'ZEditor',
	props: {
		value: [String]
	},
	data(vm) {
		return {
			innerHTML: '',
			operationOptions: [
				{
					type: 'indent',
					template: null,
					templateParams: {
						type: 'indent',
						id: '#iconcc-indent-decrease',
						title: 'Indent',
					},
				},
				{
					type: 'bold',
					template: null,
					templateParams: {
						type: 'bold',
						id: '#iconbold',
						className: 'font-size__16',
						title: 'Bold',
					},
				},
				{
					type: 'italic',
					template: null,
					templateParams: {
						type: 'italic',
						id: '#iconitaly',
						title: 'Italic',
					},
				},
				{
					type: 'underline',
					template: null,
					templateParams: {
						type: 'underline',
						id: '#iconunderline',
						className: 'font-size__16',
						title: 'Underline',
					},
				},
				{
					type: 'insertImage',
					template: {
						render: () => {
							const handler = (id) => {
								if (id === 0) return this.$refs.insertImageRef.click();
							}
							const optionsList = [
								{
									id: 0,
									content: 'Upload',
								},
								{
									id: 1,
									content: 'link',
								}
							];
							const dropdownSlot = optionsList.map(_ => (
								<div
									key={ _.id }
									onClick={ handler.bind(this, _.id) }
								>{ _.content }</div>
							));

							return <div>
								<dropdown>
									<button
										title="Insert Image"
										type="text"
										class="btn-one"
									>
										<SvgIcon
											id="#iconimage"
										/>
									</button>
									<div slot="dropdown">
										{ dropdownSlot }
									</div>
								</dropdown>
								<input
									ref="insertImageRef"
									type="file"
									accept="image/*"
									class="insert-image"
									class="display-none"
									onChange={ vm.insertImageChange.bind(vm) }
								/>
							</div>;
						}
					}
				},
			]
		};
	},
	methods: {
		boardInput() {
			this.innerHTML = this.$refs.boardRef.innerHTML;
			this.$emit('input', this.$refs.boardRef.innerHTML);
			this.$emit('change', this.$refs.boardRef.innerHTML);
		},
		// insertImage command官方手册标明支持 url,但也支持 base64
		insertImageChange(e) {
			// this.$refs.insertImageRef && (this.$refs.insertImageRef.value = null);
			const reader = new FileReader();
			const file = e.target.files[0];
			reader.onload = () => {
				const base64Img = reader.result;
				this.utilsExecCommand('insertImage', base64Img);
				// this.$refs.insertImageRef && (this.$refs.insertImageRef.value = '');
				// document.querySelector('.insert-image input').value = '';
			};
			reader.readAsDataURL(file);
		},
		utilsExecCommand(aCommandName, aValueArgument) {
			this.$refs.boardRef.focus();
			document.execCommand(aCommandName, false, aValueArgument);
		},
		outputDefaultTemplate({
			type = '',
			id = '',
			className = '',
			handler = null,
			title = '',
		}) {
			return {
				render: () => {
					const defaultHandler = handler || this.utilsExecCommand.bind(this, type);
					const defaultClass = `btn-one ${className}`;

					return <button
						title={ title }
						type="text"
						class={ defaultClass }
						onClick={ defaultHandler }
					>
						<SvgIcon
							id={ id }
						/>
					</button>;
				}
			};
		},
	}
}
</script>

<style lang="less" scoped>
.editor-container {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	box-sizing: border-box;
	padding: 0 10px;
	&__header {

	}
	&__operation {
		display: flex;
		height: 30px;
		border: 1px solid #ccc;
		border-bottom: none;
		border-radius: 4px;
		border-bottom-left-radius: 0px;
		border-bottom-right-radius: 0px;
		&-one {
			display: flex;
		}
		.btn-one {
			padding: 0 10px;
			color: #409EFF;
			font-weight: 600;
			font-size: 18px;
			background-color: #fff;
			border: none;
			&:hover {
				background-color: #ecf5ff;
			}
			.cursor-pointer;
		}
	}
	&__board {
		min-height: 400px;
		border: 1px solid #ccc;
		border-radius: 4px;
		border-top-left-radius: 0px;
		border-top-right-radius: 0px;
	}
}
.cursor-pointer {
	cursor: pointer;
}
.font-size__16 {
	font-size: 16px!important;
}
.display-none {
	display: none;
}
</style>
