<template>
	<view class="pay-box">
		<view class="pay-top">
			<view class="pay-top-icon">
				<view class="vant-icon">&#xe690;</view>
				<view class="vant-icon">&#xe698;</view>
				<view class="vant-icon">&#xe695;</view>
				<view class="vant-icon">&#xe698;</view>
				<view class="vant-icon">&#xe696;</view>
				<view class="vant-icon">&#xe698;</view>
				<view class="vant-icon">&#xe697;</view>
			</view>
			<view class="pay-top-word">
				<view>购买赠卡</view>
				<view>支付费用</view>
				<view>获取兑换码</view>
				<view>赠送好友</view>
			</view>
		</view>
		<view class="active-join">
			<view class="active-join-price">
				<view class="active-join-price-left">
					品象365天会员
				</view>
				<view class="active-join-price-right">
					<view>888</view>元
				</view>
			</view>
			<view class="active-join-button">
				加入会员，免费保养
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.pay-box{
	width:750upx;
	background:#f3f3f3;
	.pay-top{
		background:#fff;
		padding-bottom:20upx;
		.pay-top-icon{
			display: flex;
			justify-content: space-between;
			width:667upx;
			margin:0 auto;
			.vant-icon:first-child{
				font-size:80upx;
				margin-top:0upx;
				margin-right: 0;
			}
			.vant-icon{
				color:#FE5100;
				font-size:60upx;
				margin-top:15upx;
			}
		}
		.pay-top-word{
			display: flex;
			justify-content: space-between;
			width:667upx;
			margin:0 auto;
			font-size:27upx;
			color:#FE5100;
		}
	}
	.active-join{
		width:750upx;
		height:283upx;
		background: #fff;
		margin-top:10upx;
		padding-top:49upx;
		.active-join-price{
			width:668upx;
			height:76upx;
			line-height: 76upx;
			margin:0 auto;
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
		.active-join-button{
			width:668upx;
			height:89upx;
			margin:31upx auto;
			background:#FE5100;
			border-radius:44upx;
			font-size:29upx;
			color:#fff;
			line-height:89upx;
			letter-spacing:5upx;
			text-align: center;
		}
	}
	
}	
</style>
