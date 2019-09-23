<template>
	<view class="login-box">
		<view class="login-logo-box">
			<view class="vant-icon login-logo">&#xe6a7;</view>
		</view>
		<view class="login-header">hi，请登录～</view>
		<view class="login-hint">授权后，可以更好的体验</view>
		<button class="login-button" open-type="getUserInfo" @getuserinfo="onGotUserInfo">微信用户登陆</button>
	</view>
</template>

<script>
	import {login,getVip} from '@/api/index.js'
	export default {
		data() {
			return {
				bgc:"https://cdn.doudouxiongglobal.com/blog/1/0e18a361d1506bfb49d1b27afed60356.jpg",
				isLogin:0,
				avatar:"https://cdn.doudouxiongglobal.com/Default_image/%20default_head_01.png",
				nickname:'优象会员',
				phone:'',
				vip : 0,
				redirect:'',
				vipData:[]
			}
		},
		methods: {
			//打开弹出层
			goActive(){
				let userData = uni.getStorageSync('user_data')
				
				uni.navigateTo({
				    url: 'active'
				});
			},
			goCar(){
				uni.navigateTo({
				    url: 'car'
				});
			},
			goCredit(){
				uni.navigateTo({
				    url: 'credit'
				});
			},
			goVip(){
				if(this.vip === 0){
					wx.showModal({
						title:'提示',
						content:'您未购买vip，请先购买',
						confirmText:'前往',
						success(res) {
							if (res.confirm) {
							      uni.navigateTo({
							          url: 'active'
							      });
							    } else if (res.cancel) {
									
							    }
						}
					})
				}else{
					uni.navigateTo({
					    url: 'vip/vip'
					});
				}
			},
			goGiftCard(){
				uni.navigateTo({
				    url: 'giftCard/giftCard'
				});
			},
			login(userData){
				console.log(userData)
				let that = this
				let openID = uni.getStorageSync('wxOpenID')
				login({
					'Type':'WECHAT',
					'OpenID': openID,
					'Nickname': userData.userInfo.nickName,
					'Avatar':userData.userInfo.avatarUrl,
					'Sex': userData.userInfo.gender === 1 ? 0 : 1,
					'Province': userData.userInfo.province,
					'City':userData.userInfo.city,
					'ReferrerCode':uni.getStorageSync('ReferrerCode')
				}).then((res)=>{
					if(res.Code === 200)
					{
						uni.setStorageSync('api_token',res.Data.access_token)
						uni.setStorageSync('user_data',JSON.stringify(res.Data.user))
						that.avatar = res.Data.user.Avatar,
						that.nickname = res.Data.user.Nickname,
						that.phone = res.Data.user.Phone
						that.isLogin = 1
						// let userData = uni.getStorageSync('user_data')
						// console.log(userData)
						if(res.Data.user.Vip === 1) that.vip = 1
						getVip({}).then((res)=>{
							console.log(res)
							if(res.Code === 200){
								that.vipData = res.Data
							}
						})
						wx.showToast({
							title:"登陆成功"
						})
						if(that.redirect!=''){
							console.log(that.redirect)
							wx.redirectTo({
								url:that.redirect
							})
						}else{
							uni.navigateBack({})	
						}
					}
				})
				console.log(openID)
			},
			onGotUserInfo(e){
				this.login(e.detail)
			},
			getPhoneNumber (e) {
			    console.log(e.detail.errMsg)
			    console.log(e.detail.iv)
			    console.log(e.detail.encryptedData)
			}
		},
		onShow() {
			let userData = uni.getStorageSync('user_data')
			let that = this
			if(userData.length > 0){
				userData = JSON.parse(userData)
				console.log(userData)
				this.avatar = userData.Avatar,
				this.nickname = userData.Nickname,
				this.phone = userData.Phone
				this.isLogin = 1
				if(userData.Vip === 1) this.vip = 1
				getVip({}).then((res)=>{
					console.log(res)
					if(res.Code === 200){
						that.vipData = res.Data
					}
				})
			}
		},
		onLoad(options) {
			// let userData = uni.getStorageSync('user_data')
			// let that = this
			// if(userData.length > 0){
			// 	userData = JSON.parse(userData)
			// 	console.log(userData)
			// 	this.avatar = userData.Avatar,
			// 	this.nickname = userData.Nickname,
			// 	this.phone = userData.Phone
			// 	this.isLogin = 1
			// 	if(userData.Vip === 1) this.vip = 1
			// 	getVip({}).then((res)=>{
			// 		console.log(res)
			// 		if(res.Code === 200){
			// 			that.vipData = res.Data
			// 		}
			// 	})
			// }
			let userData = uni.getStorageSync('user_data')
			let that = this
			if(userData.length > 0){
				this.login({userInfo:{
					nickName: userData.Nickname,
					gender:userData.Sex,
					province:userData.Province,
					city:userData.City
				}})
			}
			console.log(options)
			if(options.redirect!==undefined){
				this.redirect = options.redirect
			}
		}
	}
</script>

<style lang="scss" scoped>
	
.login-logo-box{
	width:317upx;
	height:317upx;
	margin:0 auto;
	margin-top:243upx;
	.login-logo{
		width: 100%;
		height: 100%;
		font-size: 317upx;
		line-height: 317upx;
		color:rgba(254,81,0,0.05);
	}
	
}
.login-header{
	margin-top:33upx;
	text-align: center;
	font-size:36upx;
	font-weight:600;
	color:rgba(51,51,51,1);
	line-height:51upx;
}
.login-hint{
	margin-top:138upx;
	text-align: center;
	font-size:29upx;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:40upx;
}
.login-button{
	margin-top:105upx;
	color:white;
	line-height: 109upx;
	width:667upx;
	height:109upx;
	background:rgba(68,181,73,1);
	border-radius:18upx;
}
</style>
