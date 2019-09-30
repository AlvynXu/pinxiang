<template>
	<view class="exchange-box">
		<view class="white">
			<view class="box-title">请输入兑换码</view>
			<input class="box-input" focus/>
		</view>
		<view class="box-button">立即兑换</view>
		
		<view class="active-join-agree">
			<view class="agree-box" @click="agreementRadio">
				<radio class="agree-check" :checked="agreementChecked" color="#FE5100"></radio>
				<text>兑换会员即表示同意</text>
				<text class="agree-color" @click="agreement">《会员协议》</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				agreementChecked:true,
			}
		},
		methods: {
			// 点击同意条款
			agreementRadio(){
				this.agreementChecked = true
			},
			// 跳转到会员协议
			agreement(){
				uni.navigateTo({
					url:"/pages/user/vipAgreement"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.exchange-box{
	width:750upx;
	height:100vh;
	background: #F3F3F3;
	.white{
		width:750upx;
		height:230upx;
		background: #fff;
		.box-title{
			font-size:29upx;
			font-weight:500;
			color:rgba(51,51,51,1);
			margin-left:38upx;
			margin-top: 33upx;
		}
		.box-input{
			width:627upx;
			height:62upx;
			margin: 33upx auto;
			padding:10upx 20upx;
			border-radius:2px;
			border:1upx solid rgba(164,164,164,1);
		}
	}
	.box-button{
		width:750upx;
		height:107upx;
		line-height: 107upx;
		background:rgba(254,81,0,1);
		text-align:center;
		color:#fff;
		margin-top: 38upx;
	}	
	
	.active-join-agree{
		font-size:22upx;
		margin-top:53upx;
		.agree-box{
			height:55upx;
			line-height:55upx;
		}
		.agree-check{
			transform:scale(0.5);
			margin-left: 38upx;
		}
		.agree-color{
			color:#FE5100;
		}
	}
	
}
</style>
