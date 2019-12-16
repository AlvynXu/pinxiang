<template>
	<view class="index-box">
		<px-message type="error"></px-message>
		<view class="index-header"></view>
		<view class="index-bg"></view>
		<view class="index-active">
			<view class="active">
				<view class="active-icon"><text class="vant-icon">&#xe60d;</text></view>
				<view class="active-span">会员年费最高799，全年免费保养</view>
				<view class="active-button"><button size="mini" :plain="true" @click="goBuyVip">点击开卡</button></view>
			</view>
		</view>
		<view class="appointment-box" v-if="payType === 0">
			<view class="appointment-header">
				<view class="appointment-type-list" v-for="(value, key) in appointmentType" :key="key" @click="changeAppointmentType(value.id)">
					<view class="appointment-type-list-span">{{value.name}}</view>
					<view class="appointment-type-list-bg" v-if="value.active">{{value.name}}</view>
				</view>
			</view>
			<view class="appointment-content">
				<view class="appointment-input-box">
					<view class="appointment-input">
						<view class="appointment-input-icon vant-icon input-address">&#xe6be;</view>
						<view class="appointment-input-cpn" @click="inputNumber" v-if="vip===0">
							<text style="color:#A4A4A4" v-if="formData.car==''">请输入车牌,如:浙A12345</text>
							<text v-else>{{formData.car}}</text>
						</view>
						<view class="appointment-input-cpn" @click="bindNumber" v-if="vip===1">
							<text style="color:#A4A4A4" v-if="formData.car==''">请输入车牌,如:浙A12345</text>
							<text v-else>{{formData.car}}</text>
						</view>
					</view>
					<view class="appointment-input">
						<view class="appointment-input-icon vant-icon">&#xe6c3;</view>
						<view class="appointment-input-cpn" @click="selectAppointmentDate">
							<text style="color:#A4A4A4" v-if="formData.time==''">预约到店时间</text>
							<text v-else>{{formData.time}}</text>
						</view>
					</view>
					<view class="appointment-input">
						<view class="appointment-input-icon vant-icon">&#xe6bf;</view>
						<view class="appointment-input-cpn" @click="selectAppointmentStore">
							<text style="color:#A4A4A4" v-if="formData.storeID==0">选择服务门店</text>
							<text v-else>{{formData.storeName}}</text>
						</view>
					</view>
					<view class="appointment-input" v-if="formData.price!==''">
						<view class="appointment-input-icon vant-icon">&#xe6c1;</view>
						<view class="appointment-input-cpn">
							<text v-if="!userData.Vip">订单金额 <text style="color:#FE5100">　￥{{formData.price}}</text></text>
							<text v-if="userData.Vip">订单金额 <text style="color:#FE5100">　会员免费</text></text>
						</view>
					</view>
					<view class="appointment-input" v-if="formData.price!=='' && !userData.Vip">
						<view class="appointment-input-icon vant-icon" style="color:#6DD400">&#xe6c0;</view>
						<view class="appointment-input-cpn">
							<text>单次体验会员</text>
						</view>
					</view>
				</view>
				<view class="appointment-hint" v-if="active && !userData.Vip">
					非会员用户首次预约，半价洗车
				</view>
				
				<view class="active-vip" v-if="joinVip">
					hhhhhhhhhhhh
				</view>
				<view class="joinVip">
					<view class="joinVip-radio"><view v-if="joinVip" class="vant-icon">&#xe6bd;</view></view>
					<view>加入会员，全年免费预约</view>
				</view>
				
				<view class="appointment-button">
					<button :plain="true" @click="goAppointment" v-if="userData.Phone">立即预约</button>
					<button :plain="true" v-if="userData.Phone ===''" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">立即预约</button>
				</view>
			</view>
		</view>
		<view class="appointment-box" v-if="payType !== 0">
			<view class="appointment-service-title">等待服务</view>
			<view class="appointment-service-content">
				<view class="appointment-service-content-pay" v-if="step===1">
					<view class="appointment-service-content-pay-icon"><image src="https://cdn.doudouxiongglobal.com/pinxiang/attention.png"></image></view>
					<view class="appointment-service-content-pay-text">预约成功，支付遇到了小问题，请在30分钟内完成付款，否则预约失效。是否继续？</view>
					<view class="appointment-service-content-pay-button"><button @click="cancelAppointment">取消</button><button class="confirm-button" @click="payAppointment">重新付款</button></view>
				</view>
				<view class="appointment-service-content-order-code" v-if="step!==1">
					<view class="appoint-service-content-order-avatar"><image mode="aspectFill" :src="avatar"></image></view>
					<view class="appoint-service-content-order-offerNumber">{{waitData.number.Number}}</view>
					<view class="appoint-service-content-order-wait" v-if="step===2">预计服务时间：{{waitData.waitTime}}</view>
					<view class="appoint-service-content-order-wait" v-if="step===3">开始服务时间：{{waitData.waitTime}}</view>
					<view class="appoint-service-content-order-count" v-if="step===2 && waitData.count===0">当前无需排队</view>
					<view class="appoint-service-content-order-count-red" v-if="step===2 && waitData.count>0">排队{{waitData.count}}人，预估等待{{waitData.wait}}分钟</view>
					<view class="appoint-service-content-order-count-red" v-if="step===3">已服务{{waitData.count}}分钟，预估还剩余{{waitData.wait}}分钟排队</view>
					<view class="appoint-service-content-order-hint">请在服务时间之前到店，过号自动延后一位</view>
				</view>
			</view>
			<view class="appointment-service-rate"><px-step :size="4" :step="step" :textArr="stepText"></px-step></view>
		</view>
		<view class="banner-box" v-if="step === 0 || step === 1">
			<view class="announcement">公告 | 已帮助<text>{{useCount}}</text>车主节省了时间</view>
			<view class="banner-swiper-box">
				<swiper class="swiper" circular="true" 
				:current="current" :autoplay="true" 
				:indicator-dots="true" indicator-color="#FFFFFF" indicator-active-color="#FE5100" 
				:interval="2000" :duration="500" :circular="true">
					<swiper-item v-for="(val,key) in swiperList" :key="key">
						<image class="swiper-img" :src="val.Image" mode="aspectFill" :lazy-load="true"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view v-if="step !== 0 && step !== 1">
			
		</view>
		<px-popdown :height="'527rpx'" ref="datapicker" title="请选择预约时间">
			<px-datepicker @choose="chooseAppointmentDate" v-model="formData.time"></px-datepicker>
		</px-popdown>
		<px-popright ref="storepicker" :width="'100vw'">
			<store-search :time="formData.time" :type="formData.type" @close="storeSearchClose" @choose="chooseStore" appointmentTime="formData.time"></store-search>
		</px-popright>
		<plate-number ref="plate" v-model="formData.car"></plate-number>
	</view>
</template>

<script>
	import {
		getStore,
		getToken,
		getBanner,
		changePhone,
		decryptPhone,
		appointmentV2,
		payDetailOne,
		payOne,
		getAppointmentV2,
		getAppointmentDetail,
		cancleOrder,
		offerNumber,
		usedCount,
		useCarNumber
	} from "@/api/index.js"
	
	import plateNumber from '@/components/plate-number/plateNumber.vue';
	import pxPopdown from '@/components/px-popup/px-popdown.vue';
	import pxPopright from '@/components/px-popup/px-popright.vue';
	import pxDatepicker from '@/components/px-datepicker/px-datepicker.vue';
	import storeSearch from '@/components/store-search/storeSearchV2.vue';
	import pxStep from '@/components/px-step/px-step.vue'
	import pxMessage from '@/components/px-message/px-message.vue'
	
	export default{
		components: {plateNumber,pxPopdown,pxPopright,pxDatepicker,storeSearch,pxStep,pxMessage},
		data() {
			return {
				joinVip:false,
				step:1,
				useCount:0,
				avatar:'',
				stepText:['预约成功','等待服务','开始服务','结束服务'],
				current:0,
				swiperList:[],
				appointmentType:[
					{id:0, name:"洗车服务",active:1},
					{id:1, name:"半合成保养",active:0},
					{id:2, name:"全合成保养",active:0},
				],
				storeItems:[],
				priceArr:[],
				userData:[],
				appointmentData:[],
				active:0,
				payType:0,
				qrCode:'',
				vip:0,
				waitData:{number:0,count:0,wait:0,waitTime:''},
				formData:{
					type:0,
					car:'',
					time:'',
					storeID:0,
					storeName:'',
					price:''
				}
			}
		},
		methods:{
			changeAppointmentType(id){
				let that = this
				this.formData.type = id
				for (let i=0; i<that.appointmentType.length;i++){
					that.appointmentType[i].active = 0;
					if (that.appointmentType[i].id === id) that.appointmentType[i].active = 1;
				}
				if(this.formData.price === '') return false;
				this.formData.price = this.priceArr[id]
				if(this.formData.type === 0 && this.active){
					this.formData.price = parseInt(this.formData.price)/2
				}
			},
			inputNumber(){
				this.$refs.storepicker.close()
				this.$refs.datapicker.close()
				this.$refs.plate.show();
			},
			bindNumber(){
				if(this.formData.car === ''){
					wx.navigateTo({
						url:"/pages/userSub/car"
					})
				}
			},
			selectAppointmentDate(){
				this.$refs.plate.close();
				this.$refs.storepicker.close()
				this.$refs.datapicker.open()
			},
			chooseAppointmentDate(value){
				this.formData.time = value
				this.$refs.datapicker.close()
			},
			selectAppointmentStore(){
				this.$refs.plate.close();
				this.$refs.datapicker.close()
				this.$refs.storepicker.open()
			},
			storeSearchClose(){
				this.$refs.storepicker.close()
			},
			goBuyVip(){
				uni.navigateTo({
					url:"/pages/userSub/active"
				})
			},
			chooseStore(id,name,price,time,items,active){
				this.active = active
				this.priceArr = price
				this.formData.time = time
				this.formData.storeName = name
				this.formData.storeID = id
				this.formData.price = this.priceArr[this.formData.type]
				this.storeItems = items
				if(this.formData.type === 0 && active){
					this.formData.price = parseInt(this.formData.price)/2
				}
				this.storeSearchClose()
			},
			goLogin(){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			},
			getPhoneNumber(e){
				let that = this
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
				if(e.detail.errMsg === 'getPhoneNumber:ok'){
					let wxOpenID = uni.getStorageSync('wxOpenID')
					decryptPhone({'OpenID':wxOpenID,'Encrypt':e.detail.encryptedData,'IV':e.detail.iv}).then(res => {
						if(res.Code === 200){
							that.userData.phone = res.Data.Phone
							changePhone({Phone:res.Data.Phone}).then(response =>{
								if(response.Code === 200){
									let userData = uni.getStorageSync('user_data')
									userData = JSON.parse(userData)
									userData['Phone'] = res.Data.Phone
									that.userData.Phone = res.Data.Phone
									uni.setStorageSync('user_data',JSON.stringify(userData))
									that.goAppointment()
								}
							})
						}
					})
				}
			},
			payAppointment(){ // 未付款重复支付
				let that = this
				this.goBuy({
					OpenID: uni.getStorageSync('wxOpenID'),
					Type:that.appointmentData.Type,
					StoreID:that.appointmentData.StoreID,
					Extra:that.appointmentData.ID
				})
			},
			cancelAppointment(){
				let that = this
				wx.showModal({
					title:'提醒',
					content:"确认取消吗？您的预约信息将会失效哦",
					confirmText:'确认',
					success (res) {
					    if (res.confirm) {
							cancleOrder(that.appointmentData.ID,{CancelReason:'取消支付'}).then(res =>{
								if(res.Code === 200){
									that.resetData()
								}
							})
					      // window.location.href = '/login'
					    } else if (res.cancel) {
					      console.log('用户点击取消')
					    }
					}
				})
			},
			goBuy(params){
				let that = this
				payDetailOne(params).then(detail=>{
					if(detail.Code === 200){
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: detail.Data.timestamp.toString(),
							nonceStr: detail.Data.nonce_str,
							package: `prepay_id=${detail.Data.prepay_id}`,
							signType: 'MD5',
							paySign: detail.Data.sign,
							success: function (res) {
								console.log('success:' + JSON.stringify(res));
								if(res.errMsg=='requestPayment:ok'){
									payOne({OrderNo:detail.Data.order_number}).then(r=>{
										if(r.Code === 200){
											uni.shwoToast({
												title:"支付成功"
											})
										}
										that.resetData()
									})
								}else{
									wx.showToast({
										title:"支付失败",
										icon:"none"
									})
									that.resetData()
								}
								that.resetData()
							},
							fail: function (err) {
								console.log('fail:' + JSON.stringify(err));
								that.resetData()
							}
						});
					}
				})
			},
			goAppointment(){
				let that = this
				if(this.userData.length === 0){
					return this.goLogin()
				}
				if(this.formData.car === '') return uni.showToast({
					icon:"none",
					title:"请输入车牌号"
				})
				if(this.formData.time === '') return uni.showToast({
					icon:'none',
					title:"请选择预约时间"
				})
				if(this.formData.storeID === 0) return uni.showToast({
					icon:'none',
					title:"请选择门店"
				})
				let storeItemID = this.storeItems[this.formData.type]
				uni.setStorageSync('carNumber',this.formData.car)
				offerNumber({
					'AppointmentTime':this.formData.time,
					'StoreID':this.formData.storeID,
					'Type':1,
					'ServiceType':this.formData.type,
					'StoreItemID':storeItemID,
					'Phone':this.userData.Phone,
					'CarNumber': this.formData.car
				}).then(response =>{
					if(response.Code === 200){
						if(that.userData.Vip){
							return uni.showToast({
								title:"预约成功"
							})
							that.resetData()
						}
						let orderID = response.Data.ID
						that.goBuy({
							OpenID: uni.getStorageSync('wxOpenID'),
							Type:that.formData.type,
							StoreID:that.formData.storeID,
							Extra:orderID
						})
					}
				})
			},
			resetData(){
				let that = this
				that.formData = {
					type:0,
					car:'',
					time:'',
					storeID:0,
					storeName:'',
					price:''
				}
				let userData = uni.getStorageSync('user_data')
				if(userData === null || userData === undefined || userData === '') return false
				this.userData = JSON.parse(userData)
				getAppointmentV2({}).then(res=>{
					if(res.Code === 200){
						if(res.Data.Type === 0) that.step = that.payType = 0
						if(res.Data.Type === 1) that.step = 1
						if(res.Data.Type === 2) that.step = 2
						if(res.Data.Type === 4) that.step = 3
						if(res.Data.Type!==0){
							that.payType = 1
							that.appointmentData = res.Data.Appointment
							getAppointmentDetail(res.Data.Appointment.ID,{}).then(res=>{
								if(res.Code === 200) {
									that.qrCode = res.Data.QrCode
								}
							})
							that.waitData.number = res.Data.Number,
							that.waitData.count = res.Data.Count,
							that.waitData.wait = res.Data.Wait
							that.waitData.waitTime = res.Data.WaitTime
						}
						
					}
				})
			}
		},
		onShow() {
			let that = this
			this.resetData()
			let formData = getApp().globalData.formData
			if(formData != undefined && formData != [] && formData.length>0){
				this.formData.type = formData.type
				this.formData.storeID = formData.storeID,
				this.formData.storeName = formData.storeName,
				this.formData.price = formData.price
				getApp().globalData.formData = []
			}
			useCarNumber({}).then(res=>{
				if(res.Code === 200){
					if(res.Data == 'needBind'){
						console.log("需要绑定")
						return false;
					}
					if(res.Data !== ''){
						that.formData.car = res.Data
					}
				}
			})
		},
		onLoad(option) {
			let that = this
			getBanner({Type:1}).then(bannerData=>{
				if(bannerData.Code === 200){
					that.swiperList = bannerData.Data
				}
			})
			usedCount({}).then(res => {
				if(res.Code === 200){
					that.useCount = res.Data
				}
			})
			
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
							}
						}
					});
				}
			})
			let token = uni.getStorageSync('api_token')
			if(token === null || token === undefined || token === '') return this.goLogin()
			let userData = uni.getStorageSync('user_data')
			if(userData === null || userData === undefined || userData === '') return this.goLogin()
			this.userData = JSON.parse(userData)
			this.avatar = this.userData.Avatar
			this.vip = this.userData.Vip
			console.log(this.vip)
		}	
	}
</script>

<style scoped lang="scss">
	.index-box{
		width: 750upx;
		position: relative;
		.index-header{
			width: 100%;
			height:1upx;
		}
		.index-bg{
			position: absolute;
			top:0;
			left:0;
			z-index:-1;
			width: 750upx;
			height: 100vh;
			background:linear-gradient(180deg,rgba(254,81,0,0.35) 0%,rgba(254,140,0,0.3) 54%,rgba(255,255,255,0.31) 91%,rgba(255,255,255,1) 100%,rgba(255,255,255,1) 100%);
		}
		.index-active{
			width: 674upx;
			height: 54upx;
			padding: 18upx 20upx;
			margin:0 auto;
			margin-top:15upx;
			background-color:white;
			box-shadow:0upx 0upx 2upx 0upx rgba(0,0,0,0.5);
			border-radius:4upx;
			.active{
				width: 100%;
				height: 100%;
				display:inline-flex;
				justify-content: space-between;
				&-icon{
					width: 54upx;
					height: 54upx;
					border-radius: 54upx;
					background-color: #F7F7F7;
					flex-shrink: 0;
					text-align: center;
					.vant-icon{
						line-height: 54upx;
						color:#A4A4A4;
						margin:0 auto;
					}
				}
				&-span{
					width: 100%;
					height: 54upx;
					flex-shrink: 1;
					font-size:25upx;
					font-weight:400;
					color:rgba(164,164,164,1);
					line-height: 54upx;
					margin-left:20upx;
				}
				&-button{
					width:129upx;
					height:47upx;
					margin-top:4.5upx;
					flex-shrink: 0;
					background:rgba(255,255,255,1);
					button{
						width: 125upx;
						height:43upx;
						line-height: 43upx;
						font-size:27upx;
						font-weight:400;
						color:rgba(254,81,0,1);
						border:2upx solid rgba(254,81,0,1);
						padding:0;
						border-radius: 0;
					}
					
				}
			}
			
		}
		
		.appointment-box{
			width: 674upx;
			padding: 27upx 20upx;
			margin:0 auto;
			margin-top:20upx;
			background-color:white;
			box-shadow:0upx 0upx 2upx 0upx rgba(0,0,0,0.5);
			border-radius:6upx;
			.appointment-service-title{
				height:40upx;
				font-size:29upx;
				font-weight:500;
				color:rgba(95,95,95,1);
				line-height:40upx;
				text-align: center;
			}
			.appointment-service-content{
				width: 100%;
				margin:0 auto;
				&-pay{
					margin:0 auto;
					width: 100%;
					margin-top:67upx;
					&-icon{
						width: 71upx;
						height: 71upx;
						margin:0 auto;
						image{
							width: 100%;
							height: 100%;
						}
					}
					&-text{
						width: 80%;
						margin:0 auto;
						margin-top:45upx;
						font-size:33upx;
						font-weight:400;
						color:rgba(51,51,51,1);
						line-height:45upx;
					}
					&-button{
						width: 80%;
						display:inline-flex;
						justify-content: space-between;
						margin:0 10%;
						margin-top:67upx;
						margin-bottom:67upx;
						button{
							width:40%;
							height:72upx;
							line-height: 72upx;
							background:white;
							font-size:29upx;
							font-weight:400;
						}
						.confirm-button{
							background:#FE5100;
							border:none;
							color:white;
						}
					}
				}
				&-order-code{
					width: 100%;
					margin: 0 auto;
					.coupon-ewm-image{
						width: 100%;
					}
					.appoint-service-content-order-avatar{
						width:174upx;
						height:174upx;
						margin:0 auto;
						margin-top:45upx;
						overflow: hidden;
						border-radius: 174upx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.appoint-service-content-order-offerNumber{
						width: 100%;
						text-align: center;
						font-size:65upx;
						font-weight:600;
						color:rgba(95,95,95,1);
						line-height:91upx;
						margin-top:25upx;
					}
					.appoint-service-content-order-wait{
						width: 100%;
						text-align: center;
						margin-top:5upx;
						font-size:24upx;
						font-weight:400;
						color:rgba(95,95,95,1);
						line-height:33upx;
					}
					.appoint-service-content-order-count{
						width: 100%;
						text-align: center;
						font-size:33upx;
						font-weight:500;
						color:rgba(68,181,73,1);
						line-height:45upx;
						margin-top:36upx
					}
					.appoint-service-content-order-count-red{
						width: 100%;
						text-align: center;
						font-size:33upx;
						font-weight:500;
						color:#FE5100;
						line-height:45upx;
						margin-top:36upx
					}
					.appoint-service-content-order-hint{
						font-size:24upx;
						font-weight:400;
						color:rgba(216,216,216,1);
						line-height:33upx;
						width: 100%;
						text-align: center;
						margin-top:38upx;
					}
				}
			}
			
			.appointment-service-rate{
				width: 100%;
			}
			.appointment-header{
				width: 584upx;
				height:54upx;
				display:inline-flex;
				margin:0 45upx;
				justify-content: space-between;
				.appointment-type-list{
					height:54upx;
					padding:0upx 14upx;
					position: relative;
					&-span{
						font-size:29upx;
						font-weight:400;
						color:rgba(51,51,51,1);
						line-height:54upx;
					}
					&-bg{
						position: absolute;
						top:0;left:0;
						width: 100%;
						height:100%;
						background:rgba(254,81,0,1);
						border-radius:27upx;
						z-index:1;
						font-size:29upx;
						font-weight:400;
						color:#FFFFFF;
						line-height:54upx;
						text-align: center;
					}
				}
			}
			.appointment-content{
				width: 100%;
				margin-top: 89upx;
				.appointment-input-box{
					width: 100%;
					.appointment-input{
						width: 100%;
						display:inline-flex;
						justify-content: space-between;
						margin-bottom:56upx;
						&-icon{
							flex-shrink: 0;
							font-size:36upx;
							font-weight:400;
							color:#FE8C00;
							vertical-align: middle;
							padding:0;
							margin:0;
							padding-top:10upx;
							margin-left: 10upx;
						}
						&-cpn{
							width: 100%;
							min-height: 56upx;
							font-size:25upx;
							font-weight:400;
							color:#333333;
							line-height:56upx;
							vertical-align: middle;
							margin-left:14upx;
							border-bottom: 1px solid rgba(0,0,0,0.1);
							position: relative;
							
						}
						.input-address{
							color:#000A82;
							font-size: 27upx;
							padding-top:16upx;
						}
					}
				}
				.appointment-button{
					width: 100%;
					button{
						width:402upx;
						height:72upx;
						background:rgba(254,81,0,1);
						border-radius:27upx;
						border:none;
						font-size:33upx;
						font-family:PingFangSC-Medium,PingFang SC;
						color:rgba(255,255,255,1);
						line-height:72upx;
						letter-spacing:18upx;
						margin-bottom:27upx;
					}
				}
			}
		}
		.banner-box{
			width: 100%;
			background-color:white;
			padding: 16upx 0;
			margin-top:27upx;
			box-shadow:0upx 0upx 2upx 0upx rgba(0,0,0,0.5);
			border-radius:4upx;
			.announcement{
				width: 100%;
				text-align: center;
				font-size:25upx;
				font-weight:400;
				color:rgba(95,95,95,1);
				line-height:36upx;
				text{
					color:#FE8C00;
					margin:0 6upx;
				}
			}
			.banner-swiper-box{
				width: 714upx;
				height: 236upx;
				margin:0 auto;
				margin-top:18upx;
				margin-bottom:4upx;
				.swiper{
					width:714upx;
					height:236upx;
					.swiper-img{
						width:714upx;
						height:236upx;
					}
				}
			}
		}
	}
	.appointment-hint{
		width: 100%;
		text-align: center;
		font-size:27upx;
		font-weight:400;
		color:rgba(254,81,0,1);
		line-height:38upx;
		margin-bottom:4upx;
	}
</style>
