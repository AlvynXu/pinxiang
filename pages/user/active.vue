<template>
	<view class="active-box">
		<view class="active-img-box">
			<img class="active-img" style="height:700.4623upx;margin-top: -5px;" src="https://cdn.doudouxiongglobal.com/pinxiang/imagevip-01.png"/>
			<img class="active-img" style="height:992.7345upx;margin-top: -5px;" src="https://cdn.doudouxiongglobal.com/pinxiang/imagevip-02.png"/>
			<img class="active-img" style="height:710.3698upx;margin-top: -5px;" src="https://cdn.doudouxiongglobal.com/pinxiang/imagevip-03.png"/>
			<img class="active-img" style="height:1151.2549upx;margin-top: -5px;" src="https://cdn.doudouxiongglobal.com/pinxiang/imagevip-04.png"/>
			<img class="active-img" style="height:503.3025upx;margin-top: -5px;" src="https://cdn.doudouxiongglobal.com/pinxiang/imagevip-05.png"/>
		</view>
		<view class="active-join">
			<view class="active-join-price" :class="{'selected':vipSelected==0}" @click="selectVipCard(0)">
				<view class="active-join-price-left">
					品象365天会员-全合成机油版
				</view>
				<view class="active-join-price-right">
					<view>599</view>元
				</view>
			</view>
			<view class="active-join-price2" :class="{'selected':vipSelected==1}" @click="selectVipCard(1)">
				<view class="active-join-price-left">
					品象365天会员-半合成机油版
				</view>
				<view class="active-join-price-right">
					<view>399</view>元
				</view>
			</view>
			<view class="active-join-tip">
				<view class="tip-left">
					
				</view>
				<view class="tip-right">
					营运车辆暂时未开通服务，请勿购买！
				</view>
			</view>
			<view class="active-join-agree">
				<view class="agree-box" @click="agreementRadio">
					<radio class="agree-check" :checked="agreementChecked" color="#FE5100"></radio>
					<text>开通会员需同意</text>
					<text class="agree-color" @click="agreement">《会员协议》</text>
				</view>
			</view>
			<button v-if="phone==''" class="active-join-button" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
				加入会员，免费保养
			</button>
			<button v-if="phone!=''" class="active-join-button" @click="buyVIP">
				加入会员，免费保养
			</button>
		</view>
	</view>
</template>

<script>
	import {decryptPhone,changePhone,payDetail,payVip} from '../../api/index.js'
	export default {
		data() {
			return {
				bgc:"https://cdn.doudouxiongglobal.com/Default_image/78c34fe76e6c748a1b7f7b6a650a5e8.png",
				phone : '',
				redirect:'',
				vipSelected:0,
				agreementChecked:false,
				vip:0
			}
		},
		methods: {
			getPhoneNumber(e){
				let that = this
				let userData = uni.getStorageSync('user_data')
				if(userData === null || userData.length === 0){
					wx.showModal({
						title:"提示",
						content:"未登录，请前往登录",
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
					VipType : this.vipSelected
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
								payVip({OrderNo:detail.Data.order_number,VipType:that.vipSelected}).then(response=>{
									if(response.Code === 200){
										let userData = uni.getStorageSync('user_data')
										userData = JSON.parse(userData)
										userData.Vip = 1
										uni.setStorageSync('user_data',JSON.stringify(userData))
										wx.showToast({
											title:"购买成功",
											success() {
												wx.redirectTo({
													url:'/pages/user/vip/vip'
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
			}
		
		},
		onLoad(options) {
			let userData = uni.getStorageSync('user_data')
			if(userData === null || userData.length === 0){
				return false;
			}
			userData = JSON.parse(userData)
			if(userData['Phone'] !== ''){
				this.phone = userData['Phone']
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
		margin-bottom:533upx;
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
		height:533upx;
		background: #fff;
		.active-join-price{
			width:668upx;
			height:76upx;
			line-height: 76upx;
			margin:42upx auto 20upx auto;
			background:rgba(254,81,0,0.15);
			border-radius:7upx;
			display: flex;
			justify-content: space-between;
			font-size:29upx;
			.active-join-price-left{
				margin-left: 42upx;
			}
			.active-join-price-right{
				margin-right: 62upx;
				display: flex;
				justify-content: space-between;
				view{
					color:#FE5100;
				}
			}
		}
		.active-join-price2{
			width:668upx;
			height:76upx;
			line-height: 76upx;
			margin:32upx auto 20upx auto;
			background:rgba(254,81,0,0.15);
			border-radius:7upx;
			display: flex;
			justify-content: space-between;
			font-size:29upx;
			.active-join-price-left{
				margin-left: 42upx;
			}
			.active-join-price-right{
				margin-right: 62upx;
				display: flex;
				justify-content: space-between;
				view{
					color:#FE5100;
				}
			}
		}
		.active-join-tip{
			display: flex;
			justify-content: flex-start;
			width:668upx;
			height:46upx;
			line-height: 46upx;
			margin:12upx auto 20upx auto;
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
			width:668upx;
			height:89upx;
			margin:31upx auto;
			background:#FE5100;
			border-radius:11upx;
			font-size:29upx;
			color:#fff;
			line-height:89upx;
			letter-spacing:5upx;
			text-align: center;
		}
	}
	.selected{
		background:rgba(254,81,0,0.5) !important;
	}
}
</style>