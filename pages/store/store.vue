<template>
	<view class="store-box">
		<view class="store-list">
			<image class="cover" :src="cover" mode="aspectFill"></image>
			<view class="store-name">
				{{storeName}}
				<view class="store-distance" v-if="distance">{{distance}}</view>
			</view>
			<view class="store-tips">
				<view class="tips" v-for="(val,key) in tags" :key="key">
					<view class="tip">{{val}}</view>
				</view>
				<button class="store-share" :plain="true" open-type="share" @click="share">
					<view class="vant-icon">&#xe685;</view>
				</button>
			</view>
		</view>
		<view class="store-area-box">
			<view class="store-icon">
				<view class="vant-icon" @click="getArea">&#xe68f;</view>
			</view>
			<view class="store-area" @click="getArea">
				<view class="area-top">
					<view class="area-name">{{area}} <text v-if="tradingArea"> · {{tradingArea}}</text></view>
					<uni-rate class="store-rate" :value="rate" size="12" :disabled="true"></uni-rate>
				</view>
				<view class="store-address">{{address}}</view>
			</view>
			<view class="store-phone">
				<view class="vant-icon" @click="tel">&#xe686;</view>
			</view>
		</view>
		<view class="gray"></view>
		<view class="store-servince">
			<wuc-tab class="wuc-tab" :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
			<view class="ddx-servince-box" v-if="TabCur===0">
				<view class="servince-list" ref="storeIndex" v-for="(val,key) in storeItem" :key="key">
					<view class="servince-left" @click="openPopup(val.ID,val.Type)">
						<view class="servince-img">
							<image :src="val.Image" mode="aspectFill"></image>
						</view>
						<view class="servince-left-one">
							<view class="servince-name">{{val.Name}}</view>
							<view class="servince-price">
								<view class="price-name">￥{{val.Price}}</view>
							</view>
						</view>
						<view class="servince-right">
							<view class="price-order">立即预约</view>
						</view>
					</view>
				</view>
				<view class="servince-reply">
					<view class="ddx-reply-title">消费评论</view>
					<view class="ddx-reply-list" v-for="(val,key) in replyList" :key="key" v-show="key<num">
						<view class="ddx-reply-left">
							<image class="reply-avatar" :src="val.Avatar" mode="aspectFill"></image>
						</view>
						<view class="ddx-reply-right">
							<view class="ddx-reply-name">{{val.Nickname}}</view>
							<view class="ddx-reply-date">{{val.Date}}</view>
							<view class="ddx-reply-reply">{{val.Reply}}</view>
							<view class="ddx-reply-rate">
								<uni-rate class="uni-rate" :value="val.Rate" size="17" disabled="true"></uni-rate>
								<view class="rateServince">服务项目：{{val.ServiceZH}}</view>
							</view>
							<view class="ddx-reply-img" v-show="imgShow">
								<view class="ddx-img-list" v-for="(v,k) in val.Image" :key="k">
									<image class="reply-image" :src="v" mode="aspectFill"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="servince-list-button" @click="buyNow">立即预约</view>
			</view>
			<view class="ddx-information-box" v-if="TabCur===1">
			    <view class="ddx-information-comment">
			      <view class="information-comment-head">
					<view class="vant-icon">&#xe69a;</view>
			        <view>营业时间</view>
			      </view>
			      <view class="information-comment-foot">
			        <view class="comment-foot-left" v-if="rest">{{rest}} 休息</view>
					<view class="comment-foot-left" v-else>平均营业</view>
					<view>{{working}}</view>
			        <view>{{startTime}}-{{endTime}}</view>
			      </view>
			    </view>
			    <view class="ddx-information-basics">
			      <view class="information-basics-head">
					<view class="vant-icon">&#xe699;</view>
			        <view>基础设施</view>
			      </view>
			      <view class="information-basics-foot">
			        <view class="basics-foot" v-for="(val,key) in basicsList" :key="key">
						<view class="vant-icon one"  v-if="val.Icon" v-html="val.Icon"></view>
						<view>{{val.Name}}</view>
			        </view>
			      </view>
			    </view>
			    <view class="ddx-information-details">
			      <view class="ddx-information-detail" v-for="(val,key) in detailsList" :key="key">
			        <view class="information-detail-head">
						<view class="vant-icon" v-show="key==='洗车服务'">&#xe6b0;</view>
						<view class="vant-icon" v-show="key==='美容服务'">&#xe688;</view>
						<view class="vant-icon" v-show="key==='保养服务'">&#xe67b;</view>
						<view class="vant-icon" v-show="key==='维修服务'">&#xe6aa;</view>
						<view class="vant-icon" v-show="key==='改装服务'">&#xe6b0;</view>
						<view>{{key}}</view>
			        </view>
			        <view class="information-detail-foot">
						<view class="information-detail-list" v-for="(v,k) in val" :key="k">
							<view>{{v}}</view>
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
						{{introduction}}
					</view>
				</view>
				<view class="servince-list-button" @click="buyNow1">立即预约</view>
			</view>
			<view class="servince-notice" v-if="TabCur===2">
				<view class="cover">
					<image :src="tabList[TabCur].image"></image>
				</view>
				<view class="servince-list-button" @click="buyNow2">立即预约</view>
			</view>
				    <!-- <view class="ddx-shop-more"  @click="showMore">
				      <view>{{txt}}</view>
					  <view class="vant-icon">&#xe60c;</view>
				    </view> -->
		</view>
		
		<mx-date-picker class="date-box" :show="showPicker" :type="type" :value="value" :show-seconds="false" :storeID="id" @confirm="onSelected" @cancel="onCancel" />
		
		<uni-popup class="uni-popup2" ref="popup2" type="center" style="">
			<view class="buy-title">请选择你要预约的项目</view>
			<view class="servince-list">
				<view class="servince-left" :class="{clean:isclean}" @click="clean()">洗车</view>
				<view class="servince-right" :class="{clean:iscare}" @click="care()">保养</view>
			</view>
			<view class="buy-button" @click="onShowProduct(productID,productType,'datetime')">立即预约</view>
		</uni-popup>
		
		<uni-popup class="uni-popup" ref="popup" type="bottom" style="z-index:1000;">
			<view class="popup-detail">
				<view class="servince-top">
					<view class="popup-title">
						{{itemDetail.Name}}
					</view>
					<view class="tips">仅限5座及其以下车辆</view>
				</view>
				<view style="overflow-y: scroll;height:63vh;-webkit-overflow-scrolling: touch;">
					<image class="popup-img" :src="itemDetail.Image" mode="aspectFill"></image>
					<view class="popup-servince">
						<view class="servince-title">服务内容</view>
						<view class="servince-box">
							<view class="servince-lists" v-for="(val,key) in itemDetail.Service" :key="key">
								<view class="servince-list-label">{{val.Name}}</view>
							</view>
						</view>
					</view>
					<view class="oil-title" v-if="itemDetail.Type===1">机油品牌</view>
					<view class="oil-box" v-for="(val,key) in itemDetail.Oil" :key="key" v-if="itemDetail.Type===1">
						<view class="oil-list">
							<image class="oil-img" :src="val.Image" mode="aspectFill"></image>
							<view class="oil-content">
								<view>{{val.Brand}}</view>
								<view>{{val.SN}}</view>
								<view>{{val.Type}}   {{val.Capacity}}L</view>
								<view>适合{{val.Distance}}km/{{val.Time}}</view>
							</view>
						</view>
					</view>
					<view class="oil-img" v-if="itemDetail.Type===1">
						<image src="https://cdn.doudouxiongglobal.com/pinxiang/image/shop/tips.png"></image>
					</view>
				</view>
			</view>
			<view class="popup-button" @click="onShowDatePicker('datetime')">立即预约</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	import WucTab from '@/components/wuc-tab/wuc-tab.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	import {getStoreByID,getStoreItem,getStoreItemDetail,getStoreReply} from "@/api/index.js"
	export default {
		components: {uniRate, WucTab,uniPopup,MxDatePicker},
		data() {
			return {
				popup2Show:false,
				productID:0,
				productType:0,
				isclean:false,
				iscare:false,
				latitude:'',
				longitude:'',
				id:0,
				userData:[],
				showPicker: false,
				datetime: '2019/01/01 15:00:12',
				type: 'rangetime',
				value: '',
				distance:"", //距离
				cover:'',
				title: '',
				area:'',
				storeName:'',
				address:'',
				TabCur: 0,
				storeCur:0,
				tags:[],
				working:'', //工作时间
				rest:'', // 休息时间
				phone:'',
				startTime:'',
				endTime:'',
				introduction:'',
				rate:0,
				tradingArea:'',
				tabList: [
					{ 
						name: '服务介绍',
					 }, 
					{ 
						name: '门店介绍',
						detail:''
					},
					{ 
						name: '服务须知',
						image:'https://cdn.doudouxiongglobal.com/pinxiang/image/book/book.png'
					},
				],
				storeItem:[],
				itemDetail:[],
				basicsList:[
					
				], 
				detailsList:[
					
				],
				replyList:[
				  
				],
				more:'arrow',
				isShow: true,
				txt: '查看更多精彩评论',
				num: 3,
				itemType:0,
				imgShow:true
			};
		},
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
		    return {
		      title: '品象养车',
		      path: '/pages/index/index'
		    }
		},
		methods:{
			clean(){
				this.isclean = true;
				this.iscare = false;
				this.productType = 0;
				this.productID = this.storeItem[1].ID
			},
			care(){
				this.isclean = false;
				this.iscare = true;
				this.productType = 1;
				this.productID =  this.storeItem[0].ID;
			},
			async onShowProduct(id,type,time){
				console.log(type)
				console.log(id)
				let itemDetail = await getStoreItemDetail(id)
				this.itemType = type
				if(itemDetail.Code === 200){
					this.itemDetail = itemDetail.Data
					this.$refs.popup.open();
					this.$refs.popup2.close();
					// const storeCur = id
					// this.storeCur = storeCur;
					uni.setStorageSync('store_id',parseInt(this.id))
					uni.setStorageSync('store_item_id',id)
					uni.setStorageSync('store_type',type)
					this.popup2Show = false
				}
				let that=this
				setTimeout(function()  {
					that.type = time;
					that.$nextTick(function(){
						that.showPicker = true;
					})
					that.value = that[time];
				}, 200);

				
			},
			buyNow(){
				this.popup2Show = true
				this.$refs.popup2.open();
			},
			buyNow1(){
				this.TabCur = 0;
			},
			buyNow2(){
				this.TabCur = 0;
			},
			tel(){
				let phone = this.phone
				if(phone === ''){
					wx.showToast({
						title:"该商户未录入手机号"
					})
					return false
				}
				wx.makePhoneCall({
					phoneNumber: phone
				})
			},
			getArea(){
				let that = this
				let latitude = that.latitude;
				let longitude = that.longitude;
				   wx.openLocation({
				     latitude,
				     longitude,
				     scale: 18,
					 name:that.storeName,
					 address:that.address
				   })
			},
			async tabChange(index) {
				this.TabCur = index;
				// if(index === 3){
				// 	
				// }
			},
			
			showMore(){
				this.isShow = !this.isShow;
				this.num = this.isShow? 3: this.replyList.length;
				this.txt = this.isShow?  '查看更多精彩评论':'收起'
			},
			async openPopup(id,type){
				let itemDetail = await getStoreItemDetail(id)
				this.itemType = type
				if(itemDetail.Code === 200){
					this.itemDetail = itemDetail.Data
					this.$refs.popup.open();
					// const storeCur = id
					// this.storeCur = storeCur;
					uni.setStorageSync('store_id',parseInt(this.id))
					uni.setStorageSync('store_item_id',id)
					uni.setStorageSync('store_type',type)
				}
				
				// console.log(storeCur)
			},
			share(){
				// this.onShareAppMessage()
			},
			onShowDatePicker(type){//显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			onCancel(e){
				this.showPicker = false;
				this.$refs.popup.close();
			},
			onSelected(e) {//选择
				this.showPicker = false;
				let that = this
				this.$refs.popup.close();
				if(e) {
					console.log(e)
					this[this.type] = e.value; 
					//选择的值
					console.log('value => '+ e.value);
					//原始的Date对象
					console.log('date => ' + e.date);
					let orderTime = e.value;
					uni.setStorageSync('orderTime',orderTime)
				}
				
				if(this.userData.length===0){
					wx.showModal({
						title:'提醒',
						content:"您还未登陆，请前往登陆",
						confirmText:"前往",
						success(res) {
							if(res.confirm) {
								getApp().globalData.redirect=`/pages/store/store?id=${that.id}`
								uni.switchTab({
									url:"/pages/user/user"
								})
							}
						}
					})
					return false
				}
				if(this.userData.Vip === 0){
					wx.showModal({
						title:'提醒',
						content:"您还未购买会员",
						confirmText:"前往",
						success(res) {
							if(res.confirm) {
								uni.navigateTo({
								    url: `/pages/user/active?redirect=/pages/store/store?id=${that.id}`
								});
							}
						}
					})
					return false
				}
				uni.navigateTo({
				    url: 'appointment/appointment'
				});
			}
		},
		onShow() {
			
		},
		async onLoad(options) {
			let id = options.id
			this.id = id
			let that = this
			let replayData = await getStoreReply(that.id)
			if(replayData.Code === 200){
				console.log(replayData.Data)
				that.replyList = replayData.Data
				that.replyRate = replayData.Data.Rate
				console.log(that.replyList[0].Rate)
				if(JSON.stringify(that.replyList.Image)==='[]'){
					that.imgShow = false
				}
			}
			setTimeout(()=>{
				let date = new Date();
				let minute = date.getMinutes()
				if(parseInt(minute)>30){
					that.datetime = (date.getFullYear())+'/'+ (date.getMonth()+1)+'/'+(date.getDate())+' '+(date.getHours()+1)+':00'
				}else{
					that.datetime = (date.getFullYear())+'/'+ (date.getMonth()+1)+'/'+(date.getDate())+' '+(date.getHours())+':30'
				}
			})
			let userData = uni.getStorageSync('user_data')
			if(userData === null ||userData.length === 0){
				
			}else{
				this.userData = JSON.parse(userData)
			}
			let geo = JSON.parse(uni.getStorageSync('geo'))
			let storeData = await getStoreByID(id,{Lat:geo.lat,Lng:geo.lng})
			if(storeData.Code === 200){
				let store = storeData.Data[0]
				this.cover = store.Image[0]
				this.storeName = store.Name
				this.area = store.Area
				this.address = store.Address
				this.tags = store.TagsZH
				this.working = store.WeeksZH
				this.rest = store.Rest
				this.basicsList = store.InfrastructureZH
				this.startTime = store.StartTime
				this.endTime = store.EndTime
				this.introduction = store.Intro
				this.detailsList = store.ServicesZH
				this.phone = store.Phone
				this.rate = store.Rate
				this.latitude = parseFloat(store.Lat)
				this.longitude =parseFloat(store.Lng)
				this.tradingArea = store.TradingArea
				this.distance = store.Distance
				let storeItem = await getStoreItem(store.ID)
				if(storeItem.Code === 200){
					console.log(storeItem.Data)
					this.storeItem = storeItem.Data
				}
			}
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
	// margin-left: 23upx;
}
.wuc-tab /deep/ .wuc-tab-item{
	width:180upx;
	font-size:25upx;
    height: 80upx;
    line-height: 80upx;
    padding: 0 0upx;
    margin: 0 28upx 0 28upx;
	color:#A4A4A4;
	text-align: center;
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
	-webkit-overflow-scrolling: touch;
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
			.store-share{
				background:#fff;
				border-color:#fff;
				padding-right:14upx;
				margin-right:0;
				border-top-style: none;
				border-right-style: none;
				border-bottom-style: none;
				border-left-style: none;
				.vant-icon{
					color:#FE5100;
					font-size:45upx;
					margin-top: -20upx;
				}
			}
		}
	}
	.store-area-box{
		width:667upx;
		display: flex;
		justify-content:flex-start;
		padding-top:31upx;
		border-top:1upx solid #f3f3f3; 
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
					margin-right:33upx;
				}
				.store-rate{
					margin-top: 5upx;
				}
			}
			.store-address{
				width: 508upx;
				font-size:22upx;
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
			border-left:1upx solid #f3f3f3;
			.vant-icon{
				color:#FE5100;
				margin-left: 30upx;
			}
		}
	}
	.store-servince{
		width:750upx;
		.ddx-servince-box{
			.servince-list{
				width:667upx;
				margin-left:33upx;
				margin-top:40upx;
				display: flex;
				justify-content:flex-start;
				.servince-left{
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
					.servince-left-one{
						margin-left:10upx;
						.servince-name{
							font-size:29upx;
						}
						.servince-price{
							width:400upx;
							height:50upx;
							line-height: 50upx;
							margin-top: 15upx;
							display: flex;
							justify-content:space-between;
							.price-name{
								color:#FE5101;
								font-size:40upx;
							}
						}
					}
				}
				.servince-right{
					margin-left: 20upx;
					.price-order{
						width:112upx;
						height:36upx;
						line-height:36upx;
						color:#fff;
						font-size:22upx;
						background: #FE5100;
						text-align: center;
						border-radius:4upx;
						margin-top: 50upx;
					}
				}
			}
			.servince-list-button{
				width:750upx;
				height:98upx;
				line-height:98upx;
				text-align: center;
				background:#FE5100;
				color:#fff;
				position: fixed;
				bottom:0upx;
				left:0upx;
			}
			.servince-reply{
				padding-bottom:100upx;
				.ddx-reply-title{
					width:667upx;
					border-bottom: 2upx solid #f3f3f3;
					font-size:29upx;
					color:rgba(51,51,51,1);
					line-height:72upx;
					margin-left:33upx;
					margin-top: 20upx;
					height:72upx;
				}
				.ddx-reply-list{
				  display: flex;
				  justify-content: start;
				  margin-bottom:20upx;
				  margin-top:20upx;
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
					  font-size:29upx;
					  color: #A4A4A4;
					}
					.ddx-reply-date{
					  font-size:20upx;
					  color: #A4A4A4;
					  margin-top: 6upx;
					}
					.ddx-reply-reply{
					  font-size:29upx;
					  margin-top: 10upx;
					}
					.ddx-reply-rate{
					  font-size:29upx;
					  margin-top: 10upx;
					  display: flex;
					  justify-content: flex-start;
					  .rateServince{
						  margin-left: 20upx;
						  color:#A4A4A0;
					  }
					}
					.ddx-reply-img{
					  width:610upx;
					  display: flex;
					  justify-content: flex-start;
					  .ddx-img-list{
						width:199upx;
						height:199upx;
						margin-top:20upx;
						margin-right:4upx;
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
					justify-content: space-between;
					color:#979797;
					.comment-foot-left{
						// width:200upx;
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
							margin-top:4upx;
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
						margin:0 0 0 0;
						font-size:50upx;
					}
					view{
						margin-left:10upx;
						margin-top:7upx;
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
			.servince-list-button{
				width:750upx;
				height:98upx;
				line-height:98upx;
				text-align: center;
				background:#FE5100;
				color:#fff;
				position: fixed;
				bottom:0upx;
				left:0upx;
			}
		}
		
	}
	.servince-notice{
		width: 750upx;
		margin-bottom:6upx;
		margin:22upx auto;
		.cover {
			width:750upx;
			height:1395.2781upx;
			margin:0 auto;
			image{
				width:100%;
				height: 100%;
			}
			
		}
		.servince-list-button{
			width:750upx;
			height:98upx;
			line-height:98upx;
			text-align: center;
			background:#FE5100;
			color:#fff;
			position: fixed;
			bottom:0upx;
			left:0upx;
		}
	}
	.uni-popup{
		width:750upx;
		z-index:1000;
		.popup-detail{
			width:667upx;
			margin:0 auto;
			.servince-top{
				margin-top:2vh;
				width:667upx;
				height:10vh;
				background: #fff;
				border-radius:11upx 11upx 0px 0px;
				.popup-title{
					width:300upx;
					height:50upx;
					line-height:50upx;
					font-size:33upx;
					margin: 0 0;
					border-bottom: 3upx solid #FE5100;
					z-index: 1000;
				}
				.tips{
					font-size:22upx;
					margin: 7upx 0;
					color:#A4A4A4;
					z-index: 1000;
				}
			}
			.popup-img{
				width:667upx;
				height:399upx;
				img{
					width:667upx;
					height:399upx;
				}
			}
			.popup-servince{
				.servince-title{
					width:139upx;
					height:50upx;
					border-bottom: 3upx solid #FE5100;
					font-size:33upx;
				}
				.servince-box{
					width:667upx;
					margin-top:20upx;
					display: flex;
					flex-wrap: wrap;
					justify-content: flex-start;
					.servince-lists{
						margin-top:10upx;
						margin-bottom:20upx;
						margin-right:7upx;
						.servince-list-label{
							text-align: center;
							width:150upx;
							font-size:25upx;
							padding:3upx 2upx;
							border:2upx solid #E7E7E7;
							border-radius:11upx;
						}
					}
				}
			}
			.oil-img{
				width:667upx;
				height:1090.54114upx;
				margin-bottom:30upx;
				image{
					width:667upx;
					height:1090.54114upx;
				}
			}
		}
		.popup-button{
			width:750upx;
			height:8vh;
			line-height:8vh;
			text-align: center;
			background:#FE5100;
			color:#fff;
			position: fixed;
			bottom:0;
			left:0;
		}
		
		.oil-title{
			margin-top:50upx;
			width:139upx;
			height:50upx;
			border-bottom: 3upx solid #FE5100;
			font-size:33upx;
		}
		.oil-box{
			margin-top:34upx;
			.oil-list{
				display: flex;
				justify-content: start;
				.oil-img{
					width:234upx;
					height:217upx;
					img{
						width:234upx;
						height:217upx;
					}
				}
				.oil-content{
					height:217upx;
					margin-left:34upx;
					border-left:3upx solid #FE5100;
					view{
						height:50upx;
						line-height: 50upx;
						margin-left: 34upx;
						font-size:27upx;
						margin-top:5upx;
					}
				}
			}
		}
	}
	.uni-popup{
		width:514upx!important;
		height:397upx;
		border-radius:11upx;
		padding-top:0;
		.buy-title{
			width:514upx;
			height:82upx;
			line-height: 82upx;
			text-align:center;
			color:#fff;
			font-size:27upx;
			background:rgba(254,81,0,1);
			border-radius:11upx 11upx 0upx 0upx;
		}
		
		.servince-list{
			font-size:33upx;
			width:407upx;
			margin:76upx auto 0 auto;
			display: flex;
			justify-content:space-between;
			.servince-left{
				width:145upx;
				height:58upx;
				line-height: 58upx;
				background:rgba(164,164,164,0.2);
				border-radius:29upx;
				text-align: center;
				font-size:29upx;
				color:#A4A4A4;
			}
			.servince-right{
				width:145upx;
				height:58upx;
				line-height: 58upx;
				background:rgba(164,164,164,0.2);
				border-radius:29upx;
				text-align: center;
				font-size:29upx;
				color:#A4A4A4;
			}
			.clean{
				background:rgba(254,81,0,0.2);
				color:#FE5100;
			}
			.care{
				background:rgba(254,81,0,0.2);
				color:#FE5100;
			}
		}
		.buy-button{
			width:375upx;
			height:67upx;
			line-height: 67upx;
			color:#fff;
			text-align:center;
			background:rgba(254,81,0,1);
			border-radius:11px;
			font-size:29upx;
			margin:76upx auto 40upx auto;
		}
	}
	.date-box{
		z-index:2000;
	}
	.uni-popup2{
		width:750upx;
		z-index:1000;
		padding-top:50upx;
		.share-box{
			width:500upx;
			margin:0 auto;
			display:flex;
			justify-content:space-between;
			.share-friend{
				width:300upx;
				height:200upx;
				background:#fff;
				.share-img{
					width:80upx;
					height:80upx;
					margin-left:60upx;
					img{
						width:80upx;
						height:80upx;
					}
				}
				.share-word{
					width:200upx;
					text-align: center;
				}
			}
			.share-circle{
				width:300upx;
				height:200upx;
				background:#fff;
				.share-img{
					width:80upx;
					height:80upx;
					margin-left:60upx;
					img{
						width:80upx;
						height:80upx;
					}
				}
				.share-word{
					width:200upx;
					text-align: center;
				}
			}
	
		}
	}
}
</style>
