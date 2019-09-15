<template>
	<view>
		<view class="status_bar"></view>
		<web-view :webview-styles="webviewStyles" :src="src" @message="webviewHook"></web-view>
	</view>
</template>
<script>
	var wv;
	export default {
		name: 'HelloWorld',
		components: {
			
		},
		data() {
			return {
				webviewStyles: {
					progress: false
				},
				src:'',
				top:0
			};
		},
	
		methods: {
			
		},
		onShow() {
			
		},
		onLoad(options) {
			let userData = uni.getStorageSync('user_data')
			if(userData === null || userData.length === 0){
				wx.showModal({
					title:"提示",
					content:"未登录，请前往登录",
					success: function (res) {
					            if (res.cancel) {
					               //点击取消,默认隐藏弹框
					            } else {
									uni.navigateTo({
										url:"/pages/login/login"
									})
								}
							},
				})
				return false;
			}
			// #ifdef APP-PLUS
			var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
			console.log(currentWebview)
			setTimeout(function() {
				wv = currentWebview.children()[0]
				let system = uni.getSystemInfoSync()
				wv.setStyle({top:system.statusBarHeight})
				// wv.setStyle({"scrollIndicator":"none"})
			}, 1000); //如果是页面初始化调用时，需要延时一下
			// #endif
			let token = uni.getStorageSync('api_token')
			this.src = `https://retail.quchebang.cn?token=${token}`
			console.log(options.src)
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: #FFFFFF;
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	
</style>

