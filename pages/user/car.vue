<template>
	<view class="car-box">
		<view class="gray"></view>
		<view class="car-num">
			<view class="car-num-left">
				车牌号：
			</view>
			<view class="car-num-right">
				<input class="uni-input" placeholder="浙A123456" placeholder-style="color:#f3f3f3;"/>
			</view>
		</view>
		<view class="car-img">
			<view class="car-img-top">
				行驶证：
			</view>
			<view class="car-img-bot" @click="chooseImage" v-show="chooseImg">
				<view class="vant-icon">&#xe65c;</view>
			</view>
			<view class="show-img" v-show="showImg" @click="chooseImage" >
				<image mode="aspectFill" :src="DriverLicense"></image>
			</view>
			<view class="car-img-bot" @click="chooseImage2" v-show="chooseImg2">
				<view class="vant-icon">&#xe65c;</view>
			</view>
			<view class="show-img" v-show="showImg2" @click="chooseImage2" >
				<image mode="aspectFill" :src="DLSubPage"></image>
			</view>
		</view>
		<view class="car-discern">
			<view class="car-discern-left">
				车辆识别代码号(VIN码)：
			</view>
			<view class="car-discern-right">
				<input class="uni-input"/>
			</view>
		</view>
		<view class="car-enginen">
			<view class="car-enginen-left">
				发动机号码：
			</view>
			<view class="car-enginen-right">
				<input class="uni-input"/>
			</view>
		</view>
		<view class="car-enginen">
			<view class="car-enginen-left">
				车辆类型：
			</view>
			<view class="car-enginen-right">
				<input class="uni-input"/>
			</view>
		</view>
		<view class="car-enginen">
			<view class="car-enginen-left">
				核定载人数：
			</view>
			<view class="car-enginen-right">
				<input class="uni-input"/>
			</view>
		</view>
		<view class="mask" v-if="type===0">
			行驶证认证通过后自动完善
		</view>
		<view class="shenhe-mask" v-if="type===0">
			材料审核…
		</view>
		<view class="shenhe-word" v-if="type===0">
			行驶证信息正在人工审核中，请耐心等待
		</view>
	</view>
</template>

<script>
	 export default{
		 data(){
			 return{
				type:0,
				DriverLicense:"",
				DLSubPage:"",
				chooseImg:true,
				showImg:false,
				chooseImg2:true,
				showImg2:false,
			 }
		 },
		 methods:{
			chooseImage(){
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						// console.log(JSON.stringify(res.tempFilePaths));
						uni.getImageInfo({
							src: res.tempFilePaths[0],
							success: function (image) {
								let DriverLicense = image.path
								that.DriverLicense = DriverLicense
								console.log(that.DriverLicense);
								that.chooseImg = false
								that.showImg = true
							},
						});
					},
				});
			},
			chooseImage2(){
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						// console.log(JSON.stringify(res.tempFilePaths));
						uni.getImageInfo({
							src: res.tempFilePaths[0],
							success: function (image) {
								let DLSubPage = image.path
								that.DLSubPage = DLSubPage
								console.log(that.DLSubPage);
								that.chooseImg2 = false
								that.showImg2 = true
							},
						});
					},
				});
			},
		 },
	 }
</script>

<style lang="scss" scoped>
.car-box{
	width:750upx;
	background:#F3F3F3;
	position: relative;
	.gray{
		width:750upx;
		height:13upx;
		background: #F3F3F3;
	}
	.car-num{
		width:750upx;
		height:80upx;
		line-height: 80upx;
		margin-bottom:18upx;
		background: #fff;
		display: flex;
		justify-content:flex-start;
		.car-num-left{
			margin-left: 42upx;
			font-size:29upx;
		}
		.car-num-right{
			margin-left: 26upx;
			.uni-input{
				width:500upx;
				padding:18upx 0 5upx 20upx;
				border-bottom: 2upx solid #f3f3f3;
			}
		}
	}
	.car-img{
		width:750upx;
		margin:20upx auto;
		background: #fff;
		padding-bottom:20upx;
		.car-img-top{
			height:80upx;
			line-height: 80upx;
			margin-left: 42upx;
			font-size:29upx;
		}
		.car-img-bot{
			width:667upx;
			height:326upx;
			line-height: 326upx;
			background: #f3f3f3;
			margin:0 auto 25upx auto;
			border:2upx dashed #A4A4A4;
			.vant-icon{
				text-align: center;
				font-size:120upx;
				color:#A4A4A4;
			}
		}
		.show-img{
			width:667upx;
			height:326upx;
			margin:0 auto 25upx auto;
			image{
				width:667upx;
				height:326upx;
			}
		}
	
	}
	.car-discern{
		width:750upx;
		height:80upx;
		line-height: 80upx;
		margin-bottom:18upx;
		background: #fff;
		display: flex;
		justify-content:flex-start;
		.car-discern-left{
			margin-left: 42upx;
			font-size:29upx;
		}
		.car-discern-right{
			margin-left: 26upx;
			.uni-input{
				width:290upx;
				padding:18upx 0 5upx 20upx;
				border-bottom: 2upx solid #f3f3f3;
			}
		}
	}
	.car-enginen{
		width:750upx;
		height:80upx;
		line-height: 80upx;
		margin-bottom:18upx;
		background: #fff;
		display: flex;
		justify-content:flex-start;
		.car-enginen-left{
			margin-left: 42upx;
			font-size:29upx;
		}
		.car-enginen-right{
			margin-left: 26upx;
			.uni-input{
				width:450upx;
				padding:18upx 0 5upx 20upx;
				border-bottom: 2upx solid #f3f3f3;
			}
		}
	}
	.mask{
		position: absolute;
		top:920upx;
		left:0;
		width:750upx;
		height:400upx;
		line-height:400upx;
		background: rgba(164,164,164,0.8);
		text-align: center;
		font-size:29upx;
		color:#fff;
	}
	.shenhe-mask{
		width:504upx;
		height:200upx;
		margin:50upx auto;
		border-radius:14upx;
		line-height:200upx;
		background: rgba(164,164,164,1);
		text-align: center;
		font-size:29upx;
		color:#fff;
	}
	.shenhe-word{
		color:#A4A4A4;
		font-size:29upx;
		text-align: center;
		padding-bottom: 150upx;
	}
}
</style>
