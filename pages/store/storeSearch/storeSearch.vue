<template>
	<view class="store-box">
		<view class="store-search">
			<view class="vant-icon">&#xe692;</view>
			<input class="uni-input" confirm-type="search" :value="searchText" placeholder="输入门店信息" placeholder-style="color:rgba(51,51,51,0.5)"/>
		</view>
		<view class="gray"></view>
		<!-- 输入框有字之后出现 -->
		<view class="store-nearby" v-if="searchText!=''">
			<view class="nearby-top">
				附近商户
			</view>
			<view class="nearby-bot">
				平安出行，优享生活
			</view>
		</view>
		<view class="gray"></view>

		<view v-for="(val,key) in storeList" :key="key">
			<view class="store-list" @click="goStore(val.ID)">
				<image class="cover" :src="val.Image[0]" mode="aspectFill"></image>
				<view class="store-area">
					<view class="vant-icon">&#xe68f;</view>
					<view class="area-name">{{val.Area}}</view>
				</view>
				<view class="store-name">{{val.Name}}</view>
				<view class="store-address">{{val.Address}}
					<uni-rate :value="val.Rate" size="13" :disabled="true"></uni-rate>
				</view>
				<view class="store-tips">
					<view class="tips" v-for="(v,k) in val.TagsZH" :key="k">
						<view class="tip">{{v}}</view>
					</view>
					<view class="store-buy" v-if="vip===0">会员免费</view>
					<view class="store-buy" v-if="vip===1">立即预约</view>
				</view>
				<view class="gray"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	import {getStore} from "@/api/index.js"
	export default {
		components: {uniRate},
		data() {
			return {
				searchText:"",
				vip:1,
				storeList:[]
			}
		},
		async onLoad() {
			let storeData = await getStore();
			if(storeData.Code === 200){
				this.storeList = storeData.Data
			}
		},
		methods: {
			goStore(id){
				uni.navigateTo({
				    url: `/pages/store/store?id=${id}`
				});
			},
			goActive(){
				uni.navigateTo({
				    url: '/pages/user/active'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.gray{
		width:750upx;
		height:10upx;
		background: #F3F3F3;
	}
	.store-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		margin-bottom:10upx;
		.store-search{
			margin:40upx 40upx;
			width:665upx;
			height:80upx;
			background:#F3F3F3;
			border-radius: 36upx;
			overflow: hidden;
			display:flex;
			justify-content:flex-start;
			.vant-icon{
				font-size:40upx;
				color:#FE5100;
				margin-left:22upx;
				margin-top:18upx;
			}
			.uni-input{
				width:455upx;
				height:60upx;
				margin:10upx 0;
				font-size:29upx;
			}
		}
		.store-nearby{
			width:667upx;
			height:107upx;
			.nearby-top{
				font-size:29upx;
				margin-top: 22upx;
			}
			.nearby-bot{
				font-size:21upx;
				color:#A4A4A4;
			}
		}
		.store-list{
			position: relative;
			.cover {
				width: 667upx;
				height: 457upx;
				margin-top: 20upx;
				margin-left: 33upx;
				margin-right: auto;
			}
			
			.store-area{
				width: 667upx;
				position: absolute;
				display: flex;
				justify-content: flex-start;
				font-size:25upx;
				margin-left: 33upx;
				top:410upx;
				left:20upx;
				.vant-icon{
					color:#FE5100;
					font-size:30upx;
				}
				.area-name{
					color:#fff;
				}
			}
			
			.store-name{
				width: 667upx;
				font-size:36upx;
				margin-left: 33upx;
				margin-top: 24upx;
			}
			.store-address{
				width: 667upx;
				margin-left: 33upx;
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
				width: 667upx;
				margin-left: 33upx;
				margin-top: 17upx;
				display: flex;
				justify-content:space-between;
				padding-bottom:20upx;
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
