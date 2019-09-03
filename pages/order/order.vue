<template>
	<view class="content">
		<wuc-tab class="wuc-tab" :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
		<view class="order-none" v-if="orderNoneShow">
			<view class="vant-icon">&#xe6a0;</view>
			<view>暂无订单</view>
		</view>
		<view v-for="(item,index) in orderList" :key="index" class="order-item" v-if="orderShow">
			<view class="i-top b-b">
				<text>预约编号：</text>
				<text>{{item.SerialNumber}}</text>
			</view>
			
			<view class="goods-box" @click="goStoreDetail(item.ID)">
				<view class="goods-item">
					<image class="goods-img" :src="item.Image" mode="aspectFill"></image>
				</view>
				<view class="goods-items">
					<text class="goods-content">{{item.Name}}</text>
				</view>
			</view>
			<view class="price-box">
				<view class="price-box-time">
					<text class="time">{{item.CreatedDate}}</text>
				</view>
				<view class="price-box-price">
					<text class="price">30.00</text>
					<text class="num">会员免费</text>
				</view>
			</view>
			<view class="action-box b-t">
				<text class="action-text" v-if="item.Status != 5">有效期至：{{item.EffectiveTime}}</text>
				<!-- 根据状态不同显示 -->
				<text class="action-text" v-if="item.Status === 5">消费时间：{{item.UpdatedDate}}</text>
				<button class="action-btn recom" v-if="item.Status === 5">已取消</button>
				<button class="action-btn recom" @click="goReply(item.StoreID,item.SID)" v-if="item.Status === 3">写评价</button>
				<button class="action-btn recom" v-if="item.Status === 4">已逾期</button>
				<button class="action-btn" @click="openPopup(index,item.ID)" v-if="item.Status === 1">取消</button>
				<button class="action-btn recom" v-if="item.Status === 1" @click="goStore">已预约</button>
			</view>
			<view class="action-bot" v-if="item.Status === 5">取消原因：{{item.CancelReason}}</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup-detail">
				<view class="popup-title">取消原因</view>
				<view class="popup-tip">频繁取消预约会降低您的信用积分哦</view>

				<view class="popup-cancel">
					<radio-group @change="radioChange">
						<label class="radio" v-for="(item, index) in items" :key="item.value" @click="orderCancel(index)">
							<view class="radio-name">{{item.name}}</view>
							<view>
								<radio :value="item.value" :checked="index === current"/>
							</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="popup-button" @click="closePopup">暂时不取消</view>
		</uni-popup>
	</view>
</template> 

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import xyDialog from '@/components/xy-dialog/xy-dialog.vue';
	import WucTab from '@/components/wuc-tab/wuc-tab.vue'
	import {getAppointment,cancleOrder} from "@/api/index.js"
	export default {
		components: {
			uniLoadMore,
			WucTab,
			uniPopup,
			xyDialog
		},
		data() {
			return {
				orderNoneShow:true,
				orderShow:false,
				show:false,
				items: [{
						value: "0",
						name:"不取消"
					},{
						value: "1",
						name:"门店选错（位置与我较远）"
					},
					{
						value: "2",
						name:"个人时间安排有冲突"
					},
					{
						value: "3",
						name:"门店告知缺货（机油等配件）"
					},
				],
				current: 0,
				TabCur: 0,
				id:1,
				storeID:0,
				tabList: [
					{ 
						name: '全部预约',
					 }, 
					{ 
						name: '已预约',
					},
					{ 
						name: '已体验',
					},
					{ name: '已逾期' },
					{ name: '已取消' },
				],
				orderList: [],
				// cancelOrderList:[],
			};
		},
		async onShow() {
			let type = 0
			let appointmentData = await getAppointment(type)
			// console.log(appointmentData.Data[0])
			if(appointmentData.Code === 200){
				this.orderList = appointmentData.Data
				console.log(appointmentData.Data)
				if(this.orderList.length === 0){
					this.orderNoneShow = true
					this.orderShow = false
					return false
				}
				this.orderNoneShow = false
				this.orderShow = true
			}
		},
		
		onLoad(options){
			
		},
		 
		methods: {
			goStoreDetail(id){
				uni.navigateTo({
				    url: `../store/coupon/coupon?id=${id}`,
					
				});
			},
			goReply(storeID,storeItemID){
				uni.navigateTo({
				    url: `../reply/reply?store=${storeID}&item=${storeItemID}`,
					
				});
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			async tabChange(index) {
				this.TabCur = index;
				if(index === 1){
					let type = 1
					let appointmentData = await getAppointment(type)
					// console.log(appointmentData.Data[0])
					if(appointmentData.Code === 200){
						this.orderList = appointmentData.Data
					}
				}
				if(index === 0){
					let type = 0
					let appointmentData = await getAppointment(type)
					// console.log(appointmentData.Data[0])
					if(appointmentData.Code === 200){
						this.orderList = appointmentData.Data
					}
				}
				if(index === 2){
					let type = 3
					let appointmentData = await getAppointment(type)
					// console.log(appointmentData.Data[0])
					if(appointmentData.Code === 200){
						this.orderList = appointmentData.Data
					}
				}
				if(index === 3){
					let type = 4
					let appointmentData = await getAppointment(type)
					// console.log(appointmentData.Data[0])
					if(appointmentData.Code === 200){
						this.orderList = appointmentData.Data
					}
				}
				if(index === 4){
					let type = 5
					let appointmentData = await getAppointment(type)
					if(appointmentData.Code === 200){
						this.orderList = appointmentData.Data
					}
				}
				// console.log(this.orderList)
			},
			
			openPopup(index,id){
				this.$refs.popup.open();
				this.id = id
				// console.log(this.id)
			},
			//关闭取消弹框
			closePopup(){
				this.$refs.popup.close()
			},
			//取消订单
			orderCancel(index){
				let id =  this.id
				let cancelReason = this.items[index].name;
				console.log(cancelReason)
				wx.showModal({
					title: '提示',
					  content: '确定取消吗？',
					  async success (res) {
					    if (res.confirm) {
							let data = {
								CancelReason:cancelReason
							}
							let cancleOrderData = await cancleOrder(id,data)
					    } else if (res.cancel) {
					      
					    }
					  }
				})
				this.$refs.popup.close()
			},
			cancelOrder(item){
				setTimeout(()=>{
					let {stateTip, stateTipColor} = this.orderStateExp(9);
					item = Object.assign(item, {
						state: 9,
						stateTip, 
						stateTipColor
					})
					
					//取消订单后删除待付款中该项
					let list = this.navList[1].orderList;
					let index = list.findIndex(val=>val.id === item.id);
					index !== -1 && list.splice(index, 1);
					
					uni.hideLoading();
				}, 600)
			},

			//订单状态文字和颜色
			orderStateExp(state){
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch(+state){
					case 1:
						stateTip = '待付款'; break;
					case 2:
						stateTip = '待发货'; break;
					case 9:
						stateTip = '订单已关闭'; 
						stateTipColor = '#909399';
						break;
						
					//更多自定义
				}
				return {stateTip, stateTipColor};
			},
			goStore(){
				uni.navigateTo({
				    url: '../store/coupon/coupon'
				});
			},
			closeFunc(){
				this.show = false
			}
		},
	}
</script>

<style lang="scss" scoped>
	.wuc-tab{
		width:750upx;
	}
	.wuc-tab /deep/ .wuc-tab-item{
		width:130upx;
		font-size:25upx;
	    height: 80upx;
	    line-height: 80upx;
	    margin: 0 10upx 0 10upx;
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
	
	.uni-popup{
			width:750upx;
			z-index:1000;
			.popup-detail{
				width:667upx;
				margin:0 auto;
				.popup-title{
					width:667upx;
					height:50upx;
					text-align: center;
					line-height:50upx;
					font-size:33upx;
				}
				.popup-tip{
					width:667upx;
					height:30upx;
					text-align: center;
					line-height:30upx;
					font-size:22upx;
					color:#FE5100;
				}
				.popup-cancel{
					width:667upx;
					margin-top:20upx;
					.radio{
						width:667upx;
						height:69upx;
						line-height:69upx;
						margin:0 auto;
						display: flex;
						justify-content:space-between;
						border-bottom: 2upx solid #f3f3f3;
						.radio-name{
							width:600upx;
							font-size:29upx;
						}
					}
					.radio:first-child{
						display: none;
					}
				}
			}
			.popup-button{
				margin-top: 111upx;
				width:750upx;
				height:98upx;
				line-height:98upx;
				text-align: center;
				background:#FE5100;
				color:#fff;
			}
		}
	
	.uni-swiper-item{
		height: auto;
	}
	.order-none{
		text-align: center;
		.vant-icon{
			color:#f3f3f3;
			font-size:240upx;
			margin-top: 300upx;
		}
		view{
			color:#A4A4A4;
			font-size:29upx;
		}
	}
	.order-item{
		display: flex;
		flex-direction: column;
		width:100%;
		margin:0 auto;
		background: #fff;
		margin-top: 16upx;
		border-radiu:8px;
		.i-top{
			display: flex;
			align-items: center;
			height: 80upx;
			padding-left:50upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;
			.time{
				flex: 1;
			}
			.state{
				color: $base-color;
			}
			.del-btn{
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;
				&:after{
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
		/* 多条商品 */
		.goods-box{
			width:90%;
			margin:0 auto;
			height: 140upx;
			padding-left:20upx;
			display: flex;
			justify-content: space-between;
			.goods-item{
				width: 30%;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
				.goods-img{
					display: block;
					width: 100%;
					height: 100%;
				}
			}
			.goods-items{
				width: 65%;
				height: 120upx;
				display: inline-block;
				.goods-content{
					display: block;
					font-size: 14px;
					height: 120upx;
					width: 100%;
					height: 100%;
				}
			}
		}
		.price-box{
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			padding: 5px 30upx 5upx 50upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.price-box-time{
				
			}
			.price-box-price{
				color: #333333;
				font-size: $font-sm + 3upx;
				.price{
					&:before{
						content: '￥';
						margin: 0 2upx 0 8upx;
					}
					text-decoration: line-through;
					color:#A4A4A4;
				}
				.num{
					margin: 0 10upx 0 30upx;
				}
			}
		}
		.action-box{
			width:92%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-left:50upx;
		}
		.action-text{
			width:400upx;
			font-size:25upx;
			color:#A4A4A4;
		}
		.action-btn{
			width: 120upx;
			height: 60upx;
			margin: 0;
			margin-right: 20upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-color: #A4A4A4;
			&:after{
			}
			&.recom{
				color: #FE5100;
			}
		}
		.action-bot{
			width:92%;
			padding-left:50upx;
			color:#FE5100;
			font-size:24upx;
			display: flex;
			justify-content: flex-start;
		}
	}

	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}
	
	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}
	
	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}
	
	.uni-load-more__img>view {
		position: absolute
	}
	
	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}
	
	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}
	
	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}
	
	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}
	
	.load2 {
		transform: rotate(30deg)
	}
	
	.load3 {
		transform: rotate(60deg)
	}
	
	.load1 view:nth-child(1) {
		animation-delay: 0s
	}
	
	.load2 view:nth-child(1) {
		animation-delay: .13s
	}
	
	.load3 view:nth-child(1) {
		animation-delay: .26s
	}
	
	.load1 view:nth-child(2) {
		animation-delay: .39s
	}
	
	.load2 view:nth-child(2) {
		animation-delay: .52s
	}
	
	.load3 view:nth-child(2) {
		animation-delay: .65s
	}
	
	.load1 view:nth-child(3) {
		animation-delay: .78s
	}
	
	.load2 view:nth-child(3) {
		animation-delay: .91s
	}
	
	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}
	
	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}
	
	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}
	
	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}
	
	@-webkit-keyframes load {
		0% {
			opacity: 1
		}
	
		100% {
			opacity: .2
		}
	}
</style>

