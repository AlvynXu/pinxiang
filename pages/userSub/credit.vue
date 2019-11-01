<template>
	<view class="credit-box">
		<view class="xy-credit" v-show="vip===0">
			<view class="vip-top">
				<view class="vip-circle2"></view>
				<view class="vip-circle3"></view>
				<view class="vip-left"></view>
				<view class="vip-top"></view>
				<view class="vip-right"></view>
				<view class="vip-num">{{score}}</view>
				<view class="vip-content1">信用中等</view>
				<view class="vip-content2">评估时间：2019-08-09</view>
				<view class="vip-word">
					<view class="vip-word-icon">
						<view class="vant-icon">&#xe68b;</view>
					</view>
					<view class="vip-word-word">信用分优秀的会员，可享受免预约服务</view>
				</view>
			</view>
		</view>
		<view class="xy-vip" v-show="vip===1">
			<view class="credit-top">
				<view class="credit-top-mark">
					{{score}}分
				</view>
				<view class="credit-top-date">
					评估时间:  {{date}}
				</view>
				<view class="credit-top-star">
					<view class="credit-word-list">
						<view class="credit-word">
							<view class="credit-choose choosed" v-if="score<350">
								<view class="credit-word-bot"></view>较差
							</view>
							<view class="credit-choose" v-if="score>350">
								较差
							</view>
						</view>
						<view class="credit-word">
							<view class="credit-choose choosed" v-if="score>350 && score<500">
								<view class="credit-word-bot"></view>中等
							</view>
							<view class="credit-choose" v-if="score<350 || score>500">
								中等
							</view>
						</view>
						<view class="credit-word">
							<view class="credit-choose choosed" v-if="score>500 && score<650">
								<view class="credit-word-bot"></view>良好
							</view>
							<view class="credit-choose" v-if="score<500 || score>650">
								良好
							</view>
						</view>
						<view class="credit-word">
							<view class="credit-choose choosed" v-if="score>650 && score<800">
								<view class="credit-word-bot"></view>优秀
							</view>
							<view class="credit-choose" v-if="score<650 || score>800">
								优秀
							</view>
						</view>
						<view class="credit-word">
							<view class="credit-choose choosed" v-if="score>800 && score<950">
								<view class="credit-word-bot"></view>极好
							</view>
							<view class="credit-choose" v-if="score<800 || score>950">
								极好
							</view>
						</view>
					</view>
					<view class="credit-star-list">
						<view class="credit-star one"></view>
						<view class="credit-star two"></view>
						<view class="credit-star three"></view>
						<view class="credit-star four"></view>
						<view class="credit-star five"></view>
					</view>
					<view class="credit-mark-list">
						<view class="credit-mark one">200</view>
						<view class="credit-mark two">350</view>
						<view class="credit-mark three">500</view>
						<view class="credit-mark four">650</view>
						<view class="credit-mark five">800</view>
						<view class="credit-mark six">950</view>
					</view>
				</view>
			</view>
			<view class="credit-bot">
				<view class="credit-bot-title">以下是历史消息</view>
				<view class="credit-history" v-for="(val,key) in creditList" :key="key">
					<view class="credit-history-name">
						<view class="credit-history-name-left" v-if="val.Type==0">履行预约体验</view>
						<view class="credit-history-name-left" v-if="val.Type==1">完成手机绑定</view>
						<view class="credit-history-name-left" v-if="val.Type==2">完成车辆认证</view>
						<view class="credit-history-name-left" v-if="val.Type==3">购买VIP</view>
						<view class="credit-history-name-left" v-if="val.Type==4">逾期不到店，未履行信用预约</view>
						<view class="credit-history-name-right" v-if="val.Type==4">-{{val.Rate}}</view>
						<view class="credit-history-name-right" v-else>+{{val.Rate}}</view>
					</view>
					<view class="credit-history-total">
						<view class="credit-history-total-left">个人优象信用分：{{val.Score}}</view>
						<view class="credit-history-total-right">{{val.CreatedDate}}</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {rateRecord} from "@/api/index.js"
	export default{
		data(){
			return{
				type:0,
				vip:1,
				score:"",
				date:"",
				creditList:[
					
				],
				
			}
		},
		async onLoad(){
			let that = this;
			let userData = uni.getStorageSync('user_data')
			userData = JSON.parse(userData)
			that.vip = userData.Vip
			that.score = userData.Score;
			let record = await rateRecord({})
			if(record.Code == 200){
				this.creditList = record.Data
				this.date = record.Data[0].CreatedDate
			}
			// console.log(that.score)
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
  
.credit-box{
	width:750upx;
	height:100vh;
	background:#f3f3f3;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	display: flex;
	.xy-credit{
		width:750upx;
		height:100vh;
		.vip-top{
			width:750upx;
			height:549upx;
			background: #FE5100;
			position:relative;
			.vip-circle2{
				width: 200upx;
				height: 100upx;
				background-color: #FE5100;
				border-radius: 200upx 200upx 0 0 ;
				border-left:20upx solid #fff;
				border-right:20upx solid #fff;
				border-top:20upx solid #fff;
				position: absolute;
				top:100upx;
				left:295upx;
				z-index: 100;
				transform:rotate(-310deg);
				-ms-transform:rotate(-310deg); 	/* IE 9 */
				-moz-transform:rotate(-310deg); 	/* Firefox */
				-webkit-transform:rotate(-310deg); /* Safari 和 Chrome */
				-o-transform:rotate(-310deg); 
			}
			.vip-circle3{
				width: 200upx;
				height: 100upx;
				background-color: #FE5100;
				border-radius: 0 0 200upx 200upx ;
				border-left:20upx solid #fff;
				border-right:20upx solid #fff;
				border-bottom:20upx solid #fff;
				position: absolute;
				top:100upx;
				left:203upx;	
				z-index: 100;
				transform:rotate(130deg);
				-ms-transform:rotate(130deg); 	/* IE 9 */
				-moz-transform:rotate(130deg); 	/* Firefox */
				-webkit-transform:rotate(130deg); /* Safari 和 Chrome */
				-o-transform:rotate(130deg); 
			}
			.vip-left{
				width:25upx;
				height:10upx;
				position: absolute;
				top:200upx;
				left:263upx;
				background: #fff;
				z-index: 150;
			}
			.vip-right{
				width:25upx;
				height:10upx;
				position: absolute;
				top:200upx;
				left:450upx;
				background: #fff;
				z-index: 150;
			}
			.vip-top{
				width:10upx;
				height:20upx;
				position: absolute;
				top:100upx;
				left:360upx;
				background: #fff;
				z-index: 150;
			}
			.vip-num{
				position: absolute;
				top:170upx;
				left:320upx;
				color:#fff;
				z-index:200;
				font-size:55upx;
			}
			.vip-content1{
				text-align: center;
				color:#fff;
				font-size:29upx;
				position: absolute;
				top:320upx;
				left:313upx;
				z-index:200;
			}
			.vip-content2{
				text-align: center;
				color:#fff;
				font-size:27upx;
				position: absolute;
				top:370upx;
				left:253upx;
				z-index:200;
			}
			.vip-word{
				position:absolute;
				width:667upx;
				height:207upx;
				line-height:207upx;
				background:#fff;
				border-radius:11upx;
				text-align: center;
				top:480upx;
				left:42upx;
				display:flex;
				justify-content:start;
				.vip-word-icon{
					width:107upx;
					height:107upx;
					margin:0upx 25upx;
					.vant-icon{
						font-size:100upx;
						color:#FE5100;
					}
				}
				.vip-word-word{
					font-size:27upx;
					margin-left: 10upx;
				}
			}
		}
	}
	.xy-vip{
		width:750upx;
		.credit-top{
			width:750upx;
			height:261upx;
			position: relative;
			background:linear-gradient(47deg,rgba(255,218,172,1) 0%,rgba(254,171,68,1) 25%,rgba(254,156,35,1) 50%,rgba(254,140,0,1) 75%,rgba(254,81,0,1) 100%);
			.credit-top-mark{
				color:#fff;
				font-size:72upx;
				margin-left:42upx;
				padding-top:27upx;
			}
			.credit-top-date{
				color:#fff;
				font-size:27upx;
				margin-left:42upx;
			}
			.credit-top-star{
				border-radius:11upx;
				background: #fff;
				width:659upx;
				height:207upx;
				position: absolute;
				top:181upx;
				left:42upx;
				.credit-word-list{
					display: flex;
					justify-content: start;
					margin-top:47upx;
					.credit-word{
						width:127upx;
						font-size:21upx;
						text-align: center;
						margin-right:5upx;
						.credit-choose{
							width:58upx;
							height:31upx;
							line-height:31upx;
							margin-left:40upx;
							position: relative;
							.credit-word-bot{
								position: absolute;
								width: 0;
								height: 0;
								border-width: 7upx;
								border-style: solid;
								border-color:  #FE5100  #fff #fff  #fff ;
								bottom:-12upx;
								left:24upx;
								z-index:1000;
							}
						}
						.choosed{
							color:#fff;
							background: #FE5100;
							border-radius:4upx;
						}
					}
				}
				.credit-star-list{
					width:656upx;
					height:22upx;
					display: flex;
					justify-content: start;
					margin-top:14upx;
					.credit-star{
						width:127upx;
						font-size:22upx;
						text-align: center;
						margin-left:6upx;
					}
					.one{
						background:linear-gradient(left, #FBF8F8 , #FFDAAC); 
						border-bottom-left-radius: 22upx;
						border-top-left-radius: 22upx;
					}
					.two{
						background:linear-gradient(left, #FFDAAC , #FEAB44); 
					}
					.three{
						background:linear-gradient(left, #FEAB44 , #FE9C23); 
					}
					.four{
						background:linear-gradient(left, #FE9C23 , #FE8C00); 
					}
					.five{
						background:linear-gradient(left, #FE8C00 , #FE5100); 
						border-bottom-right-radius: 22upx;
						border-top-right-radius: 22upx;
					}
				}
				.credit-mark-list{
					display: flex;
					justify-content: start;
					width:656upx;
					margin-top:24upx;
					.credit-mark{
						font-size:22upx;
						color:#A4A4A4;
					}
					.one{
						width:100upx;
					}
					.two{
						width:140upx;
					}
					.three{
						width:130upx;
					}
					.four{
						width:140upx;
					}
					.five{
						width:100upx;
					}
				}
			}
		}
		.credit-bot{
			margin-left: 42upx;
			margin-top:150upx;
			width:667upx;
			.credit-bot-title{
				font-size:22upx;
				color:#A4A4A4;
				margin-bottom: 24upx;
			}
			.credit-history{
				width:667upx;
				height:118upx;
				margin-top: 7upx;
				background:#fff;
				border-radius:11upx;
				.credit-history-name{
					width:610upx;
					margin:0 auto;
					padding-top: 24upx;
					display: flex;
					justify-content: space-between;
					font-size:29upx;
				}
				.credit-history-total{
					width:610upx;
					margin:0 auto;
					padding-top: 11upx;
					display: flex;
					justify-content: space-between;
					font-size:25upx;
					color:#A4A4A4;
				}
			}
		}
		
	}
}	
</style>
