<script>
	export default {
		name:'Alert',
		props: {
			title: String,
			type: {
				type: String,
				default: 'warnnig',
			},
			description: String,
			closable: {
				type: Boolean,
				default: true,
			},
			center: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {

			};
		},
		methods: {

		},
		render() {
			const title = this.$slots.title || this.title
				? <div
						class="alert-content__title"
					>
						{ this.$slots.title || this.title }
					</div>
				: '';
			const content = this.$slots.default && !this.description
				? <p
						class="alert-content__description"
					>
						{ this.$slots.default }
					</p>
				: !this.$slots.default && this.description
				? <p
						class="alert-content__description"
					>
						{ this.description }
					</p>
				: '';
			return <div
				class="alert-container"
			>
				<div
					class="alert-content"
				>
					{ title }
					{ content }
				</div>
			</div>;
		},
	}
</script>

<style lang="less" scoped>
	.alert {
		&-container {

		}
		&-content {
			&__title {

			}
			&__description {

			}
		}
	}
</style>
