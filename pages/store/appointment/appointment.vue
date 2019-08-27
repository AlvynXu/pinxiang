<template>
	<view class="appointment-box">
		<view  class="appointment-title">
			<view>预约信息</view>
		</view>
		<view class="appointment-content">
			<view class="appointment-content-left">手机号码：</view>
			<view class="appointment-content-right">15245758452</view>
		</view>
		<view class="appointment-content">
			<view class="appointment-content-left">预约时间：</view>
			<view class="appointment-content-right">{{orderTime}}</view>
		</view>
		<view  class="appointment-tip">
			*逾期未到门店体验将影响您的信用积分
		</view>
		<view class="appointment-button" @click="goCoupon">立即预约</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:"15978456985",
				orderTime:""
			};
		},
		onLoad() {
			const that = this;
			uni.getStorage({
			    key: 'orderTime',
			    success: function (res) {
					const orderTime = res.data;
					that.orderTime = orderTime;
			        console.log(res.data);
			        console.log(that.orderTime);
			    }
			});
			        console.log(that.orderTime);
		},
		methods:{
			goCoupon(){
				uni.navigateTo({
					url: '../coupon/coupon'
				})
			}
		},
		
	}
</script>

<style lang="scss" scoped>
.appointment-box{
	width:750upx;
	height:100vh;
	background:#f3f3f3;
	.appointment-title{
		width:750upx;
		padding-top:36upx;
		padding-left:40upx;
		color:#A4A4A4;
		font-size:29upx;
	}
	.appointment-content{
		width:750upx;
		height:87upx;
		line-height:87upx;
		margin-top:24upx;
		background: #fff;
		font-size:29upx;
		display: flex;
		justify-content: start;
		.appointment-content-left{
			padding-left:40upx;
		}
		.appointment-content-right{
			margin-left: 20upx;
		}
	}
	.appointment-button{
		width:665upx;
		height:87upx;
		line-height: 87upx;
		text-align: center;
		color:#fff;
		background:#FE5100;
		margin:78upx auto;
		border-radius:14upx;
		font-size:33upx;
	}
	.appointment-tip{
		width:750upx;
		padding-top:20upx;
		padding-left:40upx;
		color:#A4A4A4;
		font-size:25upx;
		color:#FE5100;
	}
}
</style>
