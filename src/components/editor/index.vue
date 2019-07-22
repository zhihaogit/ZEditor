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
			imageOptionsList: [
				{
					id: 0,
					symbol_id: '#iconLogfileupload',
					content: 'Upload',
				},
				{
					id: 1,
					symbol_id: '#iconinsert',
					content: 'link',
				}
			],
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
							const dropdownSlot = vm.imageOptionsList.map(_ => (
								<dropdown-item
									key={ _.id }
									command={ _.id }
								>
									<SvgIcon
										class="inline-block padding-right__5px"
										id={ _.symbol_id }
									/>
									<span
										class="inline-block"
									>{ _.content }</span>
								</dropdown-item>
							));

							return <div
							>
								<dropdown
									onCommand={ vm.imageDropDownCommand.bind(vm) }
								>
									<button
										title="Insert Image"
										class="btn-one insert-image__btn"
										type="text"
									>
										<SvgIcon
											id="#iconimage"
										/>
									</button>
									<span slot="dropdown">
										{ dropdownSlot }
									</span>
								</dropdown>
								<input
									ref="insertImageRef"
									type="file"
									accept="image/*"
									class="insert-image display-none"
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
		imageDropDownCommand(command) {
			if (command === 0) return this.$refs.insertImageRef.click();
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
	.insert-image__btn {
		padding: 4px 10px 5px 10px;
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
.inline-block {
	display: inline-block;
}
.padding-right__5px {
	padding-right: 5px;
}
</style>
