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
			<view class="vip-tips">
				2019.12.31到期  品质养车，就在品象会员养车 VIP续费>
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
			<view class="vip-tips">
				2019.12.31到期  品质养车，就在品象会员养车 VIP续费>
			</view>
		</view>
		<view class="vip-lists">
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
							{{val.distance}}公里
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
		<view class="vip-help">
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
	import {login,getVip} from '@/api/index.js'
	export default {
		data() {
			return {
				isLogin:0,
				avatar:"https://cdn.doudouxiongglobal.com/Default_image/%20default_head_01.png",
				nickname:'优象会员',
				phone:'18735166097',
				vipList:[
					{
						name:"保养",
						time:"2019-04-23",
						distance:"1300"
					},
					{
						name:"洗车",
						time:"2019-04-23",
						total:10
					},
				]
			};
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
.vip-box{
	width:750upx;
	height:100vh;
	background:#F3F3F3;
	.vip-user{
		width:750upx;
		height:268upx;
		position: relative;
		.login-white{
			padding-top:33upx;
			width:750upx;
			padding-left:42upx;
			height:235upx;
			background: #fff;
			display: flex;
			justify-content:start;
			.vant-icon{
				font-size:100upx;
				margin-left:20upx;
				margin-right:0;
				margin-top:10upx;
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
				height:121upx;
				margin-left:51upx;
				margin-top:	20upx;
				.vip{
					font-size:33upx;
				}
				.phone{
					font-size:29upx;
					margin-top:	10upx;
				}
			}
		}
		.vip-tips{
			position: absolute;
			top:228upx;
			left:62upx;
			width:629upx;
			height:50upx;
			line-height:50upx;
			text-align: center;
			background:linear-gradient(90deg,rgba(254,81,0,1) 0%,rgba(254,140,0,1) 100%);
			border-radius:14upx 14upx 0upx 14upx;
			color:#fff;
			font-size:24upx;
		}
	}
	.vip-lists{
		margin-top:10upx;
		background:#fff;
		.vip-list{
			width:621upx;
			display: flex;
			justify-content:start;
			padding:51upx 0;
			margin-left:62upx;
			border-bottom:2upx solid #f3f3f3;
			.vip-icon{
				.vant-icon{
					color:#FE5100;
					font-size: 60upx;
				}
			}
			.vip-content{
				font-size:25upx;
				.vip-content-time{
					margin-left:24upx;
					display: flex;
					justify-content:start;
				}
				.vip-content-km{
					margin-left:24upx;
					display: flex;
					justify-content:start;
				}
			}
		}
	}
	.vip-help{
		width:750px;
		height:74upx;
		line-height:74upx;
		display: flex;
		justify-content:start;
		padding:0 62upx;
		background:#fff;
		margin-top: 20upx;
		.vip-help-icon{
			.vant-icon{
				color:#FE5100;
				font-size: 60upx;
			}
		}
		.vip-help-content{
			width:460upx;
			margin-left:24upx;
			font-size:25upx;	
		}
		.vant-icon{
			font-size: 25upx;
		}
	}
}
</style>
