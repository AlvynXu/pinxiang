<template>
	<view class="store-v2">
		<view class="store-box">
			<view class="store-image-swiper-box">
				<swiper class="store-image-swiper" v-if="store.Image"
				:circular="store.Image.length === 1 ? false : true" 
				:indicator-dots="store.Image.length === 1 ? false : true" 
				:autoplay="store.Image.length === 1 ? false : true" indicator-active-color="#FE5100" indicator-color="#FFFFFF">
					<swiper-item class="store-image-swiper-item" v-for="(image,key) in store.Image" :key="key">
						<image class="store-image" mode="aspectFill" :src="image"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="store-info-box">
				<view class="store-info">
					<view class="store-name-km">
						<view class="store-name">{{store.Name}}</view>
						<view class="store-km">{{store.Distance}}</view>
					</view>
					<view class="store-label-share">
						<view class="store-label">
							<label v-for="(val,key) in store.TagsZH" :key="key">{{val}}</label>
						</view>
						<button class="store-share" :plain="true" open-type="share" @click="share">
							<text class="vant-icon">&#xe685;</text>
						</button>
					</view>
				</view>
				<view class="store-address">
					<view class="store-map"><view class="vant-icon" @click="getArea">&#xe68f;</view></view>
					<view class="store-address-info" @click="getArea">
						<view class="area-rate">
							<view class="area">{{store.Area}} <text v-if="store.TradingArea"> · {{store.TradingArea}}</text></view>
							<view class="rate"><uni-rate class="store-rate" :value="store.Rate" size="12" :disabled="true"></uni-rate></view>
						</view>
						<view class="address">
							{{store.Address}}
						</view>
					</view>
					<view class="store-phone"><view class="vant-icon" @click="tel">&#xe686;</view></view>
				</view>
			</view>
		</view>
		<view class="store-detail-box">
			<view class="store-detail-nav">
				<view class="store-detail-nav-list" @click="changeNav(0)">
					<text>服务介绍</text>
					<view class="store-detail-nav-list-line" v-if="nav === 0"></view>
				</view>
				<view class="store-detail-nav-list" @click="changeNav(1)">
					<text>门店介绍</text>
					<view class="store-detail-nav-list-line" v-if="nav === 1"></view>
				</view>
				<view class="store-detail-nav-list" @click="changeNav(2)">
					<text>体验须知</text>
					<view class="store-detail-nav-list-line" v-if="nav === 2"></view>
				</view>
			</view>
			<view class="store-detail-content">
				<view class="store-detail-content-service" v-if="nav === 0">
					<view class="store-detail-content-service-list-box" v-for="(value,key) in storeItem" :key="key">
						<view class="store-detail-content-service-list" v-if="value.Type === 0">
							<view class="store-detail-content-service-list-image" @click="openWashPopDown(value.ID)"><image mode="aspectFill" :src="value.Image"></image></view>
							<view class="store-detail-content-service-list-info">
								<view class="store-detail-content-service-list-info-top" @click="openWashPopDown(value.ID)">
									<view class="store-detail-content-service-list-info-top-name">{{value.Name}}</view>
									<view class="store-detail-content-service-list-info-top-appointment">已预约 20</view>
								</view>
								<view class="store-detail-content-service-list-info-bottom">
									<label @click="openWashPopDown(value.ID)">单次体验价 ￥{{store.MarketWash}}</label>
									<view>会员免费预约</view>
								</view>
							</view>
						</view>
						<view class="store-detail-content-service-list" v-if="value.Type === 1">
							<view class="store-detail-content-service-list-image" @click="openCarePopDown(1,value.ID)"><image mode="aspectFill" :src="value.Image"></image></view>
							<view class="store-detail-content-service-list-info">
								<view class="store-detail-content-service-list-info-top" @click="openCarePopDown(1,value.ID)">
									<view class="store-detail-content-service-list-info-top-name">{{value.Name}}·半合成</view>
									<view class="store-detail-content-service-list-info-top-appointment">已预约 20</view>
								</view>
								<view class="store-detail-content-service-list-info-bottom">
									<label @click="openCarePopDown(1,value.ID)">单次体验价 ￥{{store.MarketSemiSynthetic}}</label>
									<view>会员免费预约</view>
								</view>
							</view>
						</view>
						<view class="store-detail-content-service-list" v-if="value.Type === 1">
							<view class="store-detail-content-service-list-image" @click="openCarePopDown(2,value.ID)"><image mode="aspectFill" :src="value.Image"></image></view>
							<view class="store-detail-content-service-list-info">
								<view class="store-detail-content-service-list-info-top" @click="openCarePopDown(2,value.ID)">
									<view class="store-detail-content-service-list-info-top-name">{{value.Name}}·全合成</view>
									<view class="store-detail-content-service-list-info-top-appointment">已预约 20</view>
								</view>
								<view class="store-detail-content-service-list-info-bottom">
									<label @click="openCarePopDown(2,value.ID)">单次体验价 ￥{{store.MarketTotalSynthetic}}</label>
									<view>会员免费预约</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="store-detail-content-intro" v-if="nav === 1">
					<view class="store-detail-content-intro-list large">
						<view class="large-title">
							<text class="vant-icon large-title-icon">&#xe69a;</text>
							<text class="large-title-text">营业时间</text>
						</view>
						<view class="large-tag">
							<view class="large-tag-text" v-if="store.Rest">{{store.Rest}} 休息</view>
							<view class="large-tag-text" v-else>平均营业 {{store.WeeksZH}} {{store.StartTime}}-{{store.EndTime}}</view>
						</view>
					</view>
					<!-- <view class="store-detail-content-intro-list large">
						<view class="large-title">
							<text class="vant-icon large-title-icon">&#xe699;</text>
							<text class="large-title-text">基础设施</text>
						</view>
						<view class="large-tag">
							<view class="large-tag-iconText" v-for="(value,key) in store.InfrastructureZH" :key="key">
								<text class="large-tag-iconText-icon vant-icon" v-html="value.Icon"></text>
								<text class="large-tag-iconText-name">{{value.Name}}</text>
							</view>
						</view>
					</view> -->
					
					<view class="store-detail-content-intro-list middle" v-for="(value, key) in store.ServicesZH" :key="key">
						<view class="middle-title">
							<text class="vant-icon middle-title-icon" v-show="key==='洗车服务'">&#xe6b0;</text>
							<text class="vant-icon middle-title-icon" v-show="key==='美容服务'">&#xe688;</text>
							<text class="vant-icon middle-title-icon" v-show="key==='保养服务'">&#xe67b;</text>
							<text class="vant-icon middle-title-icon" v-show="key==='维修服务'">&#xe6aa;</text>
							<text class="vant-icon middle-title-icon" v-show="key==='改装服务'">&#xe6b0;</text>
							<text class="large-title-text">{{key}}</text>
						</view>
						<view class="middle-tag">
							<text class="middle-tag-text" v-for="(v,k) in value" :key="k">
								{{v}}
							</text>
						</view>
					</view>
					
					<view class="store-detail-content-intro-list large" v-if="store.Intro">
						<view class="large-title">
							<text class="vant-icon large-title-icon">&#xe684;</text>
							<text class="large-title-text">门店介绍</text>
						</view>
						<view class="large-tag">
							<view class="large-tag-text">{{store.Intro}}</view>
						</view>
					</view>
				</view>
				<view class="store-detail-content-hint" v-if="nav === 2">
					<image mode="aspectFill" src="https://cdn.doudouxiongglobal.com/pinxiang/image/book/book.png"></image>
				</view>
			</view>
		</view>
		<view class="store-button-box">
			<button class="one-time" v-if="step===0 && vip===0" @click="oneTime">单次体验</button>
			<button class="buy-vip" v-if="step===0 && vip===0" @click="buyVip">会员免费预约</button>
			<button class="buy-vip"  v-if="step===0 && vip === 1" @click="oneTime">会员免费预约</button>
			<button class="next-step"  v-if="formData.vip === 0 && step===1" @click="goChooseTime">下一步，预约服务时间</button>
			<button class="next-step"  v-if="formData.vip === 1 && step===1" @click="goChooseTime">加入会员</button>
		</view>
		
		<px-popdown :height="'971rpx'" ref="washPopDown" @close="closeWashPopDown">
			<view class="wash-popdown-box" v-if="washService">
				<view class="wash-popdown-title">
					<view class="wash-popdown-title-text">{{washService.Name}}</view>
					<view class="wash-popdown-title-line large"></view>
					<view class="wash-popdown-title-hint">仅限5座及其以下车辆</view>
				</view>
				<view class="wash-popdown-image">
					<image mode="aspectFill" :src="washService.Image"></image>
				</view>
				<view class="wash-popdown-title service-content">
					<view class="wash-popdown-title-text">服务内容</view>
					<view class="wash-popdown-title-line middle"></view>
					<view class="wash-popdown-title-hint">仅限5座及其以下车辆</view>
				</view>
				<view class="wash-popdown-tag">
					<label v-for="(value,key) in washService.Service" :key="key">{{value.Name}}</label>
				</view>
			</view>
		</px-popdown>
		<px-popdown :height="'1143rpx'" ref="carePopDown" @close="closeCarePopDown">
			<view class="care-popdown-box" v-if="careService">
				<view class="care-popdown-title">
					<view class="care-popdown-title-text">{{careService.Name}}</view>
					<view class="care-popdown-title-line large"></view>
				</view>
				<view class="care-popdown-image">
					<image mode="aspectFill" :src="careService.Image"></image>
				</view>
				<view class="care-popdown-title service-content">
					<view class="care-popdown-title-text">服务内容</view>
					<view class="care-popdown-title-line middle"></view>
				</view>
				<view class="care-popdown-tag">
					<label v-for="(value,key) in careService.Service" :key="key">{{value.Name}}</label>
				</view>
				<view class="care-popdown-title service-content">
					<view class="care-popdown-title-text">机油品牌</view>
					<view class="care-popdown-title-line middle"></view>
				</view>
				<view class="care-oil-box">
					<view class='care-oil-list' v-for="(val,key) in careService.Oil" :key="key">
						<image class="oil-img" :src="val.Image" mode="aspectFill"></image>
						<view class="oil-content">
							<view>{{val.Brand}}</view>
							<view>{{val.SN}}</view>
							<view>{{val.Type}}   {{val.Capacity}}L</view>
							<view>适合{{val.Distance}}km/{{val.Time}}</view>
						</view>
					</view>
					<image class="oil-hint" src="https://cdn.doudouxiongglobal.com/pinxiang/image/shop/tips.png"></image>
				</view>
			</view>
		</px-popdown>
		<px-popdown :height="'650rpx'" ref="chooseStoreItem" @close="closeChooseStoreItem">
			<view class="next-step-box">
				<view class='next-step-top'>
					<view class="next-step-top-image"><image mode="aspectFill" :src="nextData.image"></image></view>
					<view class="next-step-top-info">
						<text>{{nextData.name}}</text>
						<label v-if="(formData.vip || vip) && formData.type===0">12次免费洗车</label>
						<label v-if="(formData.vip || vip) && formData.type!==0">会员全年免费</label>
						<label v-if="formData.vip===0 && formData.type===0 && nextData.active===0 && vip===0">单次体验价￥{{nextData.price}}</label>
						<label v-if="formData.vip===0 && formData.type===0 && nextData.active===1 && vip===0">活动体验价<text style="text-decoration: line-through;">￥{{nextData.price}}</text> ￥{{nextData.activePrice}}</label>
						<label v-if="formData.vip===0 && (formData.type===1 || formData.type===2) && vip===0">单次体验价￥{{nextData.price}}</label>
					</view>
				</view>
				<view class="next-step-bottom">
					<view class="next-step-bottom-title">服务类型：</view>
					<view class="next-step-bottom-labels">
						<view class="next-step-label" v-for="(value,key) in serviceLabels" :key="key" @click="chooseType(key)">
							<text :class="{'label-choose':formData.type===value.type}">{{value.name}}</text>
						</view>
					</view>
					<view class="next-step-hint">*保养服务以平台门店上架机油为准，价格仅包含4L机油</view>
				</view>
			</view>
		</px-popdown>
	</view>
</template>

<script>
	import {getStoreByID,getStoreItem,getStoreItemDetail} from "@/api/index.js"
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	import pxPopdown from '@/components/px-popup/px-popdown.vue';
	export default{
		components:{uniRate,pxPopdown},
		data() {
			return {
				store:[],
				storeItem:[],
				nav:0,
				washService:[],
				careService:[],
				nextData:[],
				serviceLabels:[],
				id:0,
				step:0,
				vip:0,
				formData:{
					vip:0,
					type:0,
					itemID:0,
					storeID:0,
					storeName:'',
					price:''
				}
			}
		},
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
			let referrer = uni.getStorageSync('ReferrerCode')
		    return {
		      title: this.storeName+"【品象养车】",
		      imageUrl:this.cover,
		      path: '/pages/store/storeV2?id='+this.id
		    }
		},
		methods:{
			oneTime(){
				this.step = 1
				this.formData.vip=0
				this.openChooseStoreItem()
			},
			buyVip(){
				this.step = 1
				this.formData.vip=1
				this.openChooseStoreItem()
			},
			goChooseTime(){
				let price = 0
				if(this.formData.type === 0) {
					price = this.store.Active ? this.store.MarketWash/2 : this.store.MarketWash
				}
				if(this.formData.type === 1) price = this.store.MarketSemiSynthetic
				if(this.formData.type === 2) price = this.store.MarketTotalSynthetic
				if(this.vip) price = 0
				this.formData.price = price
				getApp().globalData.formData = this.formData
				if(this.formData.vip){
					uni.navigateTo({
						url:'/pages/userSub/active?to=index'
					})
				}else{
					uni.switchTab({
						url:'/pages/index/index'
					})
				}
				
			},
			getArea(){
				let that = this
				let latitude = parseFloat(that.store.Lat);
				let longitude = parseFloat(that.store.Lng);
				   wx.openLocation({
				     latitude,
				     longitude,
				     scale: 18,
					 name:that.store.Name,
					 address:that.store.Address
				   })
			},
			tel(){
				let phone = this.store.Phone
				if(phone === ''){
					wx.showToast({
						title:"该商户未录入手机号"
					})
					return false
				}
				wx.makePhoneCall({
					phoneNumber: phone
				})
			},
			changeNav(key){
				this.nav = key
			},
			async openWashPopDown(id){
				let itemDetail = await getStoreItemDetail(id)
				if(itemDetail.Code === 200){
					this.washService = itemDetail.Data
					this.$refs.washPopDown.open()
				}
			},
			closeWashPopDown(){
				
			},
			async openCarePopDown(type,id){
				let itemDetail = await getStoreItemDetail(id)
				if(itemDetail.Code === 200){
					this.careService = itemDetail.Data
					this.$refs.carePopDown.open()
				}
				// this.$refs.carePopDown.open()
			},
			closeCarePopDown(){
				
			},
			openChooseStoreItem(){
				this.nextData = this.serviceLabels[0]
				this.formData.type=this.serviceLabels[0].type
				this.formData.itemID = this.serviceLabels[0].itemID
				this.$refs.carePopDown.close()
				this.$refs.washPopDown.close()
				this.$refs.chooseStoreItem.open()
			},
			chooseType(key){
				this.formData.type=this.serviceLabels[key].type
				this.formData.itemID = this.serviceLabels[key].itemID
				this.nextData = this.serviceLabels[key]
				console.log(this.nextData)
			},
			closeChooseStoreItem(){
				this.step=0
			}
			
		},
		onLoad(options) {
			let that = this
			let geo = JSON.parse(uni.getStorageSync('geo'))
			let id = options.id
			this.id = id
			let userData = uni.getStorageSync('user_data')
			if(userData === null || userData.length === 0){
				
			}else{
				userData = JSON.parse(userData)
				this.vip = userData.Vip
			}
			getStoreByID(id,{Lat:geo.lat,Lng:geo.lng}).then(store => {
				if(store.Code === 200){
					that.store = store.Data[0]
					that.formData.storeName = store.Data[0].Name
					that.formData.storeID = store.Data[0].ID
					getStoreItem(store.Data[0].ID).then(storeItem => {
						if(storeItem.Code === 200){
							that.storeItem = storeItem.Data
							for(let i=0;i<storeItem.Data.length;i++){
								if(storeItem.Data[i].Type === 0){
									that.washService = storeItem.Data[i],
									that.serviceLabels.push({
										type:0,
										itemID:storeItem.Data[i].ID,
										name:'洗车服务',
										image:storeItem.Data[i].Image,
										price:store.Data[0].MarketWash,
										activePrice:(store.Data[0].Active ? store.Data[0].MarketWash/2 : store.Data[0].MarketWash),
										active:store.Data[0].Active
									})
								}
								if(storeItem.Data[i].Type === 1){
									that.careService = storeItem.Data[i]
									that.serviceLabels.push({
										type:1,
										itemID:storeItem.Data[i].ID,
										name:'半合成保养',
										image:storeItem.Data[i].Image,
										price:store.Data[0].MarketSemiSynthetic
									})
									that.serviceLabels.push({type:2,itemID:storeItem.Data[i].ID,name:'全合成保养',image:storeItem.Data[i].Image,price:store.Data[0].MarketTotalSynthetic})
								}
							}
						}
					})
				}
			})
		}
	}
</script>

<style scoped lang="scss">
	$white:#ffffff;
	$width:750upx;
	$content-width:667upx;
	$main-color:#FE5100;
	$orange:rgba(254,140,0,1);
	$black: #333333;
	$darkGray: #868686;
	$gray: #A4A4A4;
	$border: 1upx solid rgba(164,164,164,0.1);
	
	
	.store-v2{
		width: $width;
		background-color:#F3F3F3;
		position: relative;
	}
	.store-box{
		width: $content-width;
		padding:14upx 41.5upx;
		background:$white;
		.store-image-swiper-box{
			width:$content-width;
			height:457upx;
			.store-image-swiper{
				width:100%;
				height:100%;
				.store-image-swiper-item{
					width: 100%;
					height: 100%;
					.store-image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.store-info-box{
			width: 100%;
			margin-top:18upx;
			.store-info{
				width: 100%;
				border-bottom:1upx solid rgba(0,0,0,0.1);
				.store-name-km{
					width: 100%;
					display:inline-flex;
					justify-content: space-between;
					.store-name{
						width: 100%;
						flex-shrink: 1;
						font-size:33upx;
						font-weight:500;
						color:$black;
						line-height:45upx;
					}
					.store-km{
						flex-shrink: 0;
						font-size:29upx;
						font-weight:400;
						color:$gray;
						line-height:45upx;
					}
				}
				.store-label-share{
					width: 100%;
					display:inline-flex;
					justify-content: space-between;
					margin-top:18upx;
					margin-bottom:18upx;
					.store-label{
						width: 100%;
						flex-shrink: 1;
						display:flex;
						justify-content: flex-start;
						flex-wrap: wrap-reverse;
						label{
							color:$orange;
							height:40upx;
							border-radius:40upx;
							border:2upx solid $orange;
							font-size:25upx;
							font-weight:500;
							color:rgba(254,140,0,1);
							line-height:40upx;
							padding: 2upx 20upx;
							margin-right:5upx;
						}
					}
					.store-share{
						flex-shrink: 0;
						height:44upx;
						line-height: 44upx;
						border:none;
						padding:0;
						.vant-icon{
							font-size: 44upx;
							color:$orange;
							margin-right:0;
						}
					}
				}
			}
			.store-address{
				margin-bottom:18upx;
				height:76upx;
				width: 100%;
				display:inline-flex;
				justify-content: space-between;
				margin-top:9upx;
				.store-map{
					flex-shrink: 0;
					color:$main-color;
					height:76upx;
					margin-top:8upx;
					.vant-icon{
						font-size: 70upx;
						padding:0;
						margin-right:0;
						line-height: 76upx;
					}
				}
				&-info{
					width: 100%;
					flex-shrink: 1;
					.area-rate{
						width: 100%;
						display:inline-flex;
						justify-content: flex-start;
						vertical-align: middle;
						height:36upx;
						.area{
							flex-shrink: 1;
							font-size:25upx;
							font-weight:500;
							color:$black;
							vertical-align: middle;
							height:36upx;
							line-height: 36upx;
						}
						.rate{
							flex-shrink: 0;
							margin-left:25upx;
							vertical-align: middle;
							margin-top: 9upx;
						}
					}
					.address{
						font-size:22upx;
						font-weight:400;
						color:$gray;
						line-height:31upx;
						margin-top:9upx;
					}
				}
				.store-phone{
					color:$main-color;
					flex-shrink: 0;
					.vant-icon{
						margin-top:20upx;
						font-size: 50upx;
						padding:0;
						margin-right:0;
						padding-left:34upx;
						border-left: 1px solid rgba(0,0,0,.1);
					}
				}
			}
		}
	}
	
	.store-detail-box{
		width: $content-width;
		padding:14upx 41.5upx;
		margin-top:18upx;
		background:$white;
		.store-detail-nav{
			width: 100%;
			border-bottom: $border;
			display:inline-flex;
			justify-content: space-between;
			.store-detail-nav-list{
				width: 100%;
				text-align: center;
				position: relative;
				padding-bottom:29upx;
				text{
					font-size:29upx;
					font-weight:400;
					color:$black;
					line-height:40upx;
				}
				&-line{
					position: absolute;
					width: 54upx;
					height: 4upx;
					background: $main-color;
					left:50%; margin-left:-27upx;
					bottom:11upx;
				}
			}
		}
		.store-detail-content{
			width: 100%;
			padding-bottom:94upx;
			&-service{
				width: 100%;
				.store-detail-content-service-list-box{
					width: 100%;
					
					.store-detail-content-service-list{
						width: 100%;
						display:inline-flex;
						justify-content: space-between;
						padding-top:18upx;
						padding-bottom:18upx;
						border-bottom:$border;
						&-image{
							width:132upx;
							height:123upx;
							border-radius:4upx;
							flex-shrink: 0;
							image{
								width: 100%;
								height: 100%;
							}
						}
						&-info{
							width: 100%;
							height:123upx;
							flex-shrink: 1;
							margin-left:18upx;
							display:block;
							&-top{
								width: 100%;
								display:inline-flex;
								justify-content: space-between;
								&-name{
									width: 100%;
									font-size:29upx;
									font-weight:400;
									color:$black;
									line-height:40upx;
									flex-shrink: 1;
								}
								&-appointment{
									width: auto;
									text-align: right;
									flex-shrink: 0;
									font-size:25upx;
									font-weight:400;
									color:$gray;
									line-height:40upx;
								}
							}
							&-bottom{
								width: 100%;
								display:inline-flex;
								justify-content: space-between;
								margin-top:30upx;
								label{
									height:36upx;
									border-radius:36upx;
									border:1upx solid $orange;
									font-size:24upx;
									font-weight:400;
									color:rgba(254,140,0,1);
									line-height:36upx;
									padding:0 11upx;
								}
								view{
									font-size:27upx;
									font-weight:400;
									color:$main-color;
									line-height:36upx;
								}
							}
						}
					}
					
				}
			}
			&-intro{
				width: 100%;
				padding-top:18upx;
				padding-bottom:18upx;
				&-list{
					width: 100%;
					padding: 18upx 0;
					border-bottom:$border;
				}
				.large{
					&-title{
						width: 100%;
						&-icon{
							font-size: 47upx;
							color:$black;
							vertical-align: middle;
						}
						&-text{
							font-size:29upx;
							font-weight:400;
							color:$black;
							line-height:47upx;
							vertical-align: middle;
						}
					}
					&-tag{
						width: 100%;
						margin-top:18upx;
						&-text{
							font-size:25upx;
							font-weight:400;
							color:$gray;
							line-height:36upx;
							
						}
						&-iconText{
							display:inline-flex;
							justify-content: flex-start;
							margin-right:22upx;
							&-icon{
								font-size: 36upx;
								color:$main-color;
								vertical-align: middle;
							}
							&-name{
								font-size:22upx;
								font-weight:400;
								color:$black;
								line-height:36upx;
								vertical-align: middle;
							}
						}
					}
				}
				.large:last-of-type{
					border-bottom:0;
				}
				.middle{
					width: 100%;
					&-title{
						width: 100%;
						&-icon{
							font-size: 29upx;
							color:$black;
							vertical-align: middle;
						}
						&-text{
							font-size:29upx;
							font-weight:400;
							color:$black;
							line-height:29upx;
							vertical-align: middle;
						}
					}
					&-tag{
						width: 100%;
						margin-top:18upx;
						display:flex;
						flex-wrap: wrap;
						justify-content: flex-start;
						&-text{
							display: block;
							min-width: 147upx;
							margin-right:20upx;
							margin-bottom:18upx;
							font-size:25upx;
							font-weight:400;
							color:$darkGray;
							line-height:36upx;
						}
						&-text:nth-of-type(4),&-text:nth-of-type(8),&-text:nth-of-type(12),&-text:nth-of-type(16){
							margin-right:0
						}
					}
				}
			}
			&-hint{
				width:750upx;
				height:1395.2781upx;
				margin-left:-41.5upx;
				image{
					width:750upx;
					height:1395.2781upx;
				}
			}
		}
	}
	
	.store-button-box{
		width: $width;
		display:inline-flex;
		justify-content: space-between;
		position: fixed;
		bottom:0;
		z-index: 1000000;
		button{
			color:$white;
			font-size:29upx;
			font-weight:500;
			line-height:40upx;
			border:none;
			border-radius: 0;
			height:98upx;
			line-height: 98upx;
		}
		button::after{
			border: 0 solid $white;
		}
		.one-time{
			width: 50%;
			background:$orange;
		}
		.buy-vip{
			width: 100%;
			
			background:$main-color;
			
		}
		.next-step{
			width: 100%;
			background:$main-color;
		}
	}
	
	.wash-popdown-box{
		width: 667upx;
		padding: 16upx 41.5upx;
		.wash-popdown-title{
			width: 100%;
			&-text{
				text-align: left;
				font-size:33upx;
				font-weight:400;
				color:rgba(51,51,51,1);
				line-height:45upx;
			}
			&-line{
				height:4upx;
				background:$main-color;
				margin-top:5upx;
			}
			.large{
				width:288upx;
			}
			.middle{
				width: 130upx;
			}
			&-hint{
				font-size:25upx;
				font-weight:400;
				color:$gray;
				line-height:36upx;
				margin-top:7upx;
			}
		}
		.service-content{
			margin-top:18upx;
		}
		.wash-popdown-image{
			width:667upx;
			height:399upx;
			margin-top:22upx;
			overflow: hidden;
			border-radius:11upx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.wash-popdown-tag{
			width: 100%;
			display:flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			margin-top:36upx;
			label{
				width:145upx;
				text-align: center;
				margin-right:18upx;
				margin-bottom:18upx;
				font-size:25upx;
				font-weight:400;
				color:$black;
				line-height:36upx;
				padding:4upx 0;
				border-radius:11px;
				border:2px solid rgba(231,231,231,1);
			}
			label:nth-of-type(4),label:nth-of-type(8),label:nth-of-type(12),label:nth-of-type(16){
				margin-right:0;
			}
		}
	}
	
	.care-popdown-box{
		width: 667upx;
		padding: 16upx 41.5upx;
		position: relative;
		.care-popdown-title{
			width: 100%;
			&-text{
				text-align: left;
				font-size:33upx;
				font-weight:400;
				color:rgba(51,51,51,1);
				line-height:45upx;
			}
			&-line{
				height:4upx;
				background:$main-color;
				margin-top:5upx;
			}
			.large{
				width:288upx;
			}
			.middle{
				width: 130upx;
			}
			&-hint{
				font-size:25upx;
				font-weight:400;
				color:$gray;
				line-height:36upx;
				margin-top:7upx;
			}
		}
		.service-content{
			margin-top:18upx;
		}
		.care-popdown-image{
			width:667upx;
			height:399upx;
			margin-top:22upx;
			overflow: hidden;
			border-radius:11upx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.care-popdown-tag{
			width: 100%;
			display:flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			margin-top:36upx;
			label{
				width:145upx;
				text-align: center;
				margin-right:18upx;
				margin-bottom:18upx;
				font-size:25upx;
				font-weight:400;
				color:$black;
				line-height:36upx;
				padding:4upx 0;
				border-radius:11px;
				border:2px solid rgba(231,231,231,1);
			}
			label:nth-of-type(4),label:nth-of-type(8),label:nth-of-type(12),label:nth-of-type(16){
				margin-right:0;
			}
		}
		.care-oil-box{
			width: 100%;
			.care-oil-list{
				width: 100%;
				display:inline-flex;
				justify-content: space-between;
				margin: 18upx 0;
				.oil-img{
					width:234upx;
					height:217upx;
					border-radius:14upx;
					flex-shrink: 0;
					display:block;
					margin-right:34upx;
				}
				.oil-content{
					width: 100%;
					height:217upx;
					flex-shrink: 1;
					text-align: left;
					border-left:4upx solid #FE8C00;
					padding-left:34upx;
					font-weight:400;
					color:rgba(51,51,51,1);
					line-height:38upx;
					font-size: 27upx;
				}
			}
			.oil-hint{
				width: 667upx;
				height:1092.4399upx;
			}
		}
	}
	.next-step-box{
		width: 100%;
		.next-step-top{
			width: 678upx;
			padding:38upx 36upx;
			border: $border;
			display:inline-flex;
			&-image{
				width:145upx;
				height:145upx;
				flex-shrink: 0;
				image{
					width: 100%;
					height: 100%;
				}
			}
			&-info{
				width: 100%;
				height:145upx;
				flex-shrink: 1;
				margin-left:24upx;
				text{
					font-size:33upx;
					font-weight:400;
					color:rgba(51,51,51,1);
					line-height:45upx;
					display:block;
				}
				label{
					display:block;
					text-align: center;
					min-width:199upx;
					max-width: 259upx;
					height:36upx;
					border-radius:18px;
					border:2upx solid rgba(254,140,0,1);
					font-size:24upx;
					font-weight:400;
					color:rgba(254,140,0,1);
					line-height:36upx;
					margin-top:40upx;
					text{
						display: initial;
						font-size:24upx;
						font-weight:400;
						color:rgba(254,140,0,1);
						line-height:36upx;
					}
				}
			}
		}
		.next-step-bottom{
			width: 678upx;
			padding:38upx 36upx;
			&-title{
				width: 100%;
				font-size:25upx;
				font-weight:400;
				color:rgba(164,164,164,1);
				line-height:36upx;
			}
			&-labels{
				margin-top:18upx;
				width: 100%;
				display:inline-flex;
				justify-content: flex-start;
				.next-step-label{
					border-radius:4upx;
					margin-right:36upx;
					text{
						border:2upx solid rgba(51,51,51,1);
						padding:10upx 12upx;
						width: 100%;
						height:100%;
						font-size:29upx;
						font-weight:400;
						color:rgba(51,51,51,1);
						line-height:40upx;
					}
					.label-choose{
						background:rgba(254,81,0,1);
						border:2upx solid rgba(254,81,0,1);
						border-radius:4px;
						color:white;
					}
				}
			}
			.next-step-hint{
				font-size:24upx;
				font-weight:400;
				color:rgba(254,81,0,1);
				line-height:33upx;
				margin-top:40upx;
				margin-bottom:60upx;
			}
		}
	}
</style>
