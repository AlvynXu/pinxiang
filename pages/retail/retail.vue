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
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
			let userData = uni.getStorageSync('user_data')
			userData = JSON.parse(userData)
			let referrer = userData['SerialCode']
			console.log(referrer)
			return {
			  title: '【50元红包】加入会员，全年不限次数免费保养',
			  imageUrl:'https://cdn.doudouxiongglobal.com/pinxiang/image/share/lALPDgQ9rBP3f8PNAyDNA-g_1000_800.png_620x10000q90g.jpg',
			  path: '/pages/userSub/share?code='+referrer
			}
		},
	
		methods: {
			
		},
		onShow() {
			let token = uni.getStorageSync('api_token')
			this.src = `https://retail.quchebang.cn/pages/distribution/distribution?token=${token}&v=`+Math.random()
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
			console.log(1)
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
			this.src = `https://retail.quchebang.cn/pages/distribution/distribution?token=${token}`
			// this.src = `http://localhost:8080/pages/distribution/distribution?token=${token}`
			
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

