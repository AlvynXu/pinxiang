<template>
	<view class="user-box">
		<view class="user-login" v-if="isLogin===0">
			<view class="login-white">
				<view class="vant-icon">&#xe691;</view>
				<view class="login">
					<button class="login-button" plain="true" lang="zh_CN" open-type="getUserInfo" @getuserinfo="onGotUserInfo">立即登录</button>
				</view>
			</view>
			<view class="user-join" @click="goActive">
				<view class="join-name">加入会员</view>
				<view class="join-word">尊享全年免费保养特权</view>
				<view class="join-button">立即领取特权</view>
			</view>
		</view>
		<view class="user-login" v-if="isLogin===1">
			<view class="login-white">
				<image class="login-avatar" :src="avatar" mode="aspectFill"></image>
				<view class="login-msg">
					<view class="vip">{{nickname}}</view>
					<view class="phone" v-if="phone">{{phone}}</view>
				</view>
			</view>
			<view class="user-join" @click="goActive">
				<view v-show="vip===0">
					<view class="join-name">加入会员</view>
					<view class="join-word">尊享全年免费保养特权</view>
					<view class="join-button">立即领取特权</view>
				</view>
				<view v-show="vip===1" style="position: relative;height: 100%;">
					<image class="vip-image" src="https://cdn.doudouxiongglobal.com/pinxiang/image/vip/VIP_cover.png" mode="aspectFill"></image>
					<view class="vip-endtime">{{vipData.EndDate}} 到期</view>
					<view class="vip-number">{{vipData.VipNo}}</view>
				</view>
			</view>
		</view>
		<view class="user-prove">
			<view class="prove-car list" @click="goCar">
				<image class="img" src="https://cdn.doudouxiongglobal.com/pinxiang/image/column/car.png" mode="aspectFit"></image>
				<view class="vant-word">车辆认证</view>
				<view class="vant-icon">&#xe609;</view>
			</view>
			<view class="prove-vip list" @click="goVip">
				<image class="img" src="https://cdn.doudouxiongglobal.com/pinxiang/image/column/vip.png" mode="aspectFit"></image>
				<view class="vant-word">我的会员</view>
				<view class="vant-icon">&#xe609;</view>
			</view>
			<view class="prove-credit list" @click="goCredit">
				<image class="img" src="https://cdn.doudouxiongglobal.com/pinxiang/image/column/credit.png" mode="aspectFit"></image>
				<view class="vant-word">品象信用</view>
				<view class="vant-icon">&#xe609;</view>
			</view>
			<!-- <view class="prove-center list" @click="goGiftCard">
				<view class="vant-icon">&#xe6a4;</view>
				<view class="vant-word">赠卡中心</view>
				<view class="vant-icon">&#xe609;</view>
			</view> -->
		</view>
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
					'Referrer':0
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
						if(that.redirect!=''){
							console.log(that.redirect)
							getApp().globalData.redirect=''
							wx.navigateTo({
								url:that.redirect
							})
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
		onLoad(options) {
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
			this.redirect = getApp().globalData.redirect
		}
	}
</script>

<style lang="scss" scoped>
.user-box{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	background:#f3f3f3;
	.user-login{
		width:750upx;
		height:522upx;
		position: relative;
		.login-white{
			padding-top:50upx;
			width:723upx;
			padding-left:27upx;
			height:303upx;
			background: #fff;
			display: flex;
			justify-content:start;
			.vant-icon{
				font-size:100upx;
				margin-left:20upx;
				margin-right:0;
				color:#A4A4A4;
			}
			.login-avatar{
				width:121upx;
				height:121upx;
				border-radius:121upx;
			}
			.login{
				font-size:33upx;
				height:121upx;
				line-height: 121upx;
				margin-left:51upx;
			}
			.login-msg{
				margin-top: 20upx;
				height:121upx;
				margin-left:51upx;
				.vip{
					font-size:33upx;
				}
				.phone{
					font-size:29upx;
					margin-top: 10upx;
				}
			}
		}
		
		.user-join{
			position: absolute;
			width:667upx;
			height:313upx;
			background:linear-gradient(134deg,rgba(254,81,0,1) 0%,rgba(254,140,0,1) 100%);
			border-radius:11upx;
			margin-left: 42upx;
			top:232upx;
			left:0;
			.join-name{
				font-size:29upx;
				margin-left:20upx;
				margin-top:34upx;
				color:#fff;
			}
			.join-word{
				margin-left:20upx;
				font-size:40upx;
				color:#fff;
				margin-top:27upx;
			}
			.join-button{
				font-size:33upx;
				color:#FE5100;
				width:620upx;
				height:83upx;
				margin-top:31upx;
				line-height:83upx;
				margin-left:20upx;
				text-align: center;
				background: #fff;
				border-radius: 11upx;
			}
		}
	}
	.user-prove{
		width:750upx;
		margin-top: 50upx;
		background:#fff;
		.list{
			width:614upx;
			height:98upx;
			line-height:98upx;
			margin-left: 63upx;
			border-bottom: 2upx solid #f3f3f3;
			display: flex;
			justify-content: start;
			.img{
				width:35upx;
				height:31upx;
				margin-top: 35upx;
			}
			.vant-word{
				width:520upx;
				font-size:29upx;
				margin-left: 20upx;
			}
			.vant-icon{
				font-size:30upx;
			}
		}
		.prove-credit{
			.img{
				width:40upx;
				height:38upx;
				margin-top: 31upx;
			}
		}
	}
	.login-button{
		backgroud-color:none;
		border:none;
		height:41upx;
		margin-top:40upx;
		padding:0;
		line-height: 40rpx;
	}
	.button-hover{
		backgroud-color:none;
		border:none;
	}
	
	.vip-image{
		width: 100%;
		height: 100%;
		border-radius: 11upx;
	}
	.vip-endtime{
		position: absolute;
		top:6upx;
		right:10upx;
		font-size:22upx;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:31upx;
	}
	.vip-number{
		position: absolute;
		bottom:6upx;
		left:10upx;
		font-size:22upx;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:31upx;
	}
}
</style>
