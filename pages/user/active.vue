<template>
	<view class="active-box">
		<view class="active-img-box">
			<image class="active-img" :src="bgc" mode="aspectFill"></image>
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
	export default {
		data() {
			return {
				bgc:"https://cdn.doudouxiongglobal.com/a.jpg"
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.active-box{
	width:750upx;
	.active-img-box{
		width:750upx;
		height:1232upx;
		.active-img{
			width:750upx;
			height:1232upx;
		}
	}
	.active-join{
		width:750upx;
		height:283upx;
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
