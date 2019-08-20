<template>
	<view class="store-box">
		<view class="store-list">
			<image class="cover" :src="cover" mode="aspectFill"></image>
			<view class="store-area">
				<view class="vant-icon">&#xe66b;</view>
				<view class="area-name">{{area}}</view>
			</view>
			<view class="store-name">{{storeName}}</view>
			<view class="store-address">{{address}}
				<uni-rate value="2" size="12"></uni-rate>
			</view>
			<view class="store-tips">
				<view class="tips">
					<view class="tip">地铁周边</view>
					<view class="tip">地铁周边</view>
					<view class="tip">地铁周边</view>
				</view>
				<view class="store-buy">立即预约</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	export default {
		components: {uniRate},
		data() {
			return {
				cover:'https://cdn.doudouxiongglobal.com/Default_image/city/hangzhou.jpg',
				title: 'Hello',
				area:'下城区 · 钱江世纪城',
				storeName:'御驾汇汽车服务中心',
				address:'秋涛北路72号杭州大厦501负2楼',
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.store-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom:10upx;
		background:#fff;
		.store-list{
			position: relative;
			.cover {
				height: 457upx;
				width: 667upx;
				margin-top: 20upx;
				margin-left: auto;
				margin-right: auto;
			}
			
			.store-area{
				position: absolute;
				display: flex;
				justify-content: flex-start;
				font-size:25upx;
				top:410upx;
				left:20upx;
				.vant-icon{
					font-size:30upx;
				}
				.area-name{
					color:#fff;
				}
			}
			
			.store-name{
				font-size:36upx;
				margin-top: 24upx;
			}
			.store-address{
				font-size:29upx;
				color:#A4A4A4;
				margin-top:18upx;
				display: flex;
				justify-content: space-between;
				.uni-rate{
					margin-top:10upx;
				}
			}
			.store-tips{
				margin-top: 17upx;
				display: flex;
				justify-content:space-between;
				.tips{
					margin-top: 10upx;	
					display: flex;
					justify-content:flex-start;
					.tip{
						width:141upx;
						height:40upx;
						margin-right: 5upx;
						line-height: 40upx;
						text-align: center;
						color:#FE8C00;
						font-size: 25upx;
						border-radius:18px;
						border:2upx solid rgba(254,140,0,1);
					}
				}
				.store-buy{
					width:163upx;
					height:67upx;
					line-height: 67upx;
					background:rgba(254,81,0,1);
					border-radius:11upx;
					font-size:29upx;
					font-weight:500;
					color:#fff;
					text-align: center;
				}
			}
		}
	}
</style>
