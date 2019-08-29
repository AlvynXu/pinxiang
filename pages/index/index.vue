<template>
	<view class="store-box">
		<view class="store-swiper">
			<swiper class="swiper" circular="true" :current="current" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">
				<swiper-item v-for="(val,key) in swiperList" :key="key">
					<image class="swiper-img" :src="val.src" mode="aspectFit"></image>
				</swiper-item>
			</swiper>
			<view class="store-search" @click="goSearch">
				<view class="store-search-input">
					<view class="input">输入小区、写字楼或门店信息</view>
				</view>
				<view class="vant-icon">&#xe692;</view>
			</view>
		</view>
		<view class="store-vip" @click="goActive">
			<view class="vip-top">
				<view class="vip-name">立即开卡</view>
				<view class="vant-icon">&#xe65c;</view>
			</view>
			<view class="vip-bottom">
				<view class="vip-name">全年免费保养，另送12次洗车服务</view>
			</view>
		</view>
		<view class="gray"></view>
		<view class="store-nearby">
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
				current:0,
				swiperList:[
					{src:"https://cdn.doudouxiongglobal.com/pinxiang/image/banner/banner1.png"},
					{src:"https://cdn.doudouxiongglobal.com/pinxiang/image/banner/banner2.png"}
					],
				autoplay: false,
				interval: 2000,
				circular:true,
				duration: 500,
				cover:'https://cdn.doudouxiongglobal.com/Default_image/city/hangzhou.jpg',
				title: 'Hello',
				area:'下城区 · 钱江世纪城',
				storeName:'御驾汇汽车服务中心',
				address:'秋涛北路72号杭州大厦501负2楼',
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
				    url: `../store/store?id=${id}`
				});
			},
			goActive(){
				uni.navigateTo({
				    url: '../user/active'
				});
			},
			goSearch(){
				uni.navigateTo({
				    url: '../store/storeSearch/storeSearch'
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
		.store-swiper{
			width:750upx;
			height:413upx;
			position: relative;
			.swiper{
				width:750upx;
				height:413upx;
				.swiper-img{
					width:750upx;
					height:413upx;
				}
			}
			.store-search{
				width:667upx;
				height:121upx;
				background: #fff;
				position: absolute;
				top:353upx;
				left:42upx;
				border-radius:11upx;
				box-shadow: 0px 0px 3px 3px rgba(4,4,4,0.1);
				display: flex;
				justify-content: space-between;
				.store-search-input{
					margin-top: 45upx;
					width:450upx;
					margin-left:33upx;
					.input{
						font-size:25upx;
						color:#A4A4A4;
					}
				}
				.vant-icon{
					margin-top: 45upx;
					font-size:30upx;
					margin-right: 60upx;
					color:#FE5100;
				}
			}
		}
		.store-vip{
			width:667upx;
			height:134upx;
			box-shadow: 0px 0px 3px 3px rgba(4,4,4,0.1);
			margin-top: 100upx;
			margin-bottom: 15upx;
			border-radius:11upx;
			.vip-top{
				width:580upx;
				font-size:29upx;
				color:#FE5100;
				display: flex;
				height:65upx;
				line-height:65upx;
				margin-left:33upx;
				justify-content: space-between;
				border-bottom:1upx solid rgba(254,81,0,0.1);
				.vant-icon{
					font-size:40upx;
					margin-right: 0;
				}
			}
			.vip-bottom{
				width:580upx;
				font-size:22upx;
				display: flex;
				height:65upx;
				line-height:65upx;
				margin-left:33upx;
				justify-content: space-between;
				.vip-name{
					color:#A4A4A4;
				}
				.vant-icon{
					font-size:40upx;
					margin-right: 0;
				}
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
				justify-content:flex-start;
				padding-bottom:20upx;
				.tips{
					// margin-top: 10upx;	
					// display: flex;
					// justify-content:flex-start;
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
					margin-left:63upx;
				}
			}
		}
	}
</style>
