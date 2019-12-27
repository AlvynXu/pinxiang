<template>
	<view class="user-box">
		<view class="user-login" v-if="isLogin===0">
			<view class="login-white" @click="goLogin">
				<view class="vant-icon">&#xe691;</view>
				<view class="login">
					<button class="login-button" plain="true" lang="zh_CN">立即登录</button>
				</view>
			</view>
			<view class="user-join" @click="goActive">
				<view class="join-name">
					<view  class="join-name-icon">
						<view class="vant-icon">&#xe6b1;</view>
						<!-- <i class="van-icon van-icon-pinzhi"></i> -->
						<view>加入会员</view>
					</view>
				</view>
				<view class="join-word">会员养车·全年免费</view>
				<view class="join-words">品象会员单次洗车低至19元</view>
				<view class="join-buy">
					<view style="margin-left: 10upx;">已有{{count}}人购买</view>
					<view class="join-buy-icon">立即开通
						<view class="vant-icon">&#xe65c;</view>
					</view>
				</view>
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
					<view class="join-name">
						<view class="join-name-icon">
							<view class="vant-icon">&#xe6b1;</view>
							<view>加入会员</view>
						</view>
					</view>
					<view class="join-word">会员养车·全年免费</view>
					<view class="join-words">品象会员单次洗车低至19元</view>
					<view class="join-buy">
						<view style="margin-left: 10upx;">已有{{count}}人购买</view>
						<view class="join-buy-icon">立即开通
							<view class="vant-icon">&#xe65c;</view>
						</view>
					</view>
				</view>
				<view v-show="vip!=0">
					<view class="join-name">
						<view class="join-name-icon">
							<view class="vant-icon">&#xe6b1;</view>
							<!-- <i class="van-icon van-icon-pinzhi"></i> -->
							<view>品象会员</view>
						</view>
						<view class="join-date">{{vipData.EndDate}}到期</view>
					</view>
					<view class="join-nomber">{{vipData.VipNo}}</view>
					<view class="join-buy2">
						<view>{{vipData.VipName}}</view>
						<view class="join-buy-icon">
							<view>去续费</view>
							<view class="vant-icon">&#xe609;</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="user-join" @click="goActive">
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
			</view> -->
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
			<view class="prove-credit list" @click="goOrder">
				<image class="img" src="https://cdn.doudouxiongglobal.com/pinxiang/V1.2/book-01.png" mode="aspectFit"></image>
				<view class="vant-word">我的订单</view>
				<view class="vant-icon">&#xe609;</view>
			</view>
			<!-- <view class="prove-credit list" @click="goRetail">
				<image class="img" src="https://cdn.doudouxiongglobal.com/pinxiang/image/column/retail.png" mode="aspectFit"></image>
				<view class="vant-word">分销中心</view>
				<view class="vant-icon">&#xe609;</view>
			</view> -->
			
			<!-- <view class="prove-center list" @click="goGiftCard">
				<view class="vant-icon">&#xe6a4;</view>
				<view class="vant-word">赠卡中心</view>
				<view class="vant-icon">&#xe609;</view>
			</view> -->
			
			<view  class="prove-credit list" style="position: relative;">
				<button open-type="contact" plain="false" style="background: white;border:none;text-align: left;padding-left:0;padding-right:0;line-height: 98upx;margin-right:0;"><image class="img" src="https://cdn.doudouxiongglobal.com/pinxiang/image/column/contact01.png" mode="aspectFit"></image></button>
				<view class="vant-word"><button open-type="contact" plain="false" style="font-size:29upx;background: white;border:none;text-align: left;padding-left:0;line-height: 98upx;">联系客服</button></view>
				<view class="vant-icon"><button open-type="contact" plain="false" style="background: white;border:none;text-align: left;padding-left:0;padding-right:0;line-height: 98upx;margin-right:0;" class="vant-icon">&#xe609;</button></view>
			</view>
		</view>
		<view class="redpack-box" v-if="buiedVip">
			<view class="redpack-box-content">
				<view class="redpack-bg" @click="closeRedPack"></view>
				<view class="redpack">
					<view class="redpack-title">送你25元现金红包</view>
					<view class="redpack-hint">邀好友加入会员各得25元红包</view>
					<image class="redpack-image" mode="aspectFit" src="https://cdn.doudouxiongglobal.com/store/vip/buy_vip_re.png"></image>
					<button class="redpack-share" open-type="share">分享领现金红包</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {login,getVip,getVipCount} from '@/api/index.js'
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
				vipData:[],
				count:0,
				buiedVip:false
			}
		},
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
			let userData = uni.getStorageSync('user_data')
			userData = JSON.parse(userData)
			let referrer = userData['SerialCode']
			this.buiedVip = false
			return {
			  title: '加入会员，全年不限次数免费保养',
			  imageUrl:'https://cdn.doudouxiongglobal.com/v1.21/vipbg.png',
			  path: '/pages/index/index?code='+referrer
			}
		},
		methods: {
			closeRedPack(){
				this.buiedVip = false;
			},
			//打开弹出层
			goActive(){
				let userData = uni.getStorageSync('user_data')
				
				uni.navigateTo({
				    url: '/pages/userSub/active'
				});
			},
			goCar(){
				uni.navigateTo({
				    url: '/pages/userSub/car'
				});
			},
			goCredit(){
				uni.navigateTo({
				    url: '/pages/userSub/credit'
				});
			},
			goOrder(){
				uni.navigateTo({
					url:"/pages/order/order"
				})
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
					    url: '/pages/userSub/vip/vip'
					});
				}
			},
			goGiftCard(){
				uni.navigateTo({
				    url: '/pages/userSub/giftCard/giftCard'
				});
			},
			goRetail(){
				uni.navigateTo({
				    url: '/pages/retail/retail'
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
						getVip({}).then((res)=>{
							if(res.Code === 200){
								if(res.Data!==0){
									that.vip = 1;
									that.vipData = res.Data
								}
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
			},
			goLogin(){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}
		},
		async onShow() {
			let countData = await getVipCount()
			if(countData.Code === 200){
				this.count = countData.Data
			}
			let userData = uni.getStorageSync('user_data')
			let that = this
			if(userData.length > 0){
				userData = JSON.parse(userData)
				this.avatar = userData.Avatar,
				this.nickname = userData.Nickname,
				this.phone = userData.Phone
				this.isLogin = 1
				getVip({}).then((res)=>{
					console.log(res.Data.length)
					if(res.Code === 200){
						if(res.Data!==0){
							that.vip = 1;
							that.vipData = res.Data
						}
					}
				})
			}
		},
		async onLoad(options) {
			let countData = await getVipCount()
			if(countData.Code === 200){
				this.count = countData.Data
			}
			if(options.status=='buied'){
				this.buiedVip = true;
			}
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
			background:url("https://cdn.doudouxiongglobal.com/pinxiang/image/bg.png");
			background-size:100% 100%;
			border-radius:11upx;
			margin-left: 42upx;
			top:232upx;
			left:0;
			.join-name{
				font-size:29upx;
				margin: 25upx 20upx;
				color:#fff;
		        display: flex;
		        justify-content: space-between;
				align-items: center;
				.join-name-icon{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					.van-icon{
						font-size:40upx;
						margin-left:20upx;
						margin-right:0;
						color:#fff;
					}
				}
				.join-date{
					font-size:22upx;
				}
			}
			.join-nomber{
				font-size:43upx;
				font-weight: 500;
				color:#FCF5D4;
				margin-top:62upx;
				text-align: center;
			}
			.join-word{
				font-size:51upx;
				color:#FCF5D4;
				margin-top:42upx;
				text-align: center;
				font-weight:500;
			}
			.join-words{
				font-size:29upx;
				color:#fff;
				margin-top:9upx;
				color:#F7B500;
				text-align: center;
			}
			.join-buy{
				width:553upx;
				height:47upx;
				line-height:47upx;
				background:rgba(252,245,212,1);
				border-radius:5upx;
				opacity:0.8;
				margin:0 auto;
				font-size:29upx;
				color:#4B2A00;
				margin-top:25upx;
				display: flex;
				justify-content: space-between;
				text-align: center;
				.join-buy-icon{
					display: flex;
					justify-content: flex-start;
					.van-icon{
					  font-size:30upx;
					  margin-left:0;
					  margin-right:10upx;
					}
				}
			}
			.join-buy2{
				width:613upx;
				height:47upx;
				line-height:47upx;
				border-radius:5upx;
				opacity:0.8;
				margin-left:30upx;
				font-size:22upx;
				color:#4B2A00;
				margin-top:65upx;
				display: flex;
				justify-content: space-between;
				text-align: center;
				color:#fff;
				.join-buy-icon{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					.vant-icon{
						font-size: 24upx;
					}
				}
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
.redpack-box{
	position:absolute;
	top:0;left:0;
	width: 100vw;
	height:100vh;
	.redpack-box-content{
		width: 100%;
		height:100%;
		position:relative;
		.redpack-bg{
			position:absolute;
			width: 100%;
			height:100%;
			z-index:100;
			background:rgba(0,0,0,0.3);
		}
		.redpack{
			position: absolute;
			width:663upx;
			height:585upx;
			background:rgba(255,255,255,1);
			border-radius:14upx;
			z-index:101;
			top:50%;
			left:50%;
			margin-top:-292.5upx;
			margin-left:-331.5upx;
			.redpack-title{
				width: 100%;
				text-align: center;
				margin-top:47upx;
				font-size:38upx;
				font-weight:500;
				color:rgba(254,81,0,1);
				line-height:53upx;
				letter-spacing:5upx;
			}
			.redpack-hint{
				width: 100%;
				text-align: center;
				margin-top:9upx;
				font-size:22upx;
				font-weight:400;
				color:rgba(164,164,164,1);
				line-height:31upx;
			}
			.redpack-image{
				margin-left:168.5upx;
				width: 326upx;
				height:326upx;
				margin-top:-10upx;
				margin-bottom:-10upx;
			}
			.redpack-share{
				width:576upx;
				height:82upx;
				background:rgba(254,81,0,1);
				border-radius:41upx;
				color:white;
				font-size:33upx;
				font-weight:500;
				letter-spacing:5px;
			}
		}
	}
}
</style>
