<template>
	<div id="app">
		<div class="content-div">
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive" />
			</keep-alive>
			<router-view v-if="!$route.meta.keepAlive" />
		</div>
		<footer-bar class="footer" v-show="$route.meta.navShow"></footer-bar>
	</div>
</template>

<script>
	import Footer from '@/components/FooterBar.vue'
	export default {
		name: 'app',
		components: {
			'footer-bar': Footer
		},
		computed: {}
	}
</script>
<style scoped="">

</style>
