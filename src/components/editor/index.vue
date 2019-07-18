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
			<el-button
				@click="utilsExecCommand('indent')"
			>
				Indent
			</el-button>
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
	data() {
		return {
			innerHTML: '',
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

	}
	&__board {
		min-height: 400px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
}
</style>
