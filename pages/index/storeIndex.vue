<template>
	<scroll-view :scroll-y="true" :enable-back-to-top="true" lower-threshold="100" @scrolltolower="loadMore" class="store-box">
		<view class="header-box">
			<view class="status_bar">
				<!-- 这里是状态栏 -->
			</view>
			<view class="header-box-title">品象养车</view>
			<!-- <view class="header-box-title" :style="{bottom:bottom}">品象养车</view>
			<view class="header-address-box" @tap="chooseArea" :style="{bottom:areaBottom}">
				<text class="vant-icon header-address-icon">&#xe68f;</text>
				<text class="header-address-text">{{area}}</text>
			</view> -->
		</view>
		<view style="height: 158upx;"></view>
		<view class="address-search">
			<view class="address-box" @tap="chooseArea" :style="{bottom:areaBottom}">
				<text class="vant-icon address-icon">&#xe68f;</text>
				<text class="address-text">{{area}}</text>
			</view>
			<view class="store-search" @tap="goSearch">
				<view class="store-search-input">
					<view class="input">输入门店信息</view>
				</view>
				<view class="vant-icon">&#xe692;</view>
			</view>
		</view>
		<view style="height: 96upx;"></view>
		<view class="store-swiper">
			<swiper class="swiper" circular="true" :indicator-dots="true" indicator-color="#FFFFFF" indicator-active-color="#FE5100" :current="current" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(val,key) in swiperList" :key="key">
					<image class="swiper-img" :src="val.Image" mode="aspectFill" :lazy-load="true"></image>
				</swiper-item>
			</swiper>
			<!-- <view class="store-search" @tap="goSearch">
				<view class="store-search-input">
					<view class="input">输入门店信息</view>
				</view>
				<view class="vant-icon">&#xe692;</view>
			</view> -->
		</view>
		<!-- <view class="store-vip" @tap="goActive">
			<view class="vip-top">
				<view class="vip-name">立即开卡</view>
				<view class="vant-icon">&#xe65c;</view>
			</view>
			<view class="vip-bottom">
				<view class="vip-name">全年免费保养，另送12次洗车服务</view>
				<view class="vant-icon">&#xe69e;</view>
			</view>
		</view> -->
		<!-- 立即开会员开 -->
		<view class="vip-box">
			<view class="vip-box-card"  @tap="goActive" >
				<image src="https://cdn.doudouxiongglobal.com/pinxiang/V1.2/vipbg-13.png"></image>
				<view class="position">
					<view class="position-text">会员养车·全年免费</view>
					<view class="position-text-white">立即开卡，赠送12次洗车服务</view>
				</view>
			</view>
			<view class="vip-card-service">
				<view>
					<view class="vant-icon circular">&#xe6ad;</view>
					<text>严选门店</text>
				</view>
				<view>
					<view class="vant-icon circular">&#xe6ab;</view>
					<text>会员畅养</text>
				</view>
				<view>
					<view class="vant-icon circular">&#xe6ae;</view>
					<text>洗车免费</text>
				</view>
				<view>
					<view class="vant-icon circular">&#xe6af;</view>
					<text>品质保证</text>
				</view>
			</view>
		</view>
		<view class="gray"></view>
		<view class="store-nearby">
			<view class="nearby-top" v-if="storeList.length!==0">
				附近商户
			</view>
			<view class="nearby-top" v-if="storeList.length===0">
				逛一逛
			</view>
			<view class="nearby-bot">
				品象养车，会员畅养
			</view>
		</view>
		<view class="gray"></view>

		<view v-for="(val,key) in storeList" :key="key">
			
			<view class="store-list" @tap="goStore(val.ID)">
				<image class="cover" :src="val.Image[0]" mode="aspectFill" :lazy-load="true"></image>
				<view class="store-area">
					<view class="vant-icon">&#xe68f;</view>
					<view class="area-name">{{val.Area}} <text v-if="val.TradingArea"> · {{val.TradingArea}}</text></view>
				</view>
				<view class="store-name">{{val.Name}}</view>
				<view class="store-distance">{{val.Distance}}</view>
				<view class="store-address">
				    <view>{{val.Address}}</view>
				    <view class="appointment-number">已预:{{val.AppointCount}}</view>
				</view>
				<view class="store-tips">
					<!-- <view class="store-tip-list">
						<view class="tips" v-for="(v,k) in val.TagsZH" :key="k">
							<view class="tip">{{v}}</view>
						</view>
					</view> -->
					<view class="rate">
						<uni-rate :value="val.Rate" size="13" :disabled="true"></uni-rate>
						<view class="per-capita-price">¥ {{val.Average}}/人</view>
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
				<view class="store-address">
				    <view>{{val.Address}}</view>
					<view class="appointment-number">已预约:{{val.AppointCount}}</view>
					<!-- <uni-rate :value="val.Rate" size="13" :disabled="true"></uni-rate> -->
				</view>
				<view class="store-tips">
					<!-- <view class="store-tip-list">
						<view class="tips" v-for="(v,k) in val.TagsZH" :key="k">
							<view class="tip">{{v}}</view>
						</view>
					</view> -->
					<view class="rate">
						<uni-rate :value="val.Rate" size="13" :disabled="true"></uni-rate>
						<view class="per-capita-price">¥ 430/人</view>
					</view>
					<view class="store-buy" v-if="vip===0">会员免费</view>
					<view class="store-buy" v-if="vip===1">立即预约</view>
				</view>
				<view class="gray"></view>
			</view>
		</view>
		<view style="text-align: center;width: 100%;font-size: 28upx;line-height: 60upx;color:#FE5100;" v-if="storeList.length!==0">门店持续更新中</view>
	</scroll-view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	import {getStore,getToken,getBanner} from "@/api/index.js"
	export default {
		components: {uniRate},
		data() {
			return {
				current:0,
				swiperList:[],
				autoplay: true,
				interval: 2000,
				circular:true,
				duration: 500,
				area:'',
				city:'',
				address:'',
				lat:"",
				lng:'',
				vip:0,
				storeList:[],
				recommend:[],
				platform: '',
				bottom: '8rpx',
				areaBottom: '10rpx',
				page:1,
				end:false
			}
		},
		onShareAppMessage(res) {
			let userData = uni.getStorageSync('user_data')
			userData = JSON.parse(userData)
			let referrer = userData['SerialCode']
		    return {
		      title: '品象养车',
		      path: '/pages/index/index'
		    }
		},
		onShow() {
			let that = this
			getBanner({}).then(bannerData=>{
				if(bannerData.Code === 200){
					that.swiperList = bannerData.Data
				}
			})
			
			wx.getSystemInfo({
				success:function(res){
					if(res.platform == "devtools"){
					}else if(res.platform == "ios"){
						that.bottom = '8rpx'
						that.areaBottom = '15rpx'
					}else if(res.platform == "android"){
						that.bottom = '12rpx'
						that.areaBottom = '21rpx'
					}
				}
			})
			// let tokenData = await getToken()
			let userData = uni.getStorageSync('user_data')
			if(userData === null ||userData.length === 0){
				
			}else{
				this.vip = JSON.parse(userData).Vip
			}
			
		},
		async onLoad() {
			let that = this
			uni.getStorage({
				key:"geo",
				success(res) {
					console.log(res.data)
					if(res.data!=undefined){
						res = JSON.parse(res.data)
						getStore({'Lat':res.lat,'Lng':res.lng,'City':res.city,'Page':that.page}).then(storeData => {
							if(storeData.Code === 200){
								if(storeData.Data.StoreData.length === 0){
									uni.showToast({
										icon:"none",
										title:"该地区门店正在更新中"
									})
								}
								that.storeList = storeData.Data.StoreData
								that.recommend = storeData.Data.RecommendData
								if(storeData.Data.Count<5){
									that.end = true
								}
							}
						});
					}
					
				}
			})
			wx.getLocation({
			 type: 'gcj02',
			 success (res) {
				 console.log("定位",(new Date).getMilliseconds())
				that.lat = res.latitude
				that.lng = res.longitude				
				
				uni.request({
					header:{
						"Content-Type": "application/text"
					},
					url:'https://apis.map.qq.com/ws/geocoder/v1/?location='+res.latitude+','+res.longitude+'&key=QKLBZ-JNMC4-W2EUA-XOZ7H-DOVF2-D5FTJ',
					success(re) {
						if(re.statusCode===200){
							console.log("位置",(new Date).getMilliseconds())
							that.area = re.data.result.address_component.street
							that.city = re.data.result.address_component.city
							uni.setStorageSync('geo',JSON.stringify({
								'lat':res.latitude,
								'lng':res.longitude,
								'province':re.data.result.address_component.province,
								'city':re.data.result.address_component.city,
								'area':re.data.result.address_component.district,
								'address':re.data.result.address
							}))
							getStore({'Lat':res.latitude,'Lng':res.longitude,'City':re.data.result.address_component.city,'Page':that.page}).then(storeData => {
								if(storeData.Code === 200){
									if(storeData.Data.StoreData.length === 0){
										uni.showToast({
											icon:"none",
											title:"该地区门店正在更新中"
										})
									}
									that.storeList = storeData.Data.StoreData
									that.recommend = storeData.Data.RecommendData
									if(storeData.Data.Count<5){
										that.end = true
									}
								}
							});
						}
					 }
				});
			 }
			})
		},
		methods: {
			goStore(id){
				uni.navigateTo({
				    url: `../store/storeV2?id=${id}`
				});
			},
			goActive(){
				let userData = uni.getStorageSync('user_data')
				if(userData === null || userData.length === 0){
					wx.showModal({
						title:"提示",
						content:"未登录，请前往登录",
						success: function (res) {
						            if (res.cancel) {
						               //点击取消,默认隐藏弹框
						            } else {
						              uni.navigateTo({
						              	url:"/pages/login/login"
						              })
						            }
						         },
					})
					return false;
				}
				uni.navigateTo({
					url: '../userSub/active'
				});
			},
			goSearch(){
				uni.navigateTo({
				    url: '../store/storeSearch/storeSearch'
				});
			},
			loadMore(){
				let that = this
				if(!this.end){
					that.page += 1
					getStore({'Lat':that.lat,'Lng':that.lng,'City':that.city,'Page':that.page}).then(storeData => {
						if(storeData.Code === 200){
							if(storeData.Data.Count>0){
								storeData.Data.StoreData.forEach((value,key)=>{
									that.storeList.push(value)
								})
							}
							if(storeData.Data.Count<5){
								that.end = true
							}
						}
					});
				}
			},
			chooseArea(){
				let that = this
				wx.chooseLocation({
					success(res) {
						console.log(res)
						that.page = 1
						that.area = res.name
						that.lat = res.latitude
						that.lng = res.longitude
						uni.request({
							header:{
								"Content-Type": "application/text"
							},
							url:'https://apis.map.qq.com/ws/geocoder/v1/?location='+res.latitude+','+res.longitude+'&key=QKLBZ-JNMC4-W2EUA-XOZ7H-DOVF2-D5FTJ',
							success(re) {
								if(re.statusCode===200){
									console.log(re)
									that.city = re.data.result.address_component.city
									uni.setStorageSync('geo',JSON.stringify({
										'lat':res.latitude,
										'lng':res.longitude,
										'province':re.data.result.address_component.province,
										'city':re.data.result.address_component.city,
										'area':re.data.result.address_component.district,
										'address':re.data.result.address
									}))
									getStore({'Lat':res.latitude,'Lng':res.longitude,'City':re.data.result.address_component.city,'Page':that.page}).then(storeData => {
										if(storeData.Code === 200){
											if(storeData.Data.StoreData.length === 0){
												uni.showToast({
													icon:"none",
													title:"该地区门店正在更新中"
												})
											}
											that.storeList = storeData.Data.StoreData
											that.recommend = storeData.Data.RecommendData
											if(storeData.Data.Count<5){
												that.end = true
											}
										}
									});
								}
							 }
						});
						
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.gray{
		width:750upx;
		height:10upx;
		background: #F3F3F3;
	}
	.header-box{
		position:fixed;
		top:0;
		left:0;
		width: 750upx;
		height: 158upx;
		background: #FCFCFC;
		overflow: hidden;
		z-index:100;
		.header-box-title{
			width: 100%;
			line-height: 98upx;
			font-size:33upx;
			font-family:PingFangSC;
			font-weight:400;
			color:rgba(51,51,51,1);
			text-align: center;
		}
	}
	
	.address-search{
		position: fixed;
		top: 158upx;
		left: 0;
		z-index: 109;
		background-color: #FFFFFF;
		height: 96upx;
		box-sizing: border-box;
		width: 750upx;
		padding: 0 40upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.address-box{
			.address-icon{
				font-size:33upx;
				color:#A4A4A4;
				vertical-align: middle;
			}
			.address-text{
				display:inline-block;
				margin-left:-10upx;
				font-size:30upx;
				line-height: 30upx;
				width: 150upx;
				overflow: hidden;/*超出部分隐藏*/
				text-overflow:ellipsis;/* 超出部分显示省略号 */
				white-space: nowrap;/*规定段落中的文本不进行换行 */
				color:#A4A4A4;
				vertical-align: middle;
			}
		}
		.store-search{
			width:494upx;
			height:54upx;
			border-radius:11upx;
			background:rgba(164,164,164,0.2);
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 12upx 0 22upx;
			color:#A4A4A4;
			font-size: 25upx;
		}
	}
	
	.store-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		height: 100vh;
		margin-bottom:10upx;
		.store-swiper{
			width:750upx;
			height: 384upx;
			position: relative;
			.swiper{
				width:750upx;
				height:384upx;
				.swiper-img{
					width:750upx;
					height:384upx;
				}
			}
		}
		.vip-box{
			width:750upx;
			box-sizing: border-box;
			padding: 36upx 42upx 0 42upx;
			background:#FFFFFF;
			.vip-box-card{
				position: relative;
				width:666upx;
				height:152upx;
				border-radius:11upx;
				.position{
					position: absolute;
					top: 0;
					left: 0;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					width:666upx;
					height:152upx;
					.position-text{
						font-size:36upx;
						font-weight:500;
						color:rgba(75,42,0,1);
						line-height:50upx;
					}
					.position-text-white{
						font-size:25upx;
						font-weight:500;
						color:rgba(252,245,212,1);
						line-height:50upx;
					}
				}
				image{
					width:666upx;
					height:152upx;
				}
			}
			.vip-card-service{
				height: 98upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 25upx;
				font-weight:400;
				color:rgba(51,51,51,1);
				line-height:36upx;
				.circular{
					border-radius: 50%;
					line-height: 36upx;
					text-align: center;
					width:36upx;
					height:36upx;
					color: #FFFFFF;
					font-size: 20upx;
					display: inline-block;
					background:linear-gradient(180deg,rgba(254,140,0,1) 0%,rgba(254,81,0,1) 100%);
				}
			}
		}
		// .store-vip{
		// 	width:667upx;
		// 	height:134upx;
		// 	box-shadow: 0px 0px 3px 3px rgba(164,164,164,0.1);
		// 	margin: 0 auto;
		// 	margin-top: 100upx;
		// 	margin-bottom: 15upx;
		// 	border-radius:11upx;
		// 	.vip-top{
		// 		width:580upx;
		// 		font-size:29upx;
		// 		color:#FE5100;
		// 		display: flex;
		// 		height:65upx;
		// 		line-height:65upx;
		// 		margin-left:33upx;
		// 		justify-content: space-between;
		// 		border-bottom:1upx solid rgba(254,81,0,0.1);
		// 		.vant-icon{
		// 			font-size:40upx;
		// 			margin-right: 0;
		// 		}
		// 	}
		// 	.vip-bottom{
		// 		width:580upx;
		// 		font-size:22upx;
		// 		display: flex;
		// 		height:65upx;
		// 		line-height:65upx;
		// 		margin-left:33upx;
		// 		justify-content: space-between;
		// 		.vip-name{
		// 			color:#A4A4A4;
		// 		}
		// 		.vant-icon{
		// 			font-size:40upx;
		// 			margin-right: 0;
		// 			margin-top:2upx;
		// 			color:rgba(254,81,0,0.5)
		// 		}
		// 	}
		// }
		.store-nearby{
			width:667upx;
			height:107upx;
			margin: 0 auto;
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
				display:block;
				margin: 0 auto;
				margin-top: 20upx;
				// margin-left: 41.5upx;
				// margin-right: auto;
			}
			
			.store-area{
				width: 667upx;
				position: absolute;
				display: flex;
				justify-content: flex-start;
				font-size:25upx;
				margin-left: 41.5upx;
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
				margin : 0 auto;
				margin-top: 24upx;
			}
			.store-address{
				width: 667upx;
				margin: 0 auto;
				font-size:29upx;
				color:#A4A4A4;
				margin-top:18upx;
				display: flex;
				justify-content: space-between;
				.appointment-number{
					font-size: 25upx;
					font-weight:400;
					color: #FE8C00;
				}
			}
			
			.store-tips{
				width: 667upx;
				margin: 0 auto;
				margin-top: 17upx;
				display: flex;
				align-items: center;
				justify-content:space-between;
				padding-bottom:20upx;
				.rate{
					position: relative;
					width: 266upx;
					.per-capita-price{
						position: absolute;
						right: 0;
						top:50%;
						transform: translateY(-50%);
						font-size:22upx;
						font-weight:400;
						color:rgba(164,164,164,1);
					}
				}
				.uni-rate{
					margin-top:10upx;
				}
				// .store-tip-list{
				// 	width:470upx;
				// 	display: flex;
				// 	justify-content:flex-start;
				// 	margin-top:10upx;
					// .tips{
						// margin-top: 10upx;	
						// display: flex;
						// justify-content:flex-start;
				// 		.tip{
				// 			width:141upx;
				// 			height:40upx;
				// 			margin-right: 5upx;
				// 			line-height: 40upx;
				// 			text-align: center;
				// 			color:#FE8C00;
				// 			font-size: 25upx;
				// 			border-radius:18px;
				// 			border:2upx solid rgba(254,140,0,1);
				// 		}
				// 	}
				// }
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
