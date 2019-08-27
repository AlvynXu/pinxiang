<template>
	<view class="gift-box">
		<view class="gift-list">
			<view class="gift-list-top">
				<view class="gift-tab" @click="tab1" :class="{'active': isActive1}">
					<view :class="{'bot': isBot1}"></view>可赠送·0
				</view>
				<view class="gift-tab" @click="tab2" :class="{'active': isActive2}">
					<view :class="{'bot': isBot2}"></view>已送出·0
				</view>
				<view class="gift-tab" @click="tab3" :class="{'active': isActive3}">
					<view :class="{'bot': isBot3}"></view>兑换会员
				</view>
			</view>
			<view class="gift-one" v-if="TabCur===0">
				<view class="gift-one-none" v-if="type===1">
					<view class="vant-icon">&#xe690;</view>
					<view class="gift-one-txt">您还未购买可赠送的会员卡</view>
					<view class="gift-one-buy" @click="goPay">前往购卡</view>
				</view>
				<view class="gift-one-has">
					<view class="gift-one-card" v-if="type===2" v-for="(val,key) in cardList" :key="key">
						<view class="gift-one-card-list" v-if="val.state===0">
							<view class="vant-icon">&#xe690;</view>
							<view class="gift-card">会员编号:{{val.num}}</view>
							<view class="gift-exchange">兑换码：{{val.exchange}}</view>
						</view>
					</view>
					<view class="gift-one-txt">获取更多赠卡</view>
					<view class="gift-one-buy" @click="goPay">前往购卡</view>
				</view>
				
			</view>
			<view class="gift-one" v-if="TabCur===1">
				<view class="gift-one-has">
					<view class="gift-one-card" v-if="type===2" v-for="(val,key) in cardList" :key="key">
						<view class="gift-one-card-list" v-if="val.state===1">
							<view class="vant-icon">&#xe690;</view>
							<view class="gift-card">会员编号:{{val.num}}</view>
							<view class="gift-exchange">兑换码：{{val.exchange}}</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="TabCur===2">
				<view class="exchange-box">
					<input class="uni-input"/>
				</view>
				<view class="exchange-button">立即兑换</view>
			</view>
		</view>
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue'
	export default {
		components: { WucTab},
		data() {
			return {
				isActive1:false,
				isActive2:false,
				isActive3:false,
				isBot1:false,
				isBot2:false,
				isBot3:false,
				active:"active",
				none:"none",
				type:2,
				TabCur: 0,
				cardList:[
					{
						state:0,
						num:"1234567890",
						exchange:"A1B2C3D4E5F6G"
					},
					{
						state:0,
						num:"1234567890",
						exchange:"A1B2C3D4E5F6G"
					},
					{
						state:1,
						num:"1234567890",
						exchange:"A1B2C3D4E5F6G"
					},
				]
			};
		},
		methods:{
			tabChange(index) {
				this.TabCur = index;
			},
			tab1(){
				this.TabCur = 0;
				this.isActive1 = true;
				this.isActive2 = false;
				this.isActive3 = false;
				this.isBot1 = true;
				this.isBot2 = false;
				this.isBot3 = false;
			},
			tab2(){
				this.TabCur = 1;
				this.isActive1 = false;
				this.isActive2 = true;
				this.isActive3 = false;
				this.isBot1 = false;
				this.isBot2 = true;
				this.isBot3 = false;
			},
			tab3(){
				this.TabCur = 2;
				this.isActive1 = false;
				this.isActive2 = false;
				this.isActive3 = true;
				this.isBot1 = false;
				this.isBot2 = false;
				this.isBot3 = true;
			},
			goPay(){
				uni.navigateTo({
				    url: 'pay'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.active{
		position: relative;
		font-size:29upx;
		color:#333333;
	}
	.bot{
		position:absolute;
		width:100upx;
		height:2upx;
		background: #FE5100;
		bottom:0;
		left:75upx;
	}
.gift-box{
	width:750upx;
	background:#f3f3f3;
	height:100vh;
	.gift-list{
		.gift-list-top{
			background: #fff;
			display: flex;
			justify-content: space-between;
			width:750upx;
			height:76upx;
			line-height: 76upx;
			margin:0 auto;
			font-size:27upx;
			color: #A4A4A4;
			.gift-tab{
				position: relative;
				width:250upx;
				height:76upx;
				text-align: center;
			}
		}
		.gift-one{
			width:750upx;
			.gift-one-none{
				margin-top: 395upx;
				.vant-icon{
					font-size:200upx;
					text-align: center;
					color:#A4A4A4;
				}
				.gift-one-txt{
					text-align: center;
					font-size:27upx;
					color:#A4A4A4;
				}
				.gift-one-buy{
					width:389upx;
					height:89upx;
					line-height: 89upx;
					border-radius:9upx;
					border:2upx solid #FE5100;
					color:#FE5100;
					text-align: center;
					margin:53upx auto;
				}
			}
			.gift-one-has{
				.gift-one-card{
					.gift-one-card-list{
						padding:20upx 0 20upx 42upx;
						margin-top: 18upx;
						background: #fff;
						display:flex;
						justify-content:start;
						.vant-icon{
							font-size:80upx;
							color:#FE5100;
						}
						.gift-card{
							height:84upx;
							font-size:25upx;
							color:#A4A4A4;
							line-height:84upx;
						}
						.gift-exchange{
							height:84upx;
							margin-left: 42upx;
							font-size:25upx;
							color:#A4A4A4;
							line-height:84upx;
						}
					}
				}
				.gift-one-txt{
					text-align: center;
					font-size:27upx;
					color:#A4A4A4;
					margin-top:272upx;
				}
				.gift-one-buy{
					width:389upx;
					height:89upx;
					line-height: 89upx;
					border-radius:9upx;
					border:2upx solid #FE5100;
					color:#FE5100;
					text-align: center;
					margin:53upx auto;
				}
			}
		}
		.exchange-box{
			margin-top:62upx;
			background: #fff;
			padding:22upx 42upx;
			.uni-input{
				padding:0 30upx;
				width:607upx;
				height:82upx;
				border-radius:11upx;
				border:2upx solid #A4A4A4;
			}
		}
		.exchange-button{
			width:750upx;
			height:107upx;
			line-height: 107upx;
			background:#FE5100;
			text-align: center;
			margin-top: 36upx;
			color:#fff;
		}
	}
}
.wuc-tab{
	width:750upx;
	background:#fff;
}
.wuc-tab /deep/ .wuc-tab-item{
	width:250upx;
	font-size:25upx;
    height: 80upx;
    line-height: 80upx;
    padding: 0 0;
    margin: 0 0 0 0;
	text-align: center;
	color:#A4A4A4;
}
.wuc-tab /deep/ .text-blue{
	color:#FE5100;
}
.wuc-tab /deep/ .wuc-tab-item.cur {
	font-size:29upx;
	color:#333333;
    border-bottom: 0;
	span{
		padding-bottom:18upx;
		border-bottom: 4upx solid #FE5100;
	}
}
</style>
