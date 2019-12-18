<script>
import { getOpenID, login, getSessionID } from '@/api/index.js';
export default {
	onLaunch: function(options) {
		if(options.query.code!==undefined){
			uni.setStorageSync('ReferrerCode',options.query.code)
		}else{
			uni.setStorageSync('ReferrerCode',0)
		}
		
		if(options.query.openID!==undefined){
			uni.setStorageSync('openID',options.query.openID)
		}else{
			uni.removeStorage({
				key:'openID'
			})
		}
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
		let session_id = uni.getStorageSync('session_id')
		if(session_id == null || session_id.length === 0){
			getSessionID().then(res=>{
				console.log(res)
				if(res.Code == 200){
					uni.setStorageSync('session_id',res.Data)
				}
			})
		}
		
	},
	onHide: function() {
	},
	globalData:{
		redirect:'',
		formData:{
			type:0,
			car:'',
			time:'',
			storeID:0,
			storeName:'',
			price:''
		}
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
	  src: url('//at.alicdn.com/t/font_1363505_erpgrtl2psf.eot');
	  src: url('//at.alicdn.com/t/font_1363505_erpgrtl2psf.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1363505_erpgrtl2psf.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1363505_erpgrtl2psf.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1363505_erpgrtl2psf.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1363505_erpgrtl2psf.svg#iconfont') format('svg');
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
