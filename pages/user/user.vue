<template>
	<view class="user-box">
		<view class="user-login" v-if="isLogin===0">
			<view class="login-white">
				<image class="login-avatar" :src="avatar" mode="aspectFill"></image>
				<view class="login">立即登录</view>
			</view>
			<view class="user-join">
				<view class="join-name">加入会员</view>
				<view class="join-word">尊享全年免费保养特权</view>
				<view class="join-button">立即领取特权</view>
			</view>
		</view>
		<view class="user-login" v-if="isLogin===1">
			<view class="login-white">
				<image class="login-avatar" :src="avatar" mode="aspectFill"></image>
				<view class="login-msg">
					<view class="vip">优象会员</view>
					<view class="phone">152****4163</view>
				</view>
			</view>
			<view class="user-join">
				<view class="join-name">加入会员</view>
				<view class="join-word">尊享全年免费保养特权</view>
				<view class="join-button">立即领取特权</view>
			</view>
		</view>
		<view class="user-prove">
			<view class="prove-car list" @click="goCar">
				<view class="vant-icon">&#xe6a4;</view>
				<view class="vant-word">车辆认证</view>
				<view class="vant-icon">&#xe659;</view>
			</view>
			<view class="prove-vip list">
				<view class="vant-icon">&#xe6a4;</view>
				<view class="vant-word">我的会员</view>
				<view class="vant-icon">&#xe659;</view>
			</view>
			<view class="prove-credit list" @click="goCredit">
				<view class="vant-icon">&#xe6a4;</view>
				<view class="vant-word">优象信用</view>
				<view class="vant-icon">&#xe659;</view>
			</view>
			<view class="prove-center list">
				<view class="vant-icon">&#xe6a4;</view>
				<view class="vant-word">赠卡中心</view>
				<view class="vant-icon">&#xe659;</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin:1,
				avatar:"https://cdn.doudouxiongglobal.com/Default_image/%20default_head_09.png"
			}
		},
		methods: {
			goCar(){
				uni.navigateTo({
				    url: 'car'
				});
			},
			goCredit(){
				uni.navigateTo({
				    url: 'credit'
				});
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
			width:750upx;
			padding-left:27upx;
			height:303upx;
			background: #fff;
			display: flex;
			justify-content:start;
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
				margin-top:14upx;
				margin-left:51upx;
				.vip{
					font-size:33upx;
				}
				.phone{
					font-size:29upx;
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
			.vant-icon{
				font-size:30upx;
				margin-top: 3upx;
			}
			.vant-word{
				width:520upx;
				font-size:29upx;
			}
		}
	}
}
</style>
