<script>
	export default {
		componentName: 'Dropdown',
		data() {
			return {
				visible: false,
			};
		},
		methods: {
			headerClick() {
				this.visible = !this.visible;
			},
		},
		props: {
			// dataList: {
			// 	type: Array,
			// 	default: () => [],
			// 	required: true,
			// }
		},
		render() {
			const headerClick = this.headerClick.bind(this);
			const dropdownClass = `dropdown__content ${this.visible ? 'dropdown__open' : 'dropdown__close'}`;

			const dropdownChildren = this.$utils.delve(this, '$slots.dropdown.0.children');
			return <div>
				<div
					onClick={ headerClick }
				>{ this.$slots.default }</div>
				<div
					class={ dropdownClass }
				>{ this.$slots.dropdown }</div>
			</div>
		},
	}
</script>

<style lang="less" scoped>
	.dropdown {
		&__content {

		}
		&__open {
			display: block;
		}
		&__close {
			display: none;
		}
	}
</style>
