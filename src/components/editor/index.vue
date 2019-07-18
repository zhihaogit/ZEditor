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
			<el-button>
				123
			</el-button>

		</div>
		<div
			class="editor-container__board"
		>

		</div>
	</div>
</template>

<script>
export default {
	name: 'ZEditor',
	data() {
		return {

		};
	},
}
</script>

<style lang="less" scoped>
.editor-container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
