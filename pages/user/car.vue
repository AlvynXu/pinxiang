<template>
	<view class="car-box">
		<view class="gray"></view>
		<view class="car-num">
			<view class="car-num-left">车牌号：</view>
			<view class="car-num-right">
				<input class="uni-input" v-show="type==3 || type==2" :value="carNumber" @input="carNumInput" placeholder="浙A123456" placeholder-style="color:#f3f3f3;" />
				<input class="uni-input" v-show="type==1 || type==0" :value="carNumber" :disabled="true" />
			</view>
		</view>
		<view class="car-img">
			<view class="car-img-top">行驶证：</view>
			<view class="car-img-bot1" @click="chooseImage" v-show="chooseImg"><view class="vant-icon">&#xe65c;</view></view>
			<view class="show-img" v-show="showImg" @click="chooseImage"><image mode="aspectFill" :src="driverLicense"></image></view>
			<view class="car-img-bot2" @click="chooseImage2" v-show="chooseImg2"><view class="vant-icon">&#xe65c;</view></view>
			<view class="show-img" v-show="showImg2" @click="chooseImage2"><image mode="aspectFill" :src="dLSubPage"></image></view>
		</view>
		<view class="car-img">
			<view class="car-img-top">后车身45度照片：</view>
			<view class="car-img-bot3" @click="chooseImage3" v-show="chooseImg3"><view class="vant-icon">&#xe65c;</view></view>
			<view class="show-img" v-show="showImg3" @click="chooseImage3"><image mode="aspectFill" :src="carImg"></image></view>
		</view>
		<view style="position: relative;">
			<view class="car-discern" v-if="type===0 || type===1 || type===2">
				<view class="car-discern-left">车辆识别代码号(VIN码)：</view>
				<view class="car-discern-right"><input :value="vin" :disabled="true" class="uni-input" /></view>
			</view>
			<view class="car-enginen" v-if="type!=3">
				<view class="car-enginen-left">发动机号码：</view>
				<view class="car-enginen-right"><input :value="engineNumber" :disabled="true" class="uni-input" /></view>
			</view>
			<view class="car-enginen" v-if="type!=3">
				<view class="car-enginen-left">车辆类型：</view>
				<view class="car-enginen-right"><input :value="carType" :disabled="true" class="uni-input" /></view>
			</view>
			<view class="car-enginen" v-if="type!=3">
				<view class="car-enginen-left">核定载人数：</view>
				<view class="car-enginen-right"><input :value="persons" :disabled="true" class="uni-input" /></view>
			</view>
			<view class="mask" v-show="type == 0">行驶证认证通过后自动完善</view>
		</view>
		
		<view class="car-button" v-show="type===3"><button @click="addDriverFunc">提交</button></view>
		<view class="shenhe-mask" v-show="type == 0">材料审核…</view>
		<view class="shenhe-word" v-show="type == 0">行驶证信息正在人工审核中，请耐心等待</view>
	</view>
</template>

<script>
import { uploadCarImg, h5UploadKey,getDriver,addDriver } from '@/api/index';
import qiniuUploader from '@/utils/qiniuUploader.js';

function initQiniu() {
	
}
export default {
	data() {
		return {
			type: 3,
			driverLicense: '',
			dLSubPage: '',
			carImg: '',
			chooseImg: true,
			showImg: false,
			chooseImg2: true,
			showImg2: false,
			chooseImg3: true,
			showImg3: false,
			uptoken:'',
			imageObject:[],
			domain: 'https://cdn.doudouxiongglobal.com',
			carNumber:'',
			vin:'',
			engineNumber:'',
			carType:'',
			persons:''
		};
	},
	async onLoad() {
		let key="g3Y7NQmKSFb6Oyu91yOERMpLYcw9goCeteodilEQ"
		let uptoken = await h5UploadKey({key:key,bucket:'doudouxiong'})
		let driverData = await getDriver({});
		if(driverData.Code === 200){
			if(driverData.Data.length>0){
				console.log(1)
				let data = driverData.Data
				this.type = parseInt(data.Status)
				this.driverLicense = data.DriverLicense
				this.dLSubPage = data.DLSubPage
				this.carImg = data.CarImage
				this.chooseImg = false
				this.showImg = true
				this.chooseImg2 = false
				this.showImg2 = true
				this.chooseImg3 = false
				this.showImg3 = true
				this.carNumber = data.CarNumber
				this.vin = data.VIN
				this.engineNumber = data.EngineNumber
				this.carType = (data.CarType) ? '营运' : '非营运'
				this.persons = data.Persons
			}
		}
		qiniuUploader.init({
			region: 'SCN', 
			// uptokenURL: 'https://[yourserver.com]/api/uptoken', //请求后端uptoken的url地址
			uptoken: uptoken,  //你请求后端的uptoken,和上面一样的，uptokenURL不填就找uptoken,填一个就可以了（这里是字符串数据不是url了）
			domain: 'https://cdn.doudouxiongglobal.com/', //yourBucketId:这个去你域名配置那里要
			shouldUseQiniuFileName: true,
			key: 'driver/'
		});
	},
	methods: {
		carNumInput(e){
			this.carNumber = e.detail.value
		},
		async addDriverFunc(){
			let carNumber = this.carNumber,
			driverLicense = this.driverLicense,
			dLSubPage = this.dLSubPage,
			carImg = this.carImg
			if (carNumber == ''){
				wx.showToast({
					title:"请输入车牌号"
				})
				return false
			}
			if (driverLicense == ''){
				wx.showToast({
					title:"请上传驾驶证"
				})
				return false
			}
			if (dLSubPage == ''){
				wx.showToast({
					title:"请上传驾驶证副页"
				})
				return false
			}
			if (carImg == ''){
				wx.showToast({
					title:"请上传后车身45度照片"
				})
				return false
			}
			let data = {
				CarNumber : carNumber,
				DriverLicense : driverLicense,
				DLSubPage : dLSubPage,
				CarImage : carImg
			}
			let result = await addDriver(data)
			if(result.Code === 200){
				wx.showToast({
					title:"上传成功，请等待审核结果",
					success() {
						wx.navigateBack({
							
						})
					}
				})
			}
			console.log(result)
		},
		async chooseImage(file) {
			if(this.type == 0 || this.type == 1) return false
			let that = this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function(res) {
					wx.showLoading({
						title:"正在上传"
					})
					qiniuUploader.upload(
						res.tempFilePaths[0], 
						(res) => {that.imageObject=res}, 
						(error) => {console.log(error);wx.showToast({title:'上传失败'})},null,
						(progress) => {
							console.log('上传进度', progress.progress)
							console.log('已经上传的数据长度', progress.totalBytesSent)
							console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
						}, null,null,
						(compolete) => {
							wx.hideLoading()
							if(compolete.statusCode === 200){
								let data = JSON.parse(compolete.data)
								let driverLicense = that.domain+'/'+data.key;
								that.driverLicense = driverLicense;
								that.chooseImg = false;
								that.showImg = true;
							}else{
								wx.hideLoading()
								wx.showToast({
									title:'上传失败'
								})
							}
						}
					);
				}
			});
		},
		async chooseImage2(file) {
			if(this.type == 0 || this.type == 1) return false
			let that = this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function(res) {
					wx.showLoading({
						title:"正在上传"
					})
					qiniuUploader.upload(
						res.tempFilePaths[0],
						(res) => {that.imageObject=res}, 
						(error) => {console.log(error);wx.showToast({title:'上传失败'})},null,
						(progress) => {
							console.log('上传进度', progress.progress)
							console.log('已经上传的数据长度', progress.totalBytesSent)
							console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
						}, null,null,
						(compolete) => {
							wx.hideLoading()
							if(compolete.statusCode === 200){
								let data = JSON.parse(compolete.data)
								let dLSubPage = that.domain+'/'+data.key;
								that.dLSubPage = dLSubPage;
								that.chooseImg2 = false;
								that.showImg2 = true;
							}else{
								wx.hideLoading()
								wx.showToast({
									title:'上传失败'
								})
							}
						}
					);
				}
			});
		},
		async chooseImage3(file) {
			if(this.type == 0 || this.type == 1) return false
			let that = this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function(res) {
					wx.showLoading({
						title:"正在上传"
					})
					qiniuUploader.upload(
						res.tempFilePaths[0],
						(res) => {that.imageObject=res}, 
						(error) => {console.log(error);wx.showToast({title:'上传失败'})},null,
						(progress) => {
							console.log('上传进度', progress.progress)
							console.log('已经上传的数据长度', progress.totalBytesSent)
							console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
						}, null,null,
						(compolete) => {
							wx.hideLoading()
							if(compolete.statusCode === 200){
								let data = JSON.parse(compolete.data)
								let carImg = that.domain+'/'+data.key;
								that.carImg = carImg;
								that.chooseImg3 = false;
								that.showImg3 = true;
							}else{
								wx.hideLoading()
								wx.showToast({
									title:'上传失败'
								})
							}
						}
					);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.car-box {
	width: 750upx;
	background: #f3f3f3;
	position: relative;
	.gray {
		width: 750upx;
		height: 13upx;
		background: #f3f3f3;
	}
	.car-num {
		width: 750upx;
		height: 80upx;
		line-height: 80upx;
		margin-bottom: 18upx;
		background: #fff;
		display: flex;
		justify-content: flex-start;
		.car-num-left {
			margin-left: 42upx;
			font-size: 29upx;
		}
		.car-num-right {
			margin-left: 26upx;
			.uni-input {
				width: 500upx;
				padding: 18upx 0 5upx 20upx;
				border-bottom: 2upx solid #f3f3f3;
			}
		}
	}
	.car-img {
		width: 750upx;
		margin: 20upx auto;
		background: #fff;
		padding-bottom: 20upx;
		.car-img-top {
			height: 80upx;
			line-height: 80upx;
			margin-left: 42upx;
			font-size: 29upx;
		}
		.car-img-bot1 {
			width: 667upx;
			height: 326upx;
			line-height: 326upx;
			background: url(https://cdn.doudouxiongglobal.com/pinxiang/image/example/inside.png);
			background-size: 100% 100%;
			margin: 0 auto 25upx auto;
			border: 2upx dashed #a4a4a4;
			.vant-icon {
				text-align: center;
				font-size: 120upx;
				color: #a4a4a4;
			}
		}
		.car-img-bot2 {
			width: 667upx;
			height: 326upx;
			line-height: 326upx;
			background-image: url(https://cdn.doudouxiongglobal.com/pinxiang/image/example%E6%9C%AA%E6%A0%87%E9%A2%98-2_%E7%94%BB%E6%9D%BF%201.png);
			background-size: 100% 100%;
			margin: 0 auto 25upx auto;
			border: 2upx dashed #a4a4a4;
			.vant-icon {
				text-align: center;
				font-size: 120upx;
				color: #a4a4a4;
			}
		}
		.car-img-bot3 {
			width: 667upx;
			height: 326upx;
			line-height: 326upx;
			background-image: url(https://cdn.doudouxiongglobal.com/pinxiang/image/example/car.png);
			background-size: 100% 100%;
			margin: 0 auto 25upx auto;
			border: 2upx dashed #a4a4a4;
			.vant-icon {
				text-align: center;
				font-size: 120upx;
				color: #a4a4a4;
			}
		}
		.show-img {
			width: 667upx;
			height: 326upx;
			margin: 0 auto 25upx auto;
			image {
				width: 667upx;
				height: 326upx;
			}
		}
	}
	.car-discern {
		width: 750upx;
		height: 80upx;
		line-height: 80upx;
		margin-bottom: 18upx;
		background: #fff;
		display: flex;
		justify-content: flex-start;
		.car-discern-left {
			margin-left: 42upx;
			font-size: 29upx;
		}
		.car-discern-right {
			margin-left: 26upx;
			.uni-input {
				width: 290upx;
				padding: 18upx 0 5upx 20upx;
				border-bottom: 2upx solid #f3f3f3;
			}
		}
	}
	.car-enginen {
		width: 750upx;
		height: 80upx;
		line-height: 80upx;
		margin-bottom: 18upx;
		background: #fff;
		display: flex;
		justify-content: flex-start;
		.car-enginen-left {
			margin-left: 42upx;
			font-size: 29upx;
		}
		.car-enginen-right {
			margin-left: 26upx;
			.uni-input {
				width: 450upx;
				padding: 18upx 0 5upx 20upx;
				border-bottom: 2upx solid #f3f3f3;
			}
		}
	}
	.mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		line-height: 400upx;
		background: rgba(164, 164, 164, 0.8);
		text-align: center;
		font-size: 29upx;
		color: #fff;
		z-index:10;
	}
	.shenhe-mask {
		width: 504upx;
		height: 200upx;
		margin: 50upx auto;
		border-radius: 14upx;
		line-height: 200upx;
		background: rgba(164, 164, 164, 1);
		text-align: center;
		font-size: 29upx;
		color: #fff;
	}
	.shenhe-word {
		color: #a4a4a4;
		font-size: 29upx;
		text-align: center;
		padding-bottom: 150upx;
	}
	.car-button{
		width: 504upx;
		margin:0 auto;
		padding-bottom:40upx;
		button{
			background-color:#FE5100;
			color:white;
		}
		
	}
	input {
		font-size:29upx;
	}
}
</style>
