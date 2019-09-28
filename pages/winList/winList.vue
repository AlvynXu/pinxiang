<template>
	<view class="active-box">
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" circular :indicator-dots="indicatorDots" indicator-color="rgba(0,0,0,0.5)" indicator-active-color="#fff" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item>
							<image class="swiper-img" mode="aspectFill" src="https://cdn.doudouxiongglobal.com/store/active/banner1.png"></image>
						</swiper-item>
						<swiper-item>
							<image class="swiper-img" mode="aspectFill" src="https://cdn.doudouxiongglobal.com/store/active/banner2.png"></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		
		<view class="active-tips">
			<view class="active-tip-one">
				欢庆祖国70华诞
			</view>
			<view class="active-tip-two">
				寻找70位车主，全年保养，我们包了
			</view>
			<view class="active-tip-three">
				<view class="vant-icon">&#xe6b6;</view>
				开奖时间：2019年10月7日 10:0
			</view>
		</view>
		<view class="active-time">
			<view class="active-time-left">
				距报名结束：
				<view>{{activeList.SurplusDay}}</view>天
				<view>{{activeList.SurplusHour}}</view>:<view>{{activeList.SurplusMinutes}}</view>:<view>{{activeList.SurplusSecond}}</view>
			</view>
			<view class="active-time-right">
				已有<view>3878157</view>人参与
			</view>
		</view>	
		
		<view class="active-rule">
			<view class="active-rule-top">
				<view class="rule-line left"></view>
				<view class="rule-word">中奖名单</view>
				<view class="rule-line right"></view>
			</view>
			<view class="active-rule-tip">
				<view class="active-rule-ava">
					头像·昵称
				</view>
				<view class="active-rule-phone">
					手机号码
				</view>
				<view class="active-rule-win">
					中奖码
				</view>
			</view>
			<view class="active-rule-lists" v-for="(val,key) in winList" :key="key">
				<view class="active-rule-list-left">
					<image class="active-rule-list-img" :src="avatar" mode="aspectFill"></image>
					<view class="active-rule-list-word">{{val.name}}</view>
				</view>
				<view class="active-rule-list-center">
					{{val.phone}}
				</view>
				<view class="active-rule-list-right">
					{{val.winCode}}
				</view>
			</view>
		</view>
		 
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import hchPoster from '../../components/hch-poster/hch-poster.vue'
	import {getWinninCode,getActive} from '../../api/index.js'
	export default {
		components: {hchPoster,uniPopup},
	    data() {
	        return {
	            indicatorDots: true,
	            autoplay: true,
	            interval: 3000,
	            duration: 500,
				activeList:[],
				bgCode:"https://img0.zuipin.cn/mp_zuipin/poster/hch-code.png",
				avatar:"https://cdn.doudouxiongglobal.com/Default_image/%20default_head_08.png",
				winList:[
					{
						name:'大好多阿达',
						phone:'17225445484',
						winCode:'SADAS7845'
						
					},
					{
						name:'大好多阿达',
						phone:'17225445484',
						winCode:'SADAS7845'
						
					}
				]
	        }
	    },
	    methods: {
			
	    },
		async onLoad() {
			let that = this
			let activeData = await getActive()
			if(activeData.Code === 200){
				console.log(activeData.Data)
				if(JSON.stringify(activeData.Data)!=='[]'){
					that.activeList = activeData.Data
					console.log(that.activeList)
				}
				
			}
		},
		onShow(){
			// console.log(this.name.length)
			let phone =  this.phone.substr(0,3) + '****' + this.phone.substr(7,4)
			this.phone = phone
			if(this.name.length>2){
				let name =  this.name.substr(0,2) + '****' 
				this.name = name
			}
			console.log(phone)
		},
	}
</script>

<style lang="scss" scoped>
.uni-popup{
	width:750upx;
	z-index:1000;
	padding-top:50upx;
	background: rgba(0,0,0,0.5);
	.popup-detail{
		width:681upx;
		height:961upx;
		margin-left:34upx;
		margin-top:100upx;
		background:#fff;
		.uni-img{
			width:341upx;
			height:341upx;
			margin-left:178upx;
			padding-top:71upx;
			.img{
				width:341upx;
				height:341upx;
			}
		}
		.uni-word{
			font-size:29upx;
			margin-top: 29upx;
			text-align: center;
			color:rgba(51,51,51,1);
		}
		.uni-word2{
			font-size:36upx;
			font-weight:500;
			margin-top: 29upx;
			text-align: center;
			color:rgba(51,51,51,1);
		}
		.uni-button{
			width:466upx;
			height:111upx;
			line-height: 111upx;
			background:rgba(254,81,0,1);
			border-radius:14upx;
			margin:54upx auto;
			color:#fff;
			text-align: center;
		}
		.uni-list{
			width:241upx;
			height:60upx;
			line-height: 60upx;
			font-size:36upx;
			font-weight:500;
			text-align: center;
			margin: 107upx auto;
			border-bottom: 2upx solid #A4A4A4;
			
		}
	}
	
}
.gray{
	width:750upx;
	height:11upx;
	background: #f3f3f3;
}
.swiper-img{
	width:750upx;
	height:310upx;
}
.active-tips{
	height:125upx;
	padding-left: 34upx;
	padding-top: 25upx;
	border-bottom: 1px solid #f3f3f3;
	.active-tip-one{
		font-size:31upx;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.active-tip-two{
		margin-top: 9upx;
		font-size:29upx;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.active-tip-three{
		font-size:18upx;
		font-weight:400;
		color:rgba(254,81,0,1);
		display: flex;
		justify-content: start;
		.vant-icon{
			font-size:18upx;
			margin-right: 5upx;
			margin-top: 3upx;
		}
	}
}
.active-time{
	width:750upx;
	height:67px;
	display: flex;
	justify-content: flex-start;
	height:67upx;
	line-height:67upx;
	border-bottom: 1px solid #f3f3f3;
	.active-time-left{
		display: flex;
		justify-content: flex-start;
		font-size:25upx;
		margin-left: 34upx;
		view{
			width:36upx;
			height:36upx;
			line-height:36upx;
			margin-top:15upx;
			background:rgba(254,81,0,1);
			color:#fff;
			text-align: center;
			margin-left: 5upx;
			margin-right: 5upx;
		}
		
	}
	.active-time-right{
		margin-left:100upx;
		display: flex;
		justify-content: flex-start;
		font-size:25upx;
		font-weight:400;
		color:rgba(51,51,51,1);
		view{
			color:#FE5100;
		}
	}
}
.active-rule{
	.active-rule-top{
		width:750upx;
		height: 96upx;
		line-height: 96upx;
		display: flex;
		justify-content: flex-start;
		.rule-word{
			font-size:29upx;
			color:rgba(51,51,51,1);
		}
		.rule-line{
			width:87upx;
			height:2upx;
			background: #979797;
			margin-top: 46upx;
		}
		.left{
			margin-left: 170upx;
			margin-right: 40upx;
		}
		.right{
			margin-left: 40upx;
		}
	}
	.active-rule-tip{
		width:681upx;
		margin:0 auto;
		display: flex;
		justify-content: space-between;
		.active-rule-ava{
			width:300upx;
			font-size:29upx;
			color:rgba(51,51,51,1);
		}
		.active-rule-phone{
			width:215upx;
			text-align: center;
			font-size:29upx;
			color:rgba(51,51,51,1);
		}
		.active-rule-win{
			width:165upx;
			text-align: center;
			font-size:29upx;
			color:rgba(51,51,51,1);
		}
	}
	.active-rule-lists{
		width:681upx;
		margin:0 auto;
		padding-top: 20upx;
		padding-bottom: 10upx;
		border-bottom: 1px solid #FE5100;
		display: flex;
		justify-content: space-between;
		.active-rule-list-left{
			width:300upx;
			height:91upx;
			display: flex;
			justify-content: flex-start;
			.active-rule-list-img{
				width:91upx;
				height:91upx;
				border-radius: 91upx;
			}
			.active-rule-list-word{
				font-size:29upx;
				height:91upx;
				line-height: 91upx;
				margin-left:5upx;
				color:#888888;
			}
		}
		.active-rule-list-center{
			width:215upx;
			height:91upx;
			line-height: 91upx;
			text-align: center;
			font-size:29upx;
			color:#888888;
		}
		.active-rule-list-right{
			width:165upx;
			height:91upx;
			line-height: 91upx;
			text-align: center;
			font-size:29upx;
			color:#888888;
		}
	}
}

</style>
