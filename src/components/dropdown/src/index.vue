<script>
export default {
    name: 'Dropdown',
    provide() {
        return {
            dropdown: this,
        };
    },
    props: {
        value: {
            type: [String, Number, Object, ],
        },
    },
    data() {
        return {
            visible: false,
            options: [],
        };
    },
    methods: {
        headerClick() {
            this.visible = !this.visible;
        },
        dropdownItemClick(command) {
            this.$emit('input', command);
            this.$emit('command', command);
        },
        deleteOneOption(index = '') {
            this.options.splice(index, 1);
        },
    },
    render() {
        const headerClick = this.headerClick.bind(this);
        const dropdownClass = `dropdown__content ${this.visible ? 'dropdown__open' : 'dropdown__close'}`;
        return <div
            class="dropdown-container"
        >
            <div
                class="dropdown-header"
                onClick={ headerClick }
            >{ this.$slots.default }</div>
            <div
                class={ dropdownClass }
            >{ this.$slots.dropdown }</div>
        </div>;
    },
};
</script>

<style lang="less" scoped>
	.dropdown {
		&-container {
			height: 100%
		}
		&-header {
			height: 100%
		}
		&__content {
			background-color: #fff;
			font-size: 13px;
			z-index: 9999;
		}
		&__open {
			display: block;
		}
		&__close {
			display: none;
		}
	}
</style>
