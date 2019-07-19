<template lang="html">
	<div>
		<svg
			v-bind="$attrs"
			v-on="$listeners"
			aria-hidden="true"
			class="icon"
		>
			<use
				:xlink:href="id"
			/>
		</svg>
	</div>
</template>

<script>
export default {
	componentName: 'SvgIcon',
	props: {
		id: {
			type: String,
			required: true,
		}
	}
}
</script>
