<template>
	<view class="coupon-box">
		<view class="coupon-top">
			<view class="coupon-title">
				服务内容：{{data.Name}}
			</view>
			<view class="coupon-time">
				<view class="coupon-time-left">预约时间丨{{data.AppointmentTime}}</view>
				<view class="coupon-time-right"></view>
			</view>
		</view>
		<view class="coupon-ewm">
			<view class="coupon-ewm-title">
				商家扫码核销即可体验
			</view>
			<view class="coupon-ewm-img">
				<image class="coupon-ewm-image" :src="data.QrCode" mode="aspectFill"></image>
			</view>
			<view class="coupon-ewm-cont">
				券码：{{data.SerialNumber}}
			</view>
		</view>
		<view class="coupon-store">
			<view class="coupon-store-left" @click="goStore">
				<view class="coupon-store-title">
					门店信息
				</view>
				<view class="coupon-store-detail">
					<image class="coupon-store-detail-img" :src="data.SImage" mode="aspectFill"></image>
					<view class="coupon-store-detail-cont">
						<view class="coupon-store-detail-cont-top">
							{{data.SName}}
						</view>
						<view class="coupon-store-detail-cont-bot">
							<uni-rate value="5" size="12"></uni-rate>
							<view class="coupon-store-detail-cont-bot-area">
								{{data.SAddress}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="coupon-store-detail-phone" @click="callPhone">
				<view class="vant-icon">&#xe686;</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	import {getAppointmentDetail} from "@/api/index.js"
	export default {
		components: {uniRate},
		data() {
			return {
				phone:"",
				orderTime:"",
				ewm:"https://cdn.doudouxiongglobal.com/Default_image/%20default_head_03.png",
				coupon:"2019 0522 0601",
				area:"钱江世纪城 维修",
				cover:"https://cdn.doudouxiongglobal.com/Default_image/%20default_head_03.png",
				data:[],
			};
		},
		async onLoad(options) {
			const that = this;
			uni.getStorage({
			    key: 'orderTime',
			    success: function (res) {
					const orderTime = res.data;
					that.orderTime = orderTime;
			        console.log(res.data);
			        console.log(that.orderTime);
			    }
			});
			let id = options.id
			let data = await getAppointmentDetail(id,{})
			if(data.Code === 200){
				console.log(data.Data)
				that.data = data.Data
				that.phone = data.Data.Phone
			}
		},
		methods:{
			goStore(){
				uni.navigateTo({
				    url: '../store'
				});
			},
			callPhone(){
				uni.makePhoneCall({
					phoneNumber: this.phone //仅为示例
				});
			},
		}
	}
</script>

<style lang="scss">
.coupon-box{
	width:750upx;
	background:#f3f3f3;
	.coupon-top{
		background:#fff;
		padding-top:40upx;
		.coupon-title{
			width:750px;
			font-size:25upx;
			padding-left:27upx;
		}
		.coupon-time{
			width:750upx;
			margin-top:5upx;
			color:#A4A4A4;
			font-size:25upx;
			display: flex;
			justify-content: start;
			.coupon-time-left{
				padding-left:27upx;
			}
			.coupon-time-right{
			}
		}
	}
	.coupon-ewm{
		background:#fff;
		width:750upx;
		margin:0 auto 0 auto;
		padding-top:53upx;
		.coupon-ewm-title{
			width:750upx;
			font-size:25upx;
			text-align: center;
		}
		.coupon-ewm-img{
			width:252upx;
			height:252upx;
			margin:25upx auto;
			.coupon-ewm-image{
				width:252upx;
				height:252upx;	
				img{
					width:252upx;
					height:252upx;	
				}
			}
		}
		.coupon-ewm-cont{
			font-size:29upx;
			text-align: center;
			letter-spacing:2upx;
			padding-bottom: 38upx;
		}
	}
	.coupon-store{
		width:750upx;
		height:228upx;
		background: #fff;
		margin-top: 20upx;
		display: flex;
		justify-content:start;
		.coupon-store-left{
			
			.coupon-store-title{
				font-size: 25upx;
				margin-left:27upx;
				padding-top:29upx;
			}
			.coupon-store-detail{
				margin-left:27upx;
				margin-top:38upx;
				display: flex;
				justify-content:start;
				.coupon-store-detail-img{
					width:85upx;
					height:85upx;
					img{
						width:85upx;
						height:85upx;
					}
				}
				.coupon-store-detail-cont{
					width:480upx;
					margin-left:16upx;
					margin-top:5upx;
					.coupon-store-detail-cont-top{
						font-size:29upx;
					}
					.coupon-store-detail-cont-bot{
						display: flex;
						justify-content:start;
						margin-top:10upx;
						.uni-rate{
							margin-top: 5upx;
						}
						.coupon-store-detail-cont-bot-area{
							font-size:25upx;
							color:#A4A4A4;
							margin-left:20upx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
				}
			}
		}
		.coupon-store-detail-phone{
			width:100upx;
			height:51upx;
			margin-top: 115upx;
			.vant-icon{
				color:#FE5100;
				margin-left: 30upx;
				font-size: 47upx;
			}
		}
	}
}
</style>
