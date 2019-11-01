<template>
	<view class="share-box">
		<image class="share-image" style="height:1201.9927upx;" src="https://cdn.doudouxiongglobal.com/store/vip/re1.png"></image>
		<image class="share-image" style="height:1835.1449upx;margin-top:-10upx;" src="https://cdn.doudouxiongglobal.com/store/vip/re-vip.png"/>
		<image class="share-button" @click="goRedPack" src="https://cdn.doudouxiongglobal.com/store/vip/re-acvt.png"/>
		<view class="user-box">
			<image class="user-avatar" :src="avatar"></image>
			<view class="user-phone">您的好友{{phone}}送您一份</view>
		</view>
		<view class="share-hint">50元会员红包</view>
	</view>
</template>

<script>
	import {decryptPhone,changePhone,payDetail,payVip,login,getVip,getUserByCode} from '../../api/index.js'
	export default {
		data() {
			return {
				bgc:"https://cdn.doudouxiongglobal.com/Default_image/78c34fe76e6c748a1b7f7b6a650a5e8.png",
				phone : '',
				redirect:'',
				vipSelected:0,
				agreementChecked:false,
				vip:0,
				question1:false,
				question2:false,
				avatar:''
			}
		},
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
			let userData = uni.getStorageSync('user_data')
			userData = JSON.parse(userData)
			let referrer = userData['SerialCode']
			return {
			  title: '【50元红包】加入会员，全年不限次数免费保养',
			  imageUrl:'https://cdn.doudouxiongglobal.com/pinxiang/image/share/lALPDgQ9rBP3f8PNAyDNA-g_1000_800.png_620x10000q90g.jpg',
			  path: '/pages/userSub/share?code='+referrer
			}
		},
		methods: {
			goRedPack(){
				let userData = uni.getStorageSync('user_data')
				if(userData === null || userData.length === 0){
					uni.navigateTo({
						url:"/pages/login/login?redirect=/pages/userSub/active"
					})
					return false;
				}
				uni.navigateTo({
					url:"/pages/userSub/active"
				})
			},
			
			
			// 跳转到会员协议
			agreement(){
				uni.navigateTo({
					url:"/pages/userSub/vipAgreement"
				})
			},
			selectVipCard(type){
				this.vipSelected = type
			},
			// 点击同意条款
			agreementRadio(){
				this.agreementChecked = true
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
						// that.avatar = res.Data.user.Avatar,
						// that.nickname = res.Data.user.Nickname,
						// that.phone = res.Data.user.Phone
						that.isLogin = 1
						// let userData = uni.getStorageSync('user_data')
						// console.log(userData)
						if(res.Data.user.Vip === 1){
							that.vip = 1
							getVip({}).then((res)=>{
								console.log(res)
								if(res.Code === 200){
									that.vipData = res.Data
								}
							})
						}
						
						if(that.redirect!=''){
							wx.navigateTo({
								url:that.redirect
							})
						}
						
					}
				})
				console.log(openID)
			},
		
		},
		onShow(){
			let userData = uni.getStorageSync('user_data')
			if(userData === null || userData.length === 0){
				return false;
			}
			
		},
		onLoad(options) {
			console.log(options.code)
			if(options.code!=undefined){
				uni.setStorageSync('ReferrerCode',options.code)
				var referrerCode = options.code
			}else{
				var referrerCode = uni.getStorageSync('ReferrerCode')
				if(referrerCode===null || referrerCode.length===0){
					uni.setStorageSync('ReferrerCode',0)
				}
			}
			let userData = uni.getStorageSync('user_data')
			if(userData === null || userData.length === 0){
				return false;
			}
			if(userData.length > 0){
				this.login({userInfo:{
					nickName: userData.Nickname,
					gender:userData.Sex,
					province:userData.Province,
					city:userData.City
				}})
			}
			let that = this
			if(referrerCode!==0){
				getUserByCode(referrerCode,{}).then(res=>{
					console.log(res)
					if(res.Code === 200){
						that.avatar = res.Data.Avatar
						that.phone = res.Data.Phone
					}
				})
			}
			
			// this.redirect = options.redirect
		}
	}
</script>

<style lang="scss" scoped>
.share-box{
	width: 100%;
	position:relative;
	.share-image{
		width: 100%;
	}
	.share-button{
		position:absolute;
		width: 335upx;
		height:335upx;
		top:680upx;
		margin-left:-167.5upx;
		left:50%;
		z-index:99;
		animation: heart-break 1s;
		-moz-animation: heart-break 1s;	/* Firefox */
		-webkit-animation: heart-break 1s;	/* Safari 和 Chrome */
		-o-animation: heart-break 1s;
		animation-iteration-count:infinite;
		-webkit-animation-iteration-count:infinite;
		
	}
	.user-box{
		width: 100%;
		position:absolute;
		text-align: center;
		z-index:100;
		top:370upx;
		.user-avatar{
			width: 100upx;
			height:100upx;
			border-radius: 100%;
		}
		.user-phone{
			font-size:29upx;
			font-weight:400;
			color:rgba(164,164,164,1);
			line-height:40upx;
		}
	}
	.share-hint{
		width: 100%;
		position:absolute;
		text-align: center;
		z-index:100;
		top:580upx;
		font-size:47upx;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:67upx;
	}
	
	@keyframes heart-break
	{
	0%   {
		width: 335upx;
		height:335upx;
		margin-top:0;
		margin-left:-167.5upx;
		}
	50% {
		width: 380upx;
		height:380upx;
		margin-top:-22.5upx;
		margin-left:-190upx;
		}
	100% {
		width: 335upx;
		height:335upx;
		margin-top:0;
		margin-left:-167.5upx;
		}
	}
	
	@-moz-keyframes heart-break
	{
	0%   {
		width: 335upx;
		height:335upx;
		margin-top:0;
		margin-left:-167.5upx;
		}
	50% {
		width: 380upx;
		height:380upx;
		margin-top:-22.5upx;
		margin-left:-190upx;
		}
	100% {
		width: 335upx;
		height:335upx;
		margin-top:0;
		margin-left:-167.5upx;
		}
	}
	
	@-webkit-keyframes heart-break
	{
	0%   {
		width: 335upx;
		height:335upx;
		margin-top:0;
		margin-left:-167.5upx;
		}
	50% {
		width: 380upx;
		height:380upx;
		margin-top:-22.5upx;
		margin-left:-190upx;
		}
	100% {
		width: 335upx;
		height:335upx;
		margin-top:0;
		margin-left:-167.5upx;
		}
	}
	
	@-o-keyframes heart-break
	{
	0%   {
		width: 335upx;
		height:335upx;
		margin-top:0;
		margin-left:-167.5upx;
		}
	50% {
		width: 380upx;
		height:380upx;
		margin-top:-22.5upx;
		margin-left:-190upx;
		}
	100% {
		width: 335upx;
		height:335upx;
		margin-top:0;
		margin-left:-167.5upx;
		}
	}
}
</style>