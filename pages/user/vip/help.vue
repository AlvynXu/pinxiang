<template>
	<web-view :webview-styles="webviewStyles" src="http://mp.weixin.qq.com/s?__biz=MzIzNjc0OTc1MA==&mid=100000004&idx=1&sn=10330054ef4a5e2b250aad534e26b479&chksm=68d257dd5fa5decbfb5ce7ed6140373f59fe1048f2aa3ad90012062edd4f1369a8e91ad0e8ba#rd"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				 webviewStyles: {
					progress: false
				}
			}
		}
		
	}
</script>

<style>
</style>
