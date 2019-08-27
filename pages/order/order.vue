<template>
	<view class="content">
		<view class="navbar">
			<view 
				v-for="(item, index) in navList" :key="index" 
				class="nav-item" 
				:class="{current: tabCurrentIndex === index}"
				@click="tabClick(index)"
			>
				{{item.text}}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view 
					class="list-scroll-content" 
					scroll-y
					@scrolltolower="loadData"
				>
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>
					
					<!-- 订单列表 -->
					<view v-for="(item,index) in tabItem.orderList" :key="index" class="order-item">
						<view class="i-top b-b">
							<text>预约编号：</text>
							<text>{{item.orderId}}</text>
						</view>
						
						<view class="goods-box">
							<view class="goods-item">
								<image class="goods-img" :src="item.goods.image" mode="aspectFill"></image>
							</view>
							<view class="goods-items">
								<text class="goods-content">{{item.goods.content}}</text>
							</view>
						</view>
						<view class="price-box">
							<view class="price-box-time">
								<text class="time">{{item.time}}</text>
							</view>
							<view class="price-box-price">
								<text class="price">30.00</text>
								<text class="num">会员免费</text>
							</view>
						</view>
						<view class="action-box b-t">
							<text class="action-text" v-if="item.state != 4">有效期至：2019-09-30 22:22</text>
							<!-- 根据状态不同显示 -->
							<text class="action-text" v-if="item.state === 4">消费时间：2019-09-30 22:22</text>
							<button class="action-btn recom" v-if="item.state === 4">已取消</button>
							<button class="action-btn recom" v-if="item.state === 2">写评价</button>
							<button class="action-btn recom" v-if="item.state === 3">已逾期</button>
							<button class="action-btn" @click="openPopup(index)" v-if="item.state === 1">取消</button>
							<button class="action-btn recom" v-if="item.state === 1" @click="goStore">已预约</button>
						</view>
						<view class="action-bot" v-if="item.state === 4">取消原因：{{item.goods.noBuy}}</view>
					</view>
					 
					<uni-load-more :status="tabItem.loadingType"></uni-load-more>
					
				</scroll-view>
			</swiper-item>
		</swiper>
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
		<xy-dialog 
			style="z-index:100000;"
		    :show="show" 
		    title="提示" 
		    content="哈哈，还是被你看到了..."
		    @cancel="clickCancel('cancel')" 
		    @confirm="clickConfirm('confirm')">
		</xy-dialog>
	</view>
</template> 

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import xyDialog from '@/components/xy-dialog/xy-dialog.vue';
	import empty from "@/components/empty";
	import Json from '@/Json';
	export default {
		components: {
			uniLoadMore,
			empty,
			uniPopup,
			xyDialog
		},
		data() {
			return {
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
				tabCurrentIndex: 0,
				navList: [{
						state: 0,
						text: '全部预约',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						text: '已预约',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 2,
						text: '已体验',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 3,
						text: '已逾期',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 4,
						text: '已取消',
						loadingType: 'more',
						orderList: []
					},
				],
			};
		},
		
		onLoad(options){
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			this.tabCurrentIndex = +options.state;
			// #ifndef MP
			this.loadData()
			// #endif
			// #ifdef MP
			if(options.state == 0){
				this.loadData()
			}
			// #endif
			
		},
		 
		methods: {
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			//获取订单列表
			loadData(source){
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let state = navItem.state;
				
				if(source === 'tabChange' && navItem.loaded === true){
					//tab切换只有第一次需要加载数据
					return;
				}
				if(navItem.loadingType === 'loading'){
					//防止重复加载
					return;
				}
				
				navItem.loadingType = 'loading';
				
				setTimeout(()=>{
					let orderList = Json.orderList.filter(item=>{
						//添加不同状态下订单的表现形式
						item = Object.assign(item, this.orderStateExp(item.state));
						//演示数据所以自己进行状态筛选
						if(state === 0){
							//0为全部订单
							return item;
						}
						return item.state === state
					});
					orderList.forEach(item=>{
						navItem.orderList.push(item);
					})
					//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
					this.$set(navItem, 'loaded', true);
					
					//判断是否还有数据， 有改为 more， 没有改为noMore 
					navItem.loadingType = 'more';
				}, 600);	
			}, 

			//swiper 切换
			changeTab(e){
				this.tabCurrentIndex = e.target.current;
				this.loadData('tabChange');
			},
			//顶部tab点击
			tabClick(index){
				this.tabCurrentIndex = index;
			},
			//删除订单
			openPopup(index){
				this.$refs.popup.open();
				// const storeCur = key
				// this.storeCur = storeCur;
				// console.log(storeCur)
			},
			deleteOrder(index){
				uni.showLoading({
					title: '请稍后'
				})
				setTimeout(()=>{
					this.navList[this.tabCurrentIndex].orderList.splice(index, 1);
					uni.hideLoading();
				}, 600)
			},
			//关闭取消弹框
			closePopup(){
				this.$refs.popup.close()
			},
			//取消订单
			orderCancel(index){
				this.show = true
				console.log(index)
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
			}
		},
	}
</script>

<style lang="scss" scoped>
	page, .content{
		background: $page-color-base;
		height: 100%;
	}
	
	.swiper-box{
		height: calc(100% - 40px);
	}
	.list-scroll-content{
		height: 100%;
	}

	.navbar{
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: #A4A4A4;
			position: relative;
			&.current{
				color: #333333;
				font-size: 16px;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 50%;
					height: 0;
					border-bottom: 2px solid #FE5100;
				}
			}
		}
	}
	.uni-popup{
			width:750upx;
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
				width:667upx;
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

