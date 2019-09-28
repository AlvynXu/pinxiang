<template>
	<view class="active-box">
		<view class="active-img-box">
			<img class="active-img" style="height:2438.4057upx;" src="https://cdn.doudouxiongglobal.com/store/vip/about-vip.png?201909072247"/>
			<view class="question-one-box">
				<view class="question-one" @click="question1Func"><text>我们如何去控制品质？</text><text class="vant-icon">&#xe6b4;</text></view>
				<view class="question-one-image-box" v-if="question1">
					<img class="question-one-image" style="height:2162.1376upx" src="https://cdn.doudouxiongglobal.com/store/vip/about-us-1.png.png"/>
					<img class="question-one-image" style="height:2483.6956upx;margin-top:-20upx;" src="https://cdn.doudouxiongglobal.com/store/vip/about-us-2.png"/>
				</view>
			</view>
			<view class="question-two-box">
				<view class="question-two" @click="question2Func"><text>您可能会遇到的问题</text><text class="vant-icon">&#xe6b4;</text></view>
				<view class="question-two-image-box" v-if="question2">
					<img class="question-two-image" style="height:1479.1666upx" src="https://cdn.doudouxiongglobal.com/store/vip/question1.png"/>
					<img class="question-two-image" style="height:1293.4782upx;margin-top:-10upx;" src="https://cdn.doudouxiongglobal.com/store/vip/question2.png"/>
				</view>
			</view>
			<img style="height:625upx;width: 100%;margin-top:11upx;" src="https://cdn.doudouxiongglobal.com/store/vip/tip.png"/>
		</view>
		<view class="active-join">
			<view class="active-join-top">
				<view class="active-join-price" :class="{'selected':vipSelected==0}" @click="selectVipCard(0)">
					全合成机油 <text class="active-amount">799</text>元/年
					<view v-if="vipSelected==0" class="selected-icon vant-icon">&#xe6b2;</view>
				</view>
				<view class="active-join-price2" :class="{'selected':vipSelected==1}" @click="selectVipCard(1)">
					半合成机油 <text class="active-amount">599</text>元/年
					<view v-if="vipSelected==1" class="selected-icon vant-icon">&#xe6b2;</view>
				</view>
			</view>
			<view class="active-join-agree">
				<view class="agree-box" @click="agreementRadio">
					<radio class="agree-check" :checked="agreementChecked" color="#FE5100"></radio>
					<text>开通会员即表示同意</text>
					<text class="agree-color" @click="agreement">《会员协议》</text>
					<text style="color:#A4A4A4">&nbsp;&nbsp;营运车辆暂不可用</text>
				</view>
			</view>
			<button v-if="phone==''" class="active-join-button" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
				立即开通，每年至少节省1000元
			</button>
			<button v-if="phone!=''" class="active-join-button" @click="buyVIP">
				立即开通，每年至少节省1000元
			</button>
		</view>
	</view>
</template>

<script>
	import {decryptPhone,changePhone,payDetail,payVip,login,getVip} from '../../api/index.js'
	export default {
		data() {
			return {
				bgc:"https://cdn.doudouxiongglobal.com/Default_image/78c34fe76e6c748a1b7f7b6a650a5e8.png",
				phone : '',
				redirect:'',
				vipSelected:0,
				agreementChecked:true,
				vip:0,
				question1:false,
				question2:false,
				type:''
			}
		},
		methods: {
			question1Func(){
				this.question1 = this.question1 ? false : true
			},
			question2Func(){
				this.question2 = this.question2 ? false : true
			},
			getPhoneNumber(e){
				let that = this
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
				if(e.detail.errMsg === 'getPhoneNumber:ok'){
					let wxOpenID = uni.getStorageSync('wxOpenID')
					decryptPhone({'OpenID':wxOpenID,'Encrypt':e.detail.encryptedData,'IV':e.detail.iv}).then(res => {
						if(res.Code === 200){
							that.phone = res.Data.Phone
							changePhone({Phone:res.Data.Phone}).then(response =>{
								if(response.Code === 200){
									let userData = uni.getStorageSync('user_data')
									userData = JSON.parse(userData)
									userData['Phone'] = res.Data.Phone
									uni.setStorageSync('user_data',JSON.stringify(userData))
									that.buyVIP()
								}
							})
						}
					})
				}
			},
			async buyVIP(){
				let that = this
				if(this.agreementChecked==false){
					wx.showToast({
						title:"请先阅读会员协议"
					})
					return false
				}
				
				let detail =  await payDetail({
					OpenID: uni.getStorageSync('wxOpenID'),
					VipType : this.vipSelected,
					Type : this.type
				})
				if(detail.Code === 200){
					uni.requestPayment({
					    provider: 'wxpay',
					    timeStamp: detail.Data.timestamp.toString(),
					    nonceStr: detail.Data.nonce_str,
					    package: `prepay_id=${detail.Data.prepay_id}`,
					    signType: 'MD5',
					    paySign: detail.Data.sign,
					    success: function (res) {
					        console.log('success:' + JSON.stringify(res));
							if(res.errMsg=='requestPayment:ok'){
								payVip({OrderNo:detail.Data.order_number,VipType:that.vipSelected,o2w:uni.getStorageSync('ReferrerCode')}).then(response=>{
									if(response.Code === 200){
										let userData = uni.getStorageSync('user_data')
										userData = JSON.parse(userData)
										userData.Vip = 1
										uni.setStorageSync('user_data',JSON.stringify(userData))
										wx.showToast({
											title:"购买成功",
											success() {
												wx.switchTab({
													url:'/pages/user/user?status=buied'
												})
											}
										})
	
									}
								})
							}else{
								wx.showToast({
									title:"支付失败",
									icon:"none"
								})
							}
					    },
					    fail: function (err) {
					        console.log('fail:' + JSON.stringify(err));
					    }
					});
				}
				
			},
			// 跳转到会员协议
			agreement(){
				uni.navigateTo({
					url:"/pages/user/vipAgreement"
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
						that.avatar = res.Data.user.Avatar,
						that.nickname = res.Data.user.Nickname,
						that.phone = res.Data.user.Phone
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
		
		},
		onShow(){
			let userData = uni.getStorageSync('user_data')
			if(userData === null || userData.length === 0){
				return false;
			}
			userData = JSON.parse(userData)
			console.log(userData)
			if(userData['Phone'] !== ''){
				this.phone = userData['Phone']
			}
		},
		onLoad(options) {
			console.log(options.code)
			if(options.code!=undefined){
				uni.setStorageSync('ReferrerCode',options.code)
			}else{
				let referrerCode = uni.getStorageSync('ReferrerCode')
				if(referrerCode===null || referrerCode.length===0){
					uni.setStorageSync('ReferrerCode',0)
				}
			}
			if(options.type!=undefined){
				this.type = options.type
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
			// this.redirect = options.redirect
		}
	}
</script>

<style lang="scss" scoped>
.active-box{
	width:750upx;
	.active-img-box{
		width:750upx;
		background:#F3F3F3;
		padding-bottom:270upx;
		.question-one-box{
			margin:0;
			margin-top:11upx;
			.question-one{
				width: 684upx;
				padding:34upx 33upx;
				justify-content: space-between;
				background:white;
				display:inline-flex;
				font-size:29upx;
				font-weight:400;
				color:rgba(254,81,0,1);
				line-height:40upx;
			}
			.question-one-image-box{
				width: 100%;
				.question-one-image{
					width: 100%;
				}
			}
		}
		.question-two-box{
			margin:0;
			margin-top:11upx;
			.question-two{
				width: 684upx;
				padding:34upx 33upx;
				justify-content: space-between;
				background:white;
				display:inline-flex;
				font-size:29upx;
				font-weight:400;
				color:rgba(254,81,0,1);
				line-height:40upx;
			}
			.question-two-image-box{
				width: 100%;
				.question-two-image{
					width: 100%;
				}
			}
		}
		.active-img{
			width:750upx;
		}
	}
	.active-join{
		position: fixed;
		bottom:0;
		left:0;
		z-index:2;
		width:750upx;
		height:269upx;
		background: #fff;
		.active-join-top{
			display: flex;
			justify-content:space-around;
			margin-top:16upx;
			.active-join-price{
				width:344upx;
				height:91upx;
				line-height: 91upx;
				// background:rgba(254,81,0,0.15);
				text-align: center;
				border-radius:14upx;
				border:4upx solid rgba(254,81,0,1);
				font-size:25upx;
				font-size:27upx;
				font-weight:500;
				color:rgba(254,81,0,1);
				overflow: hidden;
				position:relative;
				.active-amount{
					margin-left:10upx;
					font-size:36upx;
				}
				.selected-icon{
					position:absolute;
					top:-30upx;left:-2upx;
					font-size:36upx;
				}
			}
			.active-join-price2{
				width:344upx;
				height:91upx;
				line-height: 91upx;
				// background:rgba(254,81,0,0.15);
				text-align: center;
				border-radius:14upx;
				border:4upx solid rgba(254,81,0,1);
				font-size:27upx;
				font-weight:500;
				color:rgba(254,81,0,1);
				position:relative;
				.active-amount{
					margin-left:10upx;
					font-size:36upx;
				}
				.selected-icon{
					position:absolute;
					top:-30upx;left:-2upx;
					font-size:36upx;
				}
			}
			
		}
		.active-join-tip{
			display: flex;
			justify-content: flex-start;
			width:668upx;
			margin:20upx auto 10upx auto;
			.tip-left{
				width:18upx;
				height:18upx;
				border-radius: 18upx;
				background: #FE5100;
				margin-top: 7upx;
			}
			.tip-right{
				height:31upx;
				font-size:22upx;
				color:#FE5100;
				line-height:31upx;
				margin-left: 7upx;
			}
		}
		.active-join-agree{
			font-size:22upx;
			.agree-box{
				height:55upx;
				line-height:55upx;
				text-align: center;
			}
			.agree-check{
				transform:scale(0.5);
			}
			.agree-color{
				color:#FE5100;
			}
		}
		.active-join-button{
			width:699upx;
			height:78upx;
			background:rgba(254,81,0,1);
			border-radius:39upx;
			font-size:33upx;
			font-weight:500;
			color:rgba(255,255,255,1);
			line-height:78upx;
		}
	}
	.selected{
		background:rgba(254,81,0,0.2) !important;
	}
	.active-content-box{
		width: 90%;
		margin:0 auto;
		color:rgb(81, 81, 81);
		margin-top:50upx;
		margin-bottom: 60upx;
		.active-title{
			font-size: 30upx;
			color: rgb(254, 81, 0);
			margin-bottom:10upx;
		}
		.active-content{
			font-size: 28upx;
			line-height: 40upx;
			white-space: 10upx;
			color:rgb(81, 81, 81);
			.br{
				margin-top:30upx;
			}
			p{
				margin-bottom:10upx;
				color:rgb(81, 81, 81);
				text{
					color: rgb(254, 81, 0);
				}
			}
		}
	}
}
</style>