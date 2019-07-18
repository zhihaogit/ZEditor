<template lang="html">
	<div
		class="board-container"
	>
		<z-editor
			v-model="outputValue"
			@change="editorChange"
		/>
		<div
			class="board-title"
		>
			Output:
		</div>
		<div class="board-show">
			{{ outputValue }}
		</div>
	</div>
</template>

<script>
import ZEditor from '@/components/editor'

export default {
	data() {
		return {
			outputValue: '',
		};
	},
	methods: {
		editorChange() {
		},
	},
	components: {
      ZEditor
    }
};
</script>

<style lang="less" scoped>
.board-container {
	.board-title {
		margin: 0 10px;
	}
	.board-show {
		margin: 5px 10px;
		min-height: 200px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
}
</style>
