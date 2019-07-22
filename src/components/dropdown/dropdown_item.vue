<script>
	export default {
		componentName: 'DropdownItem',
		inject: ['dropdown'],
		props: {
			command: {
				type: [String, Number, Object],
				required: true,
			},
		},
		created() {
			this.dropdown.options.push(this);
		},
		beforeDestroy() {
			const index = this.dropdown.options.indexOf(this);
			this.dropdown.deleteOneOption(index);
		},
		methods: {
			itemClick() {
				this.dropdown.dropdownItemClick(this.command);
				this.dropdown.visible = false;
			},
		},
		render() {
			return <div
				class="item-one"
				onClick={ this.itemClick.bind(this) }
			>
				{ this.$slots.default }
			</div>
		},
	};
</script>

<style lang="less" scoped>
	.item-one {
		padding: 5px;
		&:hover {
			background-color: #ecf5ff;
		}
		.cursor-pointer;
	}
	.cursor-pointer {
		cursor: pointer;
	}
</style>
