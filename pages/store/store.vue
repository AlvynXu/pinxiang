<template>
	<view class="store-box">
		<view class="store-list">
			<image class="cover" :src="cover" mode="aspectFill"></image>
			<view class="store-name">
				{{storeName}}
				<view class="store-distance">{{distance}}</view>
			</view>
			<view class="store-tips">
				<view class="tips">
					<view class="tip">地铁周边</view>
					<view class="tip">地铁周边</view>
					<view class="tip">地铁周边</view>
				</view>
				<view class="vant-icon">&#xe685;</view>
			</view>
		</view>
		<view class="store-area-box">
			<view class="store-icon">
				<view class="vant-icon">&#xe68f;</view>
			</view>
			<view class="store-area">
				<view class="area-top">
					<view class="area-name">{{area}}</view>
					<uni-rate value="2" size="12"></uni-rate>
				</view>
				<view class="store-address">{{address}}</view>
			</view>
			<view class="store-phone">
				<view class="vant-icon">&#xe686;</view>
			</view>
		</view>
		<view class="gray"></view>
		<view class="store-servince">
			<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
			<view v-if="TabCur===0">
				<view class="servince-list" v-for="(val,key) in storeList" :key="key">
					<view class="servince-img">
						<image :src="val.image" mode="aspectFill"></image>
					</view>
					<view class="servince-right">
						<view class="servince-name">{{val.name}}</view>
						<view class="servince-price">
							<view class="price-name">￥{{val.price}}</view>
							<view class="price-order">立即预约</view>
						</view>
					</view>
					
				</view>
			</view>
			<view class="ddx-information-box" v-if="TabCur===1">
			    <view class="ddx-information-comment">
			      <view class="information-comment-head">
					<view class="vant-icon">&#xe66b;</view>
			        <view>营业时间</view>
			      </view>
			      <view class="information-comment-foot">
			        <view class="comment-foot-left">平均营业</view>
			        <view>周一至周日 09:00-21:00</view>
			      </view>
			    </view>
			    <view class="ddx-information-basics">
			      <view class="information-basics-head">
					<view class="vant-icon">&#xe6a9;</view>
			        <view>基础设施</view>
			      </view>
			      <view class="information-basics-foot">
			        <view class="basics-foot" v-for="(val,key) in basicsList" :key="key">
						<view class="vant-icon one"  v-if="val.name==='免费WiFi'">&#xe6b9;</view>
						<view class="vant-icon two"  v-if="val.name==='免费茶水'">&#xe66a;</view>
						<view>{{val.name}}</view>
			        </view>
			      </view>
			    </view>
			    <view class="ddx-information-details">
			      <view class="ddx-information-detail" v-for="(val,key) in detailsList" :key="key">
			        <view class="information-detail-head">
						<view class="vant-icon" v-show="val.name==='洗车服务'">&#xe6b0;</view>
						<view class="vant-icon" v-show="val.name==='美容服务'">&#xe688;</view>
						<view class="vant-icon" v-show="val.name==='保养服务'">&#xe67b;</view>
						<view class="vant-icon" v-show="val.name==='维修服务'">&#xe6aa;</view>
						<view class="vant-icon" v-show="val.name==='改装服务'">&#xe6b0;</view>
						<view>{{val.name}}</view>
			        </view>
			        <view class="information-detail-foot">
						<view class="information-detail-list" v-for="(v,k) in val.detail" :key="k">
							<view>{{v.name}}</view>
						</view>
			        </view>
			      </view>
			    </view>
				
				<view class="ddx-information-intro">
					<view class="intro-top">
						<view class="vant-icon">&#xe684;</view>
						<view>门店介绍</view>
					</view>
					<view class="intro-detail">
						{{tabList[TabCur].detail}}
					</view>
				</view>
			</view>
			<view class="servince-notice" v-if="TabCur===2">
				<view class="cover">
					<image :src="tabList[TabCur].image" mode="aspectFill"></image>
				</view>
			</view>
			<view class="servince-reply" v-if="TabCur===3">
				<div class="ddx-reply-list" v-for="(val,key) in replyList" :key="key" v-show="key<num">
				      <div class="ddx-reply-left">
						  <image class="reply-avatar" :src="val.avatar" mode="aspectFill"></image>
				      </div>
				      <div class="ddx-reply-right">
				        <div class="ddx-reply-name">{{val.name}}</div>
				        <div class="ddx-reply-date">{{val.date}}</div>
				        <div class="ddx-reply-reply">{{val.reply}}</div>
				        <div class="ddx-reply-img">
				          <div class="ddx-img-list" v-for="(v,k) in val.imgList" :key="k">
							<image class="reply-image" :src="v.img" mode="aspectFill"></image>
				          </div>
				        </div>
				      </div>
				    </div>
				    <div class="ddx-shop-more"  @click="showMore">
				      <div>{{txt}}</div>
					  <view class="vant-icon">&#xe60c;</view>
				    </div>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	import WucTab from '@/components/wuc-tab/wuc-tab.vue'
	export default {
		components: {uniRate, WucTab},
		data() {
			return {
				distance:"1.3km",
				cover:'https://cdn.doudouxiongglobal.com/Default_image/city/hangzhou.jpg',
				title: 'Hello',
				area:'下城区 · 钱江世纪城',
				storeName:'御驾汇汽车服务中心',
				address:'秋涛北路72号杭州大厦501负2楼',
				TabCur: 0,
				tabList: [
					{ 
						name: '服务介绍',
					 }, 
					{ 
						name: '门店介绍',
						detail:'杭州聚拓汽车专注保时捷服务，经营范围涵盖：原厂升级、改装加装、维修保养、车身贴膜、内饰升级等诸多个性化服务。作为专业保时捷服务品牌，业务范围辐射江浙沪乃至全国，提供上门服务，只为将服务做到极致'
					},
					{ 
						name: '服务须知',
						image:'https://cdn.doudouxiongglobal.com/Default_image/city/hangzhou.jpg'
					},
					{ name: '服务案例' },
				],
				storeList:[
					{
						name:"御驾汇特色洗车服务",
						price:'35.0',
						image:'https://cdn.doudouxiongglobal.com/Default_image/city/hangzhou.jpg',
					},
					{
						name:"御驾汇特色洗车服务",
						price:'35.0',
						image:'https://cdn.doudouxiongglobal.com/Default_image/city/hangzhou.jpg',
					},
				],
				basicsList:[
					{name:"免费WiFi"},
					{name:"免费茶水"},
				], 
				detailsList:[
					{
						name:"洗车服务",
						detail:[
							{name:'洗车'},
							{name:'精洗'},
							{name:'内饰清洗'},
							{name:'自助洗车'}
						]

					},
					{
						name:"维修服务",
						detail:[
							{name:'维修'},
							{name:'喷漆'},
							{name:'玻璃修复'},
							{name:'漆面修复'}
						]

					},
					{
						name:"保养服务",
						detail:[
							{name:'保养'},
							{name:'底盘装甲'},
							{name:'贴膜'},
							{name:'表板上光'}
						]

					},
				],
				
				replyList:[
				  {
					avatar : 'https://cdn.doudouxiongglobal.com/blog/1/123f36820be6af2cad46ba112ac8ed71.jpg' ,
					name : '哈噻' ,
					date : '7月31日',
					reply:'啊痛里诶尅痛',
					imgList:[
					  {img:'https://cdn.doudouxiongglobal.com/blog/1/123f36820be6af2cad46ba112ac8ed71.jpg'},
					  {img:'https://cdn.doudouxiongglobal.com/blog/1/123f36820be6af2cad46ba112ac8ed71.jpg'},
					  {img:'https://cdn.doudouxiongglobal.com/blog/1/123f36820be6af2cad46ba112ac8ed71.jpg'},
					]
				  },
				  {
					avatar : 'https://cdn.doudouxiongglobal.com/blog/1/123f36820be6af2cad46ba112ac8ed71.jpg' ,
					name : '哈噻' ,
					date : '7月31日',
					reply:'啊痛里诶尅痛',
					imgList:[
					  {img:'https://cdn.doudouxiongglobal.com/blog/1/123f36820be6af2cad46ba112ac8ed71.jpg'},
					  {img:'https://cdn.doudouxiongglobal.com/blog/1/123f36820be6af2cad46ba112ac8ed71.jpg'},
					  {img:'https://cdn.doudouxiongglobal.com/blog/1/123f36820be6af2cad46ba112ac8ed71.jpg'},
					]
				  },
				  {
					avatar : 'https://cdn.doudouxiongglobal.com/blog/1/123f36820be6af2cad46ba112ac8ed71.jpg' ,
					name : '哈噻' ,
					date : '7月31日',
					reply:'啊痛里诶尅痛',
					imgList:[
					  {img:'https://cdn.doudouxiongglobal.com/blog/1/123f36820be6af2cad46ba112ac8ed71.jpg'},
					  {img:'https://cdn.doudouxiongglobal.com/blog/1/123f36820be6af2cad46ba112ac8ed71.jpg'},
					  {img:'https://cdn.doudouxiongglobal.com/blog/1/123f36820be6af2cad46ba112ac8ed71.jpg'},
					]
				  },
				  {
					avatar : 'https://cdn.doudouxiongglobal.com/blog/1/123f36820be6af2cad46ba112ac8ed71.jpg' ,
					name : '哈噻' ,
					date : '7月31日',
					reply:'啊痛里诶尅痛',
					imgList:[
					  {img:'https://cdn.doudouxiongglobal.com/blog/1/123f36820be6af2cad46ba112ac8ed71.jpg'},
					  {img:'https://cdn.doudouxiongglobal.com/blog/1/123f36820be6af2cad46ba112ac8ed71.jpg'},
					  {img:'https://cdn.doudouxiongglobal.com/blog/1/123f36820be6af2cad46ba112ac8ed71.jpg'},
					]
				  }
				],
				more:'arrow',
				isShow: true,
				txt: '查看更多精彩评论',
				num: 3
			};
		},
		methods:{
			tabChange(index) {
				this.TabCur = index;
			},
			
			showMore(){
				this.isShow = !this.isShow;
				this.num = this.isShow? 3: this.replyList.length;
				this.txt = this.isShow?  '查看更多精彩评论':'收起'
			},
		}
	}
</script>

<style lang="scss" scoped>
.gray{
	width:750upx;
	height:10upx;
	background: #f3f3f3;
}
.wuc-tab{
	width:667upx;
	margin-left: 23upx;
}
.wuc-tab /deep/ .wuc-tab-item{
	width:160upx;
	font-size:25upx;
    height: 80upx;
    line-height: 80upx;
    padding: 0 20upx;
    margin: 0 0 0 6upx;
	color:#A4A4A4;
}
.wuc-tab /deep/ .text-blue{
	color:#FE5100;
}
.wuc-tab /deep/ .wuc-tab-item.cur {
	font-size:29upx;
	color:#333333;
    border-bottom: 4upx solid #FE5100;
}
.store-box{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	.store-list{
		width: 667upx;
		margin-bottom:6upx;
		.cover {
			width: 667upx;
			height: 457upx;
			margin:0 auto;
		}
		
		.store-name{
			width: 667upx;
			font-size:33upx;
			margin-top: 24upx;
			display: flex;
			justify-content:space-between;
			.store-distance{
				font-size: 29upx;
				color:#A4A4A4;
			}
		}
		.store-tips{
			width: 667upx;
			margin-top: 17upx;
			display: flex;
			justify-content:space-between;
			padding-bottom:20upx;
			.tips{
				margin-top: 10upx;	
				display: flex;
				justify-content:flex-start;
				.tip{
					width:141upx;
					height:40upx;
					margin-right: 5upx;
					line-height: 40upx;
					text-align: center;
					color:#FE8C00;
					font-size: 25upx;
					border-radius:18px;
					border:2upx solid rgba(254,140,0,1);
				}
			}
			.vant-icon{
				color:#FE5100;
				margin-top: 10upx;
			}
		}
	}
	.store-area-box{
		width:667upx;
		display: flex;
		justify-content:flex-start;
		padding-top:31upx;
		border-top:2upx solid #A4A4A4; 
		padding-bottom:20upx;
		.store-icon{
			.vant-icon{
				font-size:60upx;
				color:#FE5100;
				margin-right:5upx;
			}
		}
		.store-area{
			width: 508upx;
			font-size:25upx;
			.area-top{
				width: 508upx;
				display: flex;
				justify-content:flex-start;
				.area-name{
				}
				.uni-rate{
					margin-left: 33upx;
					margin-top: 5upx;
				}
			}
			.store-address{
				width: 508upx;
				font-size:29upx;
				color:#A4A4A4;
				margin-top:8upx;
				display: flex;
				justify-content: space-between;
				.uni-rate{
					margin-top:10upx;
				}
			}
		}
		.store-phone{
			width:100upx;
			height:51upx;
			margin-top: 15upx;
			border-left:2upx solid #A4A4A4;
			.vant-icon{
				color:#FE5100;
				margin-left: 30upx;
			}
		}
	}
	.store-servince{
		width:750upx;
		margin-left: 27upx;
		.servince-list{
			width:667upx;
			margin-left:33upx;
			margin-top:40upx;
			display: flex;
			justify-content:flex-start;
			.servince-img{
				width:132upx;
				height:123upx;
				image{
					width:132upx;
					height:123upx;
				}
			}
			.servince-right{
				margin-left: 20upx;
				.servince-name{
					font-size:29upx;
				}
				.servince-price{
					width:500upx;
					height:50upx;
					line-height: 50upx;
					margin-top: 15upx;
					display: flex;
					justify-content:space-between;
					.price-name{
						color:#FE5101;
						font-size:40upx;
					}
					.price-order{
						width:112upx;
						height:36upx;
						line-height:36upx;
						color:#fff;
						font-size:22upx;
						background: #FE5100;
						text-align: center;
						border-radius:4upx;
						margin-top: 10upx;
					}
				}
			}
		}
		
		.ddx-information-box{
			width:667upx;
			margin-left: 33upx;
			background-color: #f3f3f3;
			.ddx-information-head{
				width:667upx;
				text-align: center;
				font-size:28upx;
				padding-top:20upx;
				background-color: #fff;
			}
			.ddx-information-comment{
				background-color: #fff;
				padding-top: 40upx;
				width:667upx;
				border-bottom: 1px solid #f3f3f3;
				.information-comment-head{
					display: flex;
					justify-content: flex-start;
					font-size:29upx;
					.vant-icon{
						margin:0 0;
					}
					view{
						margin-left:20upx;
					}
				}
				.information-comment-foot{
					display: flex;
					justify-content: flex-start;
					margin-top: 20upx;
					padding-bottom: 20upx;
					font-size:25upx;
					color:#979797;
					.comment-foot-left{
						width:200upx;
					}
				}
			}
			.ddx-information-basics{
				background-color: #fff;
				padding-top: 20upx;
				width:667upx;
				border-bottom: 2upx solid #A4A4A4;
				.information-basics-head{
					display: flex;
					justify-content: flex-start;
					font-size:29upx;
					.vant-icon{
						margin:0 0;
					}
					view{
						margin-left:10px;
					}
				}
				.information-basics-foot{
					display: flex;
					justify-content: flex-start;
					width:160px;
					margin-top: 13px;
					padding-bottom: 10px;
					font-size:12px;
					display: flex;
					justify-content: space-between;
					.van-icon-wifi{
						font-size: 18px;
						color:#FE5100;
					}
					.van-icon-cha{
						font-size: 18px;
						color:#f56723;
					}
					.basics-foot{
						display: flex;
						justify-content: flex-start;
						.one{
							font-size:25upx;
							color:#FE5100;
						}
						.two{
							font-size:30upx;
							color:#FE8C00;
						}
					}
				}
			}
			.ddx-information-details{
				background-color: #fff;
				padding-top:50upx;
				padding-bottom:20upx;
				width:667upx;
				.ddx-information-detail{
				  margin-top: 20upx;
				  .information-detail-head{
					display: flex;
					justify-content: flex-start;
					font-size:29upx;
					view{
					  margin-left:0upx;
					}
					.van-icon{
					  font-size: 25upx;
					  color:#f3f3f3;
					}
				  }
				  .information-detail-foot{
					width:667upx;
					display: flex;
					justify-content: space-between;
					margin-top: 20upx;
					padding-bottom: 20upx;
					font-size:25upx;
					border-bottom: 2upx solid #f3f3f3;
				  }
				}
			}
			.ddx-information-intro{
				background-color: #fff;
				padding-bottom:40upx;
				width:667upx;
				.intro-top{
					width:667upx;
					display: flex;
					justify-content: start;
					font-size:29upx;
					.vant-icon{
						margin:0 10upx;
						font-size:50upx;
					}
					view{
						margin-left:20upx;
					}
				}
				.intro-detail{
					width:630upx;
					height:163upx;
					font-size:25upx;
					color:#868686;
					line-height:36upx;
					margin:29upx auto;
				}
					
			}
		}
	}
	.servince-notice{
		width: 667upx;
		margin-bottom:6upx;
		margin:22upx auto;
		.cover {
			width:667upx;
			height:475upx;
			margin:0 auto;
		}
	}
	.servince-reply{
		.ddx-reply-list{
		  display: flex;
		  justify-content: start;
		  .ddx-reply-left{
			margin-left:20upx;
			.reply-avatar{
			  width:51upx;
			  height:51upx;
			  margin-left:10upx;
			  border-radius:51upx;
			  overflow: hidden;
			}
		  }
		  .ddx-reply-right{
			margin-left:8upx;
			width:610upx;
			.ddx-reply-name{
			  font-size:18upx;
			  color: #A4A4A4;
			}
			.ddx-reply-date{
			  font-size:14upx;
			  color: #A4A4A4;
			  margin-top: 6upx;
			}
			.ddx-reply-reply{
			  font-size:18upx;
			  margin-top: 10upx;
			}
			.ddx-reply-img{
			  width:610upx;
			  display: flex;
			  justify-content: space-around;
			  .ddx-img-list{
				width:199upx;
				height:199upx;
				margin:20upx auto;
				.reply-image{
				  width:199upx;
				  height:199upx;
				  img{
					width:199upx;
					height:199upx;  
				  }
				}
			  }
			}
		  }
		}
		.ddx-shop-more{
		  width:667upx;
		  height:40upx;
		  line-height: 40upx;
		  font-size:25upx;
		  color:#333333;
		  margin-left:45upx;
		  margin-top: 20upx;
		  padding-bottom: 20upx;
		  text-align: left;
		  display: flex;
		  justify-content: space-between;
		  div{
			width:200upx;
		  }
		  .van-icon{
			margin-top:4px;
		  }
		}
		}
	}
</style>
