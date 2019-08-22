<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			wx.checkSession({
			  success () {
			    //session_key 未过期，并且在本生命周期一直有效
			  },
			  fail () {
			    // session_key 已经失效，需要重新执行登录流程
			    wx.login() //重新登录
			  }
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	
	@font-face {
	  font-family: 'vant-icon';  /* project id 1314172 */
		src: url('https://at.alicdn.com/t/font_1363505_w2nexhak31d.eot');
		src: url('https://at.alicdn.com/t/font_1363505_w2nexhak31d.eot?#iefix') format('embedded-opentype'),
		url('https://at.alicdn.com/t/font_1363505_w2nexhak31d.woff2') format('woff2'),
		url('https://at.alicdn.com/t/font_1363505_w2nexhak31d.woff') format('woff'),
		url('https://at.alicdn.com/t/font_1363505_w2nexhak31d.ttf') format('truetype'),
		url('https://at.alicdn.com/t/font_1363505_w2nexhak31d.svg#iconfont') format('svg');
	}
	.vant-icon {
		font-family:'vant-icon' !important;
		font-size:40rpx;
		font-style:normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		margin-right: 14rpx;
	}
	.icon-dingwei:before{
		content:"&#xe66b";
	}
</style>
