<template>
	<view>
		<view class="header-box">
			<!-- 状态栏 -->
			<view class="status_bar"></view>
			<view class="header-box-title">品象养车</view>
			<view class="header-address-box" @tap="chooseArea">
				<text class="vant-icon header-address-icon">&#xe68f;</text>
				<text class="header-address-text">{{area}}</text>
			</view>
		</view>
		<view style="height: 158upx;"></view>
		<view class="body-box">
			<view class="index-active">
				<view class="active">
					<view class="active-icon"><text class="vant-icon">&#xe60d;</text></view>
					<view class="active-span">会员年费最高799，全年免费保养</view>
					<view class="active-button"><button size="mini" :plain="true" @click="goBuyVip">点击开卡</button></view>
				</view>
			</view>
			<view class="appointment-box">
				<view class="appointment-box-type">
					<view class="appointment-type-list" v-for="(value, key) in appointmentType" :key="key" @click="changeAppointmentType(value.id)">
						<view class="appointment-type-list-span">{{value.name}}</view>
						<view class="appointment-type-list-bg" v-if="value.active">{{value.name}}</view>
					</view>
				</view>
				<view class="appointment-box-contion">
					<view class="appointment-input">
						<view class="appointment-input-icon vant-icon input-address">&#xe6be;</view>
						<view class="appointment-input-cpn" @click="inputNumber">
							<text style="color:#A4A4A4" v-if="formData.car==''">请输入车牌,如:浙A12345</text>
							<text v-else>{{formData.car}}</text>
						</view>
					</view>
					<view class="appointment-input">
						<view class="appointment-input-icon vant-icon">&#xe6bf;</view>
						<view class="appointment-input-cpn" @click="selectAppointmentStore">
							<text style="color:#A4A4A4" v-if="formData.storeID==0">选择服务门店</text>
							<text v-else>{{formData.storeName}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="takeTheNumber">
				<view class="takeNumber-circular">
					<view class="circular1" @click="takeNumber">
						<view class="circular2">
							<view>排队</view>
							<view>取号</view>
						</view>
					</view>
				</view>
				<view class="takeNumber-text">当前时间2位车主排队，预计排队时长20分钟</view>
			</view>
		</view>
		<px-popright ref="storepicker" :width="'100vw'">
			<view class="header-box">
				<!-- 状态栏 -->
				<view class="status_bar"></view>
				<view class="header-box-title">品象养车</view>
				<view class="header-address-box" @tap="chooseArea">
					<text class="vant-icon header-address-icon">&#xe68f;</text>
					<text class="header-address-text">{{area}}</text>
				</view>
			</view>
			<view style="height: 158upx;"></view>
			<store-search :time="formData.time" :type="formData.type" @close="storeSearchClose" @choose="chooseStore"
			 appointmentTime="formData.time"></store-search>
		</px-popright>
		<plate-number ref="plate" v-model="formData.car" @showOrHide="showOrHide"></plate-number>
	</view>
</template>

<script>
	import {
		getStore
	} from "@/api/index.js"
	import pxPopright from '@/components/px-popup/px-popright.vue';
	import storeSearch from '@/components/store-search/storeSearchV2.vue';
	import plateNumber from '@/components/plate-number/plateNumber.vue';

	export default {
		components: {
			pxPopright,
			storeSearch,
			plateNumber
		},
		data() {
			return {
				appointmentType: [{
						id: 0,
						name: "洗车服务",
						active: 1
					},
					{
						id: 1,
						name: "半合成保养",
						active: 0
					},
					{
						id: 2,
						name: "全合成保养",
						active: 0
					},
				],
				formData: {
					type: 0, //服务类型
					car: '', //车牌号
					storeID: 0,
					storeName: '', //门店名称
					time: '',
					price: ''
				},
				storeItems: [],
				priceArr: [],
				area: '',
				city: '',
				address: '',
				lat: "",
				lng: '',
				storeList: [], //店铺列表
				recommend: [],
				platform: '',
				page: 1,
				end: false
			}
		},
		//页面加载获取定位
		async onLoad() {
			let that = this
			uni.getStorage({
				key: "geo",
				success(res) {
					console.log(res.data)
					if (res.data != undefined) {
						res = JSON.parse(res.data)
						getStore({
							'Lat': res.lat,
							'Lng': res.lng,
							'City': res.city,
							'Page': that.page
						}).then(storeData => {
							if (storeData.Code === 200) {
								if (storeData.Data.StoreData.length === 0) {
									uni.showToast({
										icon: "none",
										title: "该地区门店正在更新中"
									})
								}
								that.storeList = storeData.Data.StoreData
								that.recommend = storeData.Data.RecommendData
								if (storeData.Data.Count < 5) {
									that.end = true
								}
							}
						});
					}

				}
			})
			wx.getLocation({
				type: 'gcj02',
				success(res) {
					console.log("定位", (new Date).getMilliseconds())
					that.lat = res.latitude
					that.lng = res.longitude

					uni.request({
						header: {
							"Content-Type": "application/text"
						},
						url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude +
							'&key=QKLBZ-JNMC4-W2EUA-XOZ7H-DOVF2-D5FTJ',
						success(re) {
							if (re.statusCode === 200) {
								console.log("位置", (new Date).getMilliseconds())
								that.area = re.data.result.address_component.street
								that.city = re.data.result.address_component.city
								uni.setStorageSync('geo', JSON.stringify({
									'lat': res.latitude,
									'lng': res.longitude,
									'province': re.data.result.address_component.province,
									'city': re.data.result.address_component.city,
									'area': re.data.result.address_component.district,
									'address': re.data.result.address
								}))
								getStore({
									'Lat': res.latitude,
									'Lng': res.longitude,
									'City': re.data.result.address_component.city,
									'Page': that.page
								}).then(storeData => {
									if (storeData.Code === 200) {
										if (storeData.Data.StoreData.length === 0) {
											uni.showToast({
												icon: "none",
												title: "该地区门店正在更新中"
											})
										}
										that.storeList = storeData.Data.StoreData
										that.recommend = storeData.Data.RecommendData
										if (storeData.Data.Count < 5) {
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
			//排队取号
			takeNumber(){
				console.log(this.formData,'排队预约信息')
			},
			//填写车牌号
			inputNumber() {
				this.$refs.storepicker.close();
				this.$refs.plate.show();
			},
			//选择门店弹窗显示
			selectAppointmentStore() {
				this.$refs.storepicker.open();
				this.$refs.plate.close();
			},
			//关闭门店选择弹窗
			storeSearchClose() {
				this.$refs.storepicker.close()
			},
			//选择门店
			chooseStore(id, name, price, time, items, active) {
				this.active = active
				this.priceArr = price
				this.formData.time = time
				this.formData.storeName = name
				this.formData.storeID = id
				this.formData.price = this.priceArr[this.formData.type]
				this.storeItems = items
				console.log(this.formData.time, this.formData.storeID)
				this.storeSearchClose()
			},
			//选择预约服务类型
			changeAppointmentType(id) {
				let that = this
				this.formData.type = id
				for (let i = 0; i < that.appointmentType.length; i++) {
					that.appointmentType[i].active = 0;
					if (that.appointmentType[i].id === id) that.appointmentType[i].active = 1;
				}
			},
			//更改位置信息
			chooseArea() {
				let that = this
				wx.chooseLocation({
					success(res) {
						console.log(res)
						that.page = 1
						that.area = res.name
						that.lat = res.latitude
						that.lng = res.longitude
						uni.request({
							header: {
								"Content-Type": "application/text"
							},
							url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude +
								'&key=QKLBZ-JNMC4-W2EUA-XOZ7H-DOVF2-D5FTJ',
							success(re) {
								if (re.statusCode === 200) {
									console.log(re)
									that.city = re.data.result.address_component.city
									uni.setStorageSync('geo', JSON.stringify({
										'lat': res.latitude,
										'lng': res.longitude,
										'province': re.data.result.address_component.province,
										'city': re.data.result.address_component.city,
										'area': re.data.result.address_component.district,
										'address': re.data.result.address
									}))
									getStore({
										'Lat': res.latitude,
										'Lng': res.longitude,
										'City': re.data.result.address_component.city,
										'Page': that.page
									}).then(storeData => {
										if (storeData.Code === 200) {
											if (storeData.Data.StoreData.length === 0) {
												uni.showToast({
													icon: "none",
													title: "该地区门店正在更新中"
												})
											}
											that.storeList = storeData.Data.StoreData
											that.recommend = storeData.Data.RecommendData
											if (storeData.Data.Count < 5) {
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

<style scoped lang="scss">
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.header-box {
		position: fixed;
		top: 0;
		left: 0;
		width: 750upx;
		height: 158upx;
		background: #FCFCFC;
		overflow: hidden;
		z-index: 100;

		.header-box-title {
			width: 100%;
			line-height: 110upx;
			font-size: 33upx;
			font-family: PingFangSC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			text-align: center;
		}

		.header-address-box {
			position: absolute;
			top: 75upx;
			left: 34upx;

			.header-address-icon {
				font-size: 30upx;
				color: #A4A4A4;
				vertical-align: middle;
			}

			.header-address-text {
				display: inline-block;
				margin-left: -10upx;
				font-size: 25upx;
				line-height: 30upx;
				width: 150upx;
				overflow: hidden;
				/*超出部分隐藏*/
				text-overflow: ellipsis;
				/* 超出部分显示省略号 */
				white-space: nowrap;
				/*规定段落中的文本不进行换行 */
				color: #A4A4A4;
				vertical-align: middle;
			}
		}
	}

	.body-box {
		height: 90vh;
		padding-top: 10upx;
		background: linear-gradient(180deg, rgba(254, 81, 0, 0.35) 0%, rgba(254, 140, 0, 0.3) 54%, rgba(255, 255, 255, 0.31) 91%, rgba(255, 255, 255, 1) 100%, rgba(255, 255, 255, 1) 100%);

		.index-active {
			width: 674upx;
			height: 54upx;
			padding: 18upx 20upx;
			margin: 0 auto;
			background-color: white;
			box-shadow: 0upx 0upx 2upx 0upx rgba(0, 0, 0, 0.5);
			border-radius: 4upx;

			.active {
				width: 100%;
				height: 100%;
				display: inline-flex;
				justify-content: space-between;

				&-icon {
					width: 54upx;
					height: 54upx;
					border-radius: 54upx;
					background-color: #F7F7F7;
					flex-shrink: 0;
					text-align: center;

					.vant-icon {
						line-height: 54upx;
						color: #A4A4A4;
						margin: 0 auto;
					}
				}

				&-span {
					width: 100%;
					height: 54upx;
					flex-shrink: 1;
					font-size: 25upx;
					font-weight: 400;
					color: rgba(164, 164, 164, 1);
					line-height: 54upx;
					margin-left: 20upx;
				}

				&-button {
					width: 129upx;
					height: 47upx;
					margin-top: 4.5upx;
					flex-shrink: 0;
					background: rgba(255, 255, 255, 1);

					button {
						width: 125upx;
						height: 43upx;
						line-height: 43upx;
						font-size: 27upx;
						font-weight: 400;
						color: rgba(254, 81, 0, 1);
						border: 2upx solid rgba(254, 81, 0, 1);
						padding: 0;
						border-radius: 0;
					}

				}
			}

		}

		.appointment-box {
			width: 674upx;
			padding: 27upx 20upx;
			margin: 0 auto;
			margin-top: 20upx;
			background-color: white;
			box-shadow: 0upx 0upx 2upx 0upx rgba(0, 0, 0, 0.5);
			border-radius: 6upx;

			.appointment-box-type {
				width: 584upx;
				height: 54upx;
				display: inline-flex;
				margin: 0 45upx;
				justify-content: space-between;

				.appointment-type-list {
					height: 54upx;
					padding: 0upx 14upx;
					position: relative;

					&-span {
						font-size: 29upx;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
						line-height: 54upx;
					}

					&-bg {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background: rgba(254, 81, 0, 1);
						border-radius: 27upx;
						z-index: 1;
						font-size: 29upx;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 54upx;
						text-align: center;
					}
				}
			}

			.appointment-box-contion {
				padding-top: 80upx;

				.appointment-input {
					width: 100%;
					display: inline-flex;
					justify-content: space-between;
					margin-bottom: 36upx;

					&-icon {
						flex-shrink: 0;
						font-size: 36upx;
						font-weight: 400;
						color: #FE8C00;
						vertical-align: middle;
						padding: 0;
						margin: 0;
						padding-top: 10upx;
						margin-left: 10upx;
					}

					&-cpn {
						width: 100%;
						min-height: 56upx;
						font-size: 25upx;
						font-weight: 400;
						color: #333333;
						line-height: 56upx;
						vertical-align: middle;
						margin-left: 14upx;
						border-bottom: 1px solid rgba(0, 0, 0, 0.1);
						position: relative;

					}

					.input-address {
						color: #000A82;
						font-size: 27upx;
						padding-top: 16upx;
					}
				}
			}
		}

		.takeTheNumber {
			.takeNumber-text{
				padding-top: 30upx;
				font-size:25upx;
				font-weight:400;
				text-align: center;
				color:rgba(51,51,51,1);
			}
			
			.takeNumber-circular {
				padding-top: 200upx;
				display: flex;
				justify-content: center;
				width: 750upx;

				.circular1 {
					width: 218upx;
					height: 218upx;
					border-radius: 50%;
					background-color: #FE5100;
					border: 9upx solid #FE854C;
					position: relative;
					margin-bottom: 20upx;
				}

				.circular2 {
					position: absolute;
					left: 9upx;
					top: 9upx;
					box-sizing: border-box;
					color: #FFFFFF;
					font-size: 36upx;
					font-weight: 500;
					width: 200upx;
					height: 200upx;
					border-radius: 50%;
					background-color: #FE9766;
					border: 9upx solid #FE854C;
					display: flex;
					justify-content: center;
					flex-direction: column;
					align-items: center;
				}
			}
		}
	}
</style>
