<script>
import { getOpenID, login } from '@/api/index.js';
export default {
	onLaunch: function() {
		uni.checkSession({
			success() {
				//session_key 未过期，并且在本生命周期一直有效
				let openID = uni.getStorageSync('wxOpenID');
				if (openID == null || openID.length === 0) {
					uni.login({
						success(res) {
							getOpenID({ Code: res.code }).then(result => {
								if (result.Code === 200) {
									uni.setStorageSync('wxOpenID', result.Data.openid);
								}
							});
						}
					});
				}
			},
			fail() {
				uni.login({
					success(res) {
						getOpenID({ Code: res.code }).then(result => {
							if (result.Code === 200) {
								uni.setStorageSync('wxOpenID', result.Data.openid);
							}
						});
					}
				});
				// session_key 已经失效，需要重新执行登录流程
			}
		});
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	globalData:{
		redirect:'',
	}
};
</script>

<style>
	/*每个页面公共css */
	*{
		margin:0;
		padding:0;
	}
	
	@font-face {
	  font-family: 'vant-icon';  /* project id 1363505 */
	  src: url('//at.alicdn.com/t/font_1363505_y2hdwpyci1.eot');
	  src: url('//at.alicdn.com/t/font_1363505_y2hdwpyci1.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1363505_y2hdwpyci1.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1363505_y2hdwpyci1.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1363505_y2hdwpyci1.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1363505_y2hdwpyci1.svg#iconfont') format('svg');
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
