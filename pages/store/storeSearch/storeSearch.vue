<template>
	<view class="store-box">
		<view class="store-search">
			<view class="vant-icon">&#xe692;</view>
			<input class="uni-input" confirm-type="search" :value="searchText" @input="search" placeholder="输入门店信息" placeholder-style="color:rgba(51,51,51,0.5)"/>
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
		<view class="search-none" v-if="serachNoneShow">
			<view class="vant-icon">&#xe69f;</view>
			<view>暂未搜索到门店</view>
		</view>
		<view v-for="(val,key) in storeList" :key="key">
			<view class="store-list" @click="goStore(val.ID)">
				<image class="cover" :src="val.Image[0]" mode="aspectFill" :lazy-load="true"></image>
				<view class="store-area">
					<view class="vant-icon">&#xe68f;</view>
					<view class="area-name">{{val.Area}} <text v-if="val.TradingArea"> · {{val.TradingArea}}</text></view>
				</view>
				<view class="store-name">{{val.Name}}</view>
				<view class="store-distance">{{val.Distance}}</view>
				<view class="store-address">{{val.Address}}
					<uni-rate :value="val.Rate" size="13" :disabled="true"></uni-rate>
				</view>
				<view class="store-tips">
					<view class="store-tip-list">
						<view class="tips" v-for="(v,k) in val.TagsZH" :key="k">
							<view class="tip">{{v}}</view>
						</view>
					</view>
					<view class="store-buy" v-if="vip===0">会员免费</view>
					<view class="store-buy" v-if="vip===1">立即预约</view>
				</view>
				<view class="gray"></view>
			</view>
		</view>
		
		<view v-for="(val,key) in recommend" :key="key">
			<view class="store-list" @click="goStore(val.ID)">
				<image class="cover" :src="val.Image[0]" mode="aspectFill" :lazy-load="true"></image>
				<view class="store-area">
					<view class="vant-icon">&#xe68f;</view>
					<view class="area-name">{{val.City}} · {{val.Area}}</text></view>
				</view>
				<view class="store-name">{{val.Name}}</view>
				<view class="store-distance">{{val.Distance}}</view>
				<view class="store-address">{{val.Address}}
					<uni-rate :value="val.Rate" size="13" :disabled="true"></uni-rate>
				</view>
				<view class="store-tips">
					<view class="store-tip-list">
						<view class="tips" v-for="(v,k) in val.TagsZH" :key="k">
							<view class="tip">{{v}}</view>
						</view>
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
	import {getStore,storeSearch} from "@/api/index.js"
	export default {
		components: {uniRate},
		data() {
			return {
				serachNoneShow:false,
				searchText:"",
				vip:1,
				storeList:[],
				
				timeout: null,
			}
		},
		async onLoad() {
			let that = this
			uni.getStorage({
				key:"geo",
				success: (res) => {
					console.log(res)
					if(res.errMsg=='getStorage:ok'){
						let geo = JSON.parse(res.data)
						getStore({Lat:geo.lat,Lng:geo.lng,City:geo.city}).then(storeData =>{
							if(storeData.Code === 200){

								that.storeList = storeData.Data.StoreData
								that.recommend = storeData.Data.RecommendData
							}
						})
					}
					
				}
			})
			
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
			},
			search(e){
				let that = this
				let value = e.detail.value
				clearTimeout(that.timeout)
				if(value === ''){
					this.serachNoneShow = false
					uni.getStorage({
						key:"geo",
						success: (res) => {
							console.log(res)
							if(res.errMsg=='getStorage:ok'){
								let geo = JSON.parse(res.data)
								getStore({Lat:geo.lat,Lng:geo.lng,City:geo.city}).then(storeData =>{
									if(storeData.Code === 200){
					
										that.storeList = storeData.Data.StoreData
										that.recommend = storeData.Data.RecommendData
									}
								})
							}
							
						}
					})
				}else{
					that.timeout = setTimeout(async ()=>{
						let storeData = await storeSearch({Name:value})
						if(storeData.Code === 200){
							that.storeList = storeData.Data
							console.log(that.storeList)
							if(that.storeList.length===0){
								this.serachNoneShow = true
							}else{
								this.serachNoneShow = false
							}
						}
					},300)
				}
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
		.search-none{
			text-align: center;
			.vant-icon{
				color:#f3f3f3;
				font-size:240upx;
				margin-top: 300upx;
			}
			view{
				color:#A4A4A4;
				font-size:29upx;
			}
		}
	}
	.store-distance{
		position: absolute;
		right:60upx;
		bottom: 170upx;
		font-size:29upx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(164,164,164,1);
		line-height:40upx;
	}
	.store-label{
		display:inline-flex;
		justify-content: flex-start;
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
				box-shadow: 0px 0px 3px 3px rgba(164,164,164,0.1);
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
			box-shadow: 0px 0px 3px 3px rgba(164,164,164,0.1);
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
					margin-top:2upx;
					color:rgba(254,81,0,0.5)
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
				.store-tip-list{
					width:470upx;
					display: flex;
					justify-content:flex-start;
					margin-top:10upx;
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
					margin-left:43upx;
				}
			}
		}
	}
	.store-distance{
		position: absolute;
		right:60upx;
		bottom: 170upx;
		font-size:29upx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(164,164,164,1);
		line-height:40upx;
	}
</style>
