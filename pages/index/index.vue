<template>
	<view class="store-box">
		<view class="header-box">
			<view class="status_bar">
				<!-- 这里是状态栏 -->
			</view>
			<view class="header-box-title" :style="{bottom:bottom}">品象养车</view>
			<view class="header-address-box" @click="chooseArea" :style="{bottom:areaBottom}">
				<text class="vant-icon header-address-icon">&#xe68f;</text>
				<text class="header-address-text">{{area}}</text>
			</view>
		</view>
		<view style="height: 158upx;"></view>
		<view class="store-swiper">
			<swiper class="swiper" circular="true" :current="current" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">
				<swiper-item v-for="(val,key) in swiperList" :key="key">
					<image class="swiper-img" :src="val.src" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<view class="store-search" @click="goSearch">
				<view class="store-search-input">
					<view class="input">输入门店信息</view>
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
				<view class="vant-icon">&#xe69e;</view>
			</view>
		</view>
		<view class="gray"></view>
		<view class="store-nearby">
			<view class="nearby-top">
				附近商户
			</view>
			<view class="nearby-bot">
				品象养车，会员畅养
			</view>
		</view>
		<view class="gray"></view>

		<view v-for="(val,key) in storeList" :key="key">
			<view class="store-list" @click="goStore(val.ID)">
				<image class="cover" :src="val.Image[0]" mode="aspectFill"></image>
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
		
		<view style="text-align: center;width: 100%;font-size: 28upx;line-height: 60upx;color:#FE5100;">产品公测，10月1日全城百家门店统一上线</view>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	import {getStore,getToken} from "@/api/index.js"
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
				area:'',
				storeName:'',
				address:'',
				lat:"",
				lng:'',
				vip:1,
				storeList:[],
				platform: '',
				bottom: '8rpx',
				areaBottom: '10rpx'
			}
		},
		onShareAppMessage(res) {
		    return {
		      title: '品象养车',
		      path: '/pages/index/index'
		    }
		},
		async onLoad() {
			let that = this
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
			let tokenData = await getToken()
			wx.getLocation({
			 type: 'gcj02',
			 success (res) {
				 console.log(res)
				that.lat = res.latitude
				that.lng = res.longitude
				uni.setStorageSync('geo',JSON.stringify({'lat':res.latitude,'lng':res.longitude}))
				getStore({'Lat':res.latitude,'Lng':res.longitude}).then(storeData => {
					if(storeData.Code === 200){
						that.storeList = storeData.Data
					}
				});
				
				uni.request({
					header:{
						"Content-Type": "application/text"
					},
					url:'https://apis.map.qq.com/ws/geocoder/v1/?location='+res.latitude+','+res.longitude+'&key=QKLBZ-JNMC4-W2EUA-XOZ7H-DOVF2-D5FTJ',
					success(re) {
						if(re.statusCode===200){
							that.area = re.data.result.address_component.street
						}
					 }
				});
			 }
			})
		},
		methods: {
			goStore(id){
				uni.navigateTo({
				    url: `../store/store?id=${id}`
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
						              uni.switchTab({
						              	url:"/pages/user/user"
						              })
						            }
						         },
					})
					return false;
				}
				uni.navigateTo({
					url: '../user/active'
				});
			},
			goSearch(){
				uni.navigateTo({
				    url: '../store/storeSearch/storeSearch'
				});
			},
			chooseArea(){
				let that = this
				wx.chooseLocation({
					success(res) {
						that.area = res.name
						that.lat = res.latitude
						that.lng = res.longitude
						uni.setStorageSync('geo',JSON.stringify({'lat':res.latitude,'lng':res.longitude}))
						getStore({Lat:res.latitude,Lng:res.longitude}).then(storeData => {
							if(storeData.Code === 200){
								that.storeList = storeData.Data
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
		height: 154upx;
		background: #FCFCFC;
		overflow: hidden;
		z-index:100;
	}
	.header-box-title{
		position: absolute;
		width: 100%;
		line-height: 58upx;
		font-size:33upx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(51,51,51,1);
		text-align: center;
		left:0;
		z-index:101;
	}
	.header-address-box{
		position: absolute;
		left:20upx;
		z-index: 102;
		.header-address-icon{
			font-size:33upx;
			color:#A4A4A4;
			vertical-align: middle;
		}
		.header-address-text{
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
