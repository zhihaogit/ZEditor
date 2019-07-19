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
						id: '#iconcc-indent-decrease'
					},
				},
				{
					type: 'bold',
					template: null,
					templateParams: {
						type: 'bold',
						id: '#iconbold',
						className: 'font-size__16'
					},
				},
				{
					type: 'italic',
					template: null,
					templateParams: {
						type: 'italic',
						id: '#iconitaly'
					},
				},
				{
					type: 'underline',
					template: null,
					templateParams: {
						type: 'underline',
						id: '#iconunderline',
						className: 'font-size__16'
					},
				},
				// {
				// 	type: 'insertImage',
				// 	template: {
				// 		render: () => {
				// 			const handler = vm.utilsExecCommand.bind(vm, 'insertImage');
				//
				// 			return <el-button
				// 				type="text"
				// 				class="btn-one"
				// 				onClick={ handler }
				// 			>
				// 				<SvgIcon
				// 					id="#iconinsert"
				// 				/>
				// 			</el-button>;
				// 		}
				// 	}
				// },
			]
		};
	},
	methods: {
		boardInput() {
			this.innerHTML = this.$refs.boardRef.innerHTML;
			this.$emit('input', this.$refs.boardRef.innerHTML);
			this.$emit('change', this.$refs.boardRef.innerHTML);
		},
		utilsExecCommand(aCommandName, aValueArgument) {
			document.execCommand(aCommandName, false, aValueArgument);
		},
		outputDefaultTemplate({
			type = '',
			id = '',
			className = ''
		}) {
			return {
				render: () => {
					const handler = this.utilsExecCommand.bind(this, type);
					const defultClass = `btn-one ${className}`;

					return <el-button
						type="text"
						class={ defultClass }
						onClick={ handler }
					>
						<SvgIcon
							id={ id }
						/>
					</el-button>;
				}
			}
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
</style>
