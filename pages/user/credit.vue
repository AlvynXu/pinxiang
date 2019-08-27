<template>
	<view class="credit-box">
		<view class="credit-top">
			<view class="credit-top-mark">
				{{mark}}分
			</view>
			<view class="credit-top-date">
				评估时间:  {{date}}
			</view>
			<view class="credit-top-star">
				<view class="credit-word-list">
					<view class="credit-word">较差</view>
					<view class="credit-word">中等</view>
					<view class="credit-word">良好</view>
					<view class="credit-word">优秀</view>
					<view class="credit-word">极好</view>
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
					<view class="credit-history-name-left">{{val.name}}</view>
					<view class="credit-history-name-right">+{{val.smallMark}}</view>
				</view>
				<view class="credit-history-total">
					<view class="credit-history-total-left">个人优象信用分：{{val.mark}}</view>
					<view class="credit-history-total-right">{{val.addDate}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				mark:'360',
				date:"2019-08-09",
				creditList:[
					{
						mark:'260',
						name:"履行预约体验",
						smallMark:'10',
						addDate:'2019-08-02'
					},
					{
						mark:'250',
						name:"履行预约体验",
						smallMark:'10',
						addDate:'2019-08-01'
					},
					{
						mark:'200',
						name:"履行预约体验",
						smallMark:'50',
						addDate:'2019-08-01'
					}
				],
				
			}
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
					font-size:22upx;
					text-align: center;
					margin-right:5upx;
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
</style>
