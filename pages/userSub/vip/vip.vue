<template>
	<view class="vip-box">
		<view class="vip-user" v-if="isLogin===0">
			<view class="login-white">
				<view class="vant-icon">&#xe691;</view>
				<view class="login-msg">
					<view class="vip">{{nickname}}</view>
					<view class="phone" v-if="phone">{{phone}}</view>
				</view>
			</view>
		</view>
		<view class="vip-user" v-if="isLogin===1">
			<view class="login-white">
				<image class="login-avatar" :src="avatar" mode="aspectFill"></image>
				<view class="login-msg">
					<view class="vip">{{nickname}}</view>
					<view class="phone" v-if="phone">{{phone}}</view>
				</view>
			</view>
		</view>
		<view class="vip-card">
			<swiper class="swiper" previous-margin='60rpx' next-margin='60rpx' :circular="true" @change='changSwiper'>
				<swiper-item class="swiper-card" v-for="(val,key) in VipData" :key="key">
					<view class="swiper-card-item">
						<view class="swiper-card-item-top">
							<view class="swiper-card-item-top-left"><text class="vant-icon">&#xe6b1;</text>品象会员</view>
							<view class="swiper-card-item-top-right" v-if="val.IsBuy!=0">{{val.EndDate}}到期</view>
						</view>
						<view class="swiper-card-item-numb">{{val.VipNo}}</view>
						<view class="swiper-card-item-bot">{{val.VipName}}</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="vip-lists">
			<view class="vip-tips" @click="goActive">
				{{VipData[current].EndDate}}到期 品质养车，就在品象会员养车 VIP<text>续费</text><text>升级</text>>
			</view>
			<view class="vip-tips" @click="goActive">
				品质养车，就在品象会员养车 VIP续费>
			</view>
			<view class="vip-list" v-for="(val,key) in vipList" :key="key">
				<view class="vip-icon">
					<view class="vant-icon" v-if="val.name==='保养'">&#xe67b;</view>
					<view class="vant-icon" v-if="val.name==='洗车'">&#xe6b0;</view>
				</view>
				<view class="vip-content">
					<view class="vip-content-time">
						<view class="vip-content-time-left">
							上次{{val.name}}时间：
						</view>
						<view class="vip-content-time-right">
							{{val.time}}
						</view>
					</view>
					<view class="vip-content-km" v-if="val.name==='保养'">
						<view class="vip-content-time-left">
							上次{{val.name}}里程：
						</view>
						<view class="vip-content-time-right">
							{{val.distance}}
						</view>
					</view>
					<view class="vip-content-km" v-if="val.name==='洗车'">
						<view class="vip-content-time-left">
							免费{{val.name}}剩余：
						</view>
						<view class="vip-content-time-right">
							{{val.total}}次
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="vip-help" @click="goHelp">
			<view class="vip-help-icon">
				<view class="vant-icon">&#xe688;</view>
			</view>
			<view class="vip-help-content">
				会员帮助中心
			</view>
			<view class="vant-icon">&#xe609;</view>
		</view>
	</view>
</template>

<script>
	import {
		login,
		getVip,
		vipBenefits
	} from '@/api/index.js'
	export default {
		data() {
			return {
				isLogin: 0,
				avatar: "https://cdn.doudouxiongglobal.com/Default_image/%20default_head_01.png",
				nickname: '优象会员',
				phone: '',
				vipList: [],
				VipData:{},
				endDate: '',
				current:0 //swiper开始显示第几张
			};
		},
		async onLoad(options) {
			let userData = uni.getStorageSync('user_data')
			let that = this

			if (userData.length > 0) {
				userData = JSON.parse(userData)
				this.avatar = userData.Avatar,
					this.nickname = userData.Nickname,
					this.phone = userData.Phone
				this.isLogin = 1
				if (userData.Vip === 1) this.vip = 1
				getVip({}).then((res) => {
					if (res.Code === 200) {
						let lastDate = res.Data.EndDate
						that.endDate = lastDate.substring(0, 4) + '-' + lastDate.substring(5, 7) + '-' + lastDate.substring(8, 10)
					}
				})
			}
			this.redirect = getApp().globalData.redirect
			let benefits = await vipBenefits({})
			if (benefits.Code == 200) {
				this.VipData = benefits.Data.VipData;
				console.log(this.VipData)
				this.vipList = [{
						name: "保养",
						time: benefits.Data.Detail.Care.LastDate == '' ? '-' : benefits.Data.Detail.Care.LastDate,
						distance: benefits.Data.Detail.Care.Km
					},
					{
						name: "洗车",
						time: benefits.Data.Detail.Wash.LastDatess == '' ? '-' : benefits.Data.Detail.Wash.LastDate,
						total: benefits.Data.Detail.Wash.times
					},
				]
			}
		},
		methods: {
			changSwiper(e){
				console.log(e)
			},
			goActive() {
				let userData = uni.getStorageSync('user_data')
				uni.navigateTo({
					url: '../active'
				});
			},
			goHelp() {
				uni.navigateTo({
					url: "/pages/user/vip/help"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.vip-box {
		width: 750upx;
		height: 100vh;
		background: #F3F3F3;

		.vip-user {
			width: 750upx;
			height: 187upx;

			.login-white {
				padding-top: 33upx;
				width: 750upx;
				padding-left: 42upx;
				height: 154upx;
				background: #fff;
				display: flex;
				justify-content: start;

				.vant-icon {
					font-size: 100upx;
					margin-left: 20upx;
					margin-right: 0;
					margin-top: 10upx;
					color: #A4A4A4;
				}

				.login-avatar {
					width: 121upx;
					height: 121upx;
					border-radius: 121upx;
				}

				.login {
					font-size: 33upx;
					height: 121upx;
					line-height: 121upx;
					margin-left: 51upx;
				}

				.login-msg {
					height: 121upx;
					margin-left: 51upx;
					margin-top: 20upx;

					.vip {
						font-size: 33upx;
					}

					.phone {
						font-size: 29upx;
						margin-top: 10upx;
					}
				}
			}
		}

		.vip-card {
			height: 366upx;
			background-color: #F3F3F3;
			padding-top: 30upx;

			.swiper {
				height: 366upx;

				.swiper-card {
					width: 606upx;
					height: 366upx;
					padding-right: 30upx;

					.swiper-card-item {
						position: relative;
						width: 100%;
						height: 284upx;
						background: url("https://cdn.doudouxiongglobal.com/pinxiang/image/bg.png");
						background-size: 100% 100%;
						border-radius: 11upx;
						color: #FFFFFF;

						.swiper-card-item-top {
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding: 24upx;

							.swiper-card-item-top-left {
								font-size: 29upx;
								display: flex;
								justify-content: flex-start;
								align-items: center;
							}

							.swiper-card-item-top-right {
								font-size: 22upx;
							}
						}

						.swiper-card-item-numb {
							display: flex;
							justify-content: center;
							height: 140upx;
							align-items: center;
							font-size: 40upx;
							font-weight: 500;
						}

						.swiper-card-item-bot {
							padding: 14upx 24upx;
							font-size: 22upx;
						}
					}
				}
			}
		}

		.vip-lists {
			margin-top: 10upx;
			background: #fff;
			position: relative;

			.vip-tips {
				position: absolute;
				top: -50upx;
				left: 62upx;
				width: 629upx;
				height: 50upx;
				line-height: 50upx;
				text-align: center;
				background: linear-gradient(90deg, rgba(254, 81, 0, 1) 0%, rgba(254, 140, 0, 1) 100%);
				border-radius: 14upx 14upx 0upx 0upx;
				color: #fff;
				font-size: 24upx;
			}

			.vip-list {
				width: 621upx;
				display: flex;
				justify-content: start;
				padding: 51upx 0;
				margin-left: 62upx;
				border-bottom: 2upx solid #f3f3f3;

				.vip-icon {
					.vant-icon {
						color: #FE5100;
						font-size: 60upx;
					}
				}

				.vip-content {
					font-size: 25upx;

					.vip-content-time {
						margin-left: 24upx;
						display: flex;
						justify-content: start;
					}

					.vip-content-km {
						margin-left: 24upx;
						display: flex;
						justify-content: start;
					}
				}
			}
		}

		.vip-help {
			width: 750px;
			height: 74upx;
			line-height: 74upx;
			display: flex;
			justify-content: start;
			padding: 0 62upx;
			background: #fff;
			margin-top: 20upx;

			.vip-help-icon {
				.vant-icon {
					color: #FE5100;
					font-size: 60upx;
				}
			}

			.vip-help-content {
				width: 460upx;
				margin-left: 24upx;
				font-size: 25upx;
			}

			.vant-icon {
				font-size: 25upx;
			}
		}
	}
</style>
