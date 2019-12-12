<template>
	<view class="store-search">
		<view class="store-search-box">
			<view class="store-search-time" @click="openDatePicker"><text>{{appointment}}</text><text class="vant-icon">&#xe6c5;</text></view>
			<view class="store-search-input"><input placeholder="请选择您要预约的服务门店" v-model="keyword" value=""/></view>
			<view class="store-search-button" @click="close">取消</view>
		</view>
		<scroll-view class="store-list-box" :scroll-y="true" :show-scrollbar="false" @scrolltolower="nextPage">
			<view class="store-list" v-for="(val,key) in storeList" :key="key" :class="{'disabled':val.Open===0}">
				<view class="store-list-icon" :class="{'red':val.Active}"></view>
				<view class="store-list-content" @click="chooseStore(val.ID,val.Name,[val.MarketWash,val.MarketSemiSynthetic,val.MarketTotalSynthetic],[val.WashItem,val.CareItem,val.CareItem],val.Active,val.Open)">
					<view class="store-list-content-top">
						<view class="store-list-content-top-title">{{val.Name}}<label v-if="val.Active">首次洗车半价</label></view>
						<view class="store-list-content-top-km">{{val.Distance}}</view>
					</view>
					<view class="store-list-content-middle">
						<view class="store-list-content-middle-address">{{val.Area}}·{{val.Address}}</view>
						<!-- <view class="store-list-content-middle-count">累计预约: 8888万</view> -->
					</view>
					<view class="store-list-content-bottom">
						<view class="store-list-content-bottom-label">
							<label v-if="type===0">单次洗车￥{{val.MarketWash}}</label>
							<label v-if="type===1">半合成保养￥{{val.MarketSemiSynthetic}}</label>
							<label v-if="type===2">全合成保养￥{{val.MarketTotalSynthetic}}</label>
						</view>
						<view v-if="val.Open===1" class="store-list-content-bottom-rate"><uni-rate :value="val.Rate" size="15" :disabled="true"></uni-rate></view>
						<view v-if="val.Open===0" class="store-list-content-bottom-hint red">当前时间，门店暂未营业</view>
						<!-- <view class="store-list-content-bottom-hint">当前时间0位车主预约，无需排队</view> -->
					</view>
				</view>
			</view>
		</scroll-view>
		<px-popdown :height="'527rpx'" ref="datapicker">
			<px-datepicker v-model="appointment" @choose="chooseAppointmentDate"></px-datepicker>
		</px-popdown>
	</view>
</template>

<script>
	import pxPopdown from '@/components/px-popup/px-popdown.vue';
	import pxDatepicker from '@/components/px-datepicker/px-datepicker.vue';
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import {getStore,storeSearch,storeSearchV2} from "@/api/index.js"
	export default {
		components: {pxPopdown,pxDatepicker,uniRate},
		props: {
			time:{
				type:String,
				default:'',
			},
			type:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				page:1,
				storeList:[],
				recommend:[],
				end:false,
				timeout: null,
				appointment : this.time,
				keyword : ''

			}
		},
		mounted() {
			let that = this
			let date = new Date()
			let tmpHoure = date.getMinutes()<30 ? date.getHours() : date.getHours()+1
			if(that.appointment === ''){
				that.appointment = (date.getMonth()+1 <10 ? `0${date.getMonth()+1}` : date.getMonth()+1)
				+ '-' + (date.getDate()<10 ? `0${date.getDate()}` : date.getDate()) 
				+ ' ' + (tmpHoure<10 ? `0${tmpHoure}` : tmpHoure) 
				+ ':' + (date.getMinutes()<30 ? `30` : '00')
			}
			
			uni.getStorage({
				key:"geo",
				success: (res) => {
					console.log(res)
					if(res.errMsg=='getStorage:ok'){
						let geo = JSON.parse(res.data)
						storeSearchV2({Lat:geo.lat,Lng:geo.lng,City:geo.city,Page:that.page,AppointmentTime: that.appointment}).then(storeData =>{
							if(storeData.Code === 200){
								that.storeList = storeData.Data.StoreData
								that.recommend = storeData.Data.RecommendData
							}
						})
					}else{
						wx.getLocation({
							type: 'gcj02',
							success (res) {
								uni.request({
									header:{
										"Content-Type": "application/text"
									},
									url:'https://apis.map.qq.com/ws/geocoder/v1/?location='+res.latitude+','+res.longitude+'&key=QKLBZ-JNMC4-W2EUA-XOZ7H-DOVF2-D5FTJ',
									success(re) {
										if(re.statusCode===200){
											uni.setStorageSync('geo',JSON.stringify({
												'lat':res.latitude,
												'lng':res.longitude,
												'province':re.data.result.address_component.province,
												'city':re.data.result.address_component.city,
												'area':re.data.result.address_component.district,
												'address':re.data.result.address
											}))
											storeSearchV2({
												Lat:res.latitude,Lng:res.longitude,
												City:re.data.result.address_component.city,Page:that.page,AppointmentTime: that.appointment}).then(storeData =>{
												if(storeData.Code === 200){
													that.storeList = storeData.Data.StoreData
													
													that.recommend = storeData.Data.RecommendData
												}
											})
										}
									}
								});
							}
						})
					}
				},
				fail() {
					wx.getLocation({
						type: 'gcj02',
						success (res) {
							uni.request({
								header:{
									"Content-Type": "application/text"
								},
								url:'https://apis.map.qq.com/ws/geocoder/v1/?location='+res.latitude+','+res.longitude+'&key=QKLBZ-JNMC4-W2EUA-XOZ7H-DOVF2-D5FTJ',
								success(re) {
									if(re.statusCode===200){
										uni.setStorageSync('geo',JSON.stringify({
											'lat':res.latitude,
											'lng':res.longitude,
											'province':re.data.result.address_component.province,
											'city':re.data.result.address_component.city,
											'area':re.data.result.address_component.district,
											'address':re.data.result.address
										}))
										storeSearchV2({
											Lat:res.latitude,Lng:res.longitude,
											City:re.data.result.address_component.city,Page:that.page,AppointmentTime: that.appointment}).then(storeData =>{
											if(storeData.Code === 200){
												that.storeList = storeData.Data.StoreData
												that.recommend = storeData.Data.RecommendData
											}
										})
									}
								}
							});
						}
					})
				}
			})
		},
		watch:{
			keyword(value){
				let that = this
				setTimeout(()=>{
					that.page = 1;
					that.end = false;
					uni.getStorage({
						key:"geo",
						success: (res) => {
							if(res.errMsg=='getStorage:ok'){
								let geo = JSON.parse(res.data)
								let params = value === '' 
									?  {Lat:geo.lat,Lng:geo.lng,City:geo.city,Page:that.page,AppointmentTime: that.appointment}
									: {Lat:geo.lat,Lng:geo.lng,City:'',Page:that.page,AppointmentTime: that.appointment, Key: value}
								storeSearchV2(params).then(storeData =>{
									if(storeData.Code === 200){
										that.storeList = storeData.Data.StoreData
										that.recommend = storeData.Data.RecommendData
									}
								})
							}
						}
					})
				},50)
			},
			time(value){
				this.appointment = value
			}
		},
		methods: {
			close(){
				this.$emit('close')
			},
			openDatePicker(){
				this.$refs.datapicker.open()
			},
			chooseStore(id,name,priceArr,itemArr,active,open){
				console.log(open)
				if(!open) return false
				this.$emit("choose",id,name,priceArr,this.appointment,itemArr,active)
			},
			chooseAppointmentDate(value){
				this.appointment = value
				this.$refs.datapicker.close()
				let that = this
				this.page = 1
				that.end = false;
				uni.getStorage({
					key:"geo",
					success: (res) => {
						if(res.errMsg=='getStorage:ok'){
							let geo = JSON.parse(res.data)
							storeSearchV2({Lat:geo.lat,Lng:geo.lng,City:geo.city,Page:that.page,AppointmentTime: that.appointment}).then(storeData =>{
								if(storeData.Code === 200){
									that.storeList = storeData.Data.StoreData
									that.recommend = storeData.Data.RecommendData
								}
							})
						}
					}
				})
			},
			nextPage(){
				if(this.end) return false
				this.page ++ 
				let that = this
				uni.getStorage({
					key:"geo",
					success: (res) => {
						if(res.errMsg=='getStorage:ok'){
							let geo = JSON.parse(res.data)
							storeSearchV2({Lat:geo.lat,Lng:geo.lng,City:geo.city,Page:that.page,AppointmentTime: that.appointment}).then(storeData =>{
								if(storeData.Code === 200){
									if(storeData.Data.Count<5) that.end = true
									if(storeData.Data.Count>0){
										storeData.Data.StoreData.forEach((value,key)=>{
											that.storeList.push(value)
										})
									}
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.store-search{
		width: calc(100% - 36upx);
		height: calc(100% - 32upx);
		padding:16upx 18upx;
		padding-bottom:0;
		background:linear-gradient(180deg,rgba(254,81,0,0.35) 0%,rgba(254,140,0,0.3) 54%,rgba(255,255,255,0.31) 95%,rgba(255,255,255,1) 100%);
		.store-search-box{
			width: 100%;
			height:85upx;
			background:rgba(255,255,255,1);
			box-shadow:0upx 0upx 2upx 0upx rgba(0,0,0,0.5);
			border-radius:4upx;
			display: inline-flex;
			.store-search-time{
				width: 205upx;
				height:85upx;
				line-height: 85upx;
				flex-shrink: 0;
				font-size:22upx;
				text-align: center;
				font-weight:400;
				color:rgba(164,164,164,1);
				text{
					font-size:22upx;
				}
			}
			.store-search-input{
				width: 100%;
				height:85upx;
				flex-shrink: 1;
				input{
					width: 90%;
					font-size: 22upx;
					height:49upx;
					line-height: 49upx;
					margin-top:18.5upx;
					padding:0 5%;
					border-left:1upx solid rgba(0,0,0,0.1);
					border-right:1upx solid rgba(0,0,0,0.1);
				}
			}
			.store-search-button{
				width: 76upx;
				height:85upx;
				line-height: 85upx;
				flex-shrink: 0;
				text-align: center;
				font-weight:400;
				color:rgba(164,164,164,1);
				font-size:22upx;
			}
		}
		.store-list-box{
			width: 100%;
			height: calc(100% - 85upx);
			margin-top:16upx;
			background:white;
			border-top-left-radius: 4upx;
			border-top-right-radius: 4upx;
			box-shadow:0upx 0upx 2upx 0upx rgba(0,0,0,0.5);
			border-bottom:1px solid rgba(0,0,0,0.1);
			
			.store-list{
				width: calc(100% - 36upx);
				overflow: inherit;
				padding:18upx;
				display:inline-flex;
				justify-content: space-between;
				&-icon{
					width: 18upx;
					height: 18upx;
					border-radius: 18upx;
					background: #A4A4A4;
					margin-top:11upx;
					flex-shrink: 0;
				}
				&-icon.red{
					background:red;
				}
				
				&-content{
					width: calc(100% -14upx);
					overflow: hidden;
					padding-left:14upx;
					flex-shrink: 1;
					&-top{
						width: 100%;
						display:inline-flex;
						justify-content: space-between;
						&-title{
							width: 100%;
							flex-shrink: 1;
							font-size:29upx;
							font-weight:400;
							color:rgba(51,51,51,1);
							line-height:40upx;
							position: relative;
							label{
								width:80upx;
								height:24upx;
								background:rgba(254,140,0,1);
								border-radius:4upx;
								font-size:12upx;
								position: absolute;
								line-height: 24upx;
								margin-left:4upx;
								margin-top:-4upx;
								color:white;
								text-align: center;
							}
						}
						&-km{
							min-width:58upx;
							height:31upx;
							font-size:22upx;
							font-weight:400;
							color:rgba(164,164,164,1);
							line-height:40upx;
							flex-shrink: 0;
							text-align: right;
						}
					}
					&-middle{
						width: 100%;
						display:inline-flex;
						justify-content: space-between;
						margin-top:14upx;
						&-address{
							width: 100%;
							flex-shrink: 1;
							font-size:22upx;
							font-weight:400;
							color:rgba(164,164,164,1);
							line-height:31upx;
						}
						&-count{
							flex-shrink: 0;
							font-size:22upx;
							font-weight:400;
							color:rgba(164,164,164,1);
							line-height:31upx;
						}
					}
					&-bottom{
						width: 100%;
						display:inline-flex;
						justify-content: space-between;
						// justify-content: flex-start
						margin-top:14upx;
						&-label{
							display:inline-flex;
							flex-shrink: 1;
							max-width: 80%;
							label{
								height:30upx;
								border-radius:20upx;
								border:1upx solid rgba(95,95,95,1);
								padding:5upx 14upx;
								font-size:22upx;
								font-weight:400;
								color:rgba(95,95,95,1);
								line-height:30upx;
								margin-right:10upx;
								white-space : nowrap 
							}
						}
						&-hint{
							height:30upx;
							overflow: hidden;
							font-size:22upx;
							font-weight:400;
							color:rgba(95,95,95,1);
							line-height:30upx;
							margin-top:5upx;
							white-space : nowrap;
						}
						&-hint.red{
							color:#E02020;
						}
						&-rate{
							margin-top:6upx;
						}
					}
				}
			}
			
			.store-list.disabled{
				opacity: 0.5;
			}
			
		}
	}
</style>
