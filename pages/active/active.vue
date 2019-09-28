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
		<view class="active-code">
			<image class="code-img" src="https://cdn.doudouxiongglobal.com/store/active/bg-code2.png" mode="aspectFill"></image>
			<view class="active-code-word">等待开奖</view>
			<view class="active-code-word2">抽奖码</view>
			<view class="active-code-word3" v-if="isLogin===1">{{code}}</view>
			<view class="active-code-word4" v-if="isLogin===0">*********</view>
		</view>
		<view class="active-scan">
			<image class="code-img" :src="activeList.QrCode" mode="aspectFill"></image>
			<view class="scan-word1">截图微信识别二维码</view>
			<view class="scan-word2">获取最新开奖信息</view>
			<view class="vant-icon">&#xe6b7;</view>
			<view class="scan-word1">抽奖码列表</view>
			<view class="scan-join">
				<view class="scan-join-word" v-if="isLogin===0" @click="getCode">参与活动</view>
				<view class="scan-join-word2" v-if="isLogin===1" @tap="createCanvasImageEvn">获得更多抽奖码</view>
				<view class="vant-icon finger samll" v-if="isLogin===0">&#xe6b8;</view>
				<view class="vant-icon finger large" v-if="isLogin===1">&#xe6b8;</view>
			</view>
			<view class="active-join-lists" v-if="moreShow">
				<view class="active-join-list" v-for="(val,key) in activeList.CodeList" :key="key" v-show="key<num">
					·{{val}}
				</view>
				<view class="showMore" @click="showMore">
					{{txt}}
					<view class="vant-icon" v-if="isShow===true">&#xe60c;</view>
					<view class="vant-icon top" v-if="isShow===false">&#xe6b4;</view>
				</view>
			</view>
		</view>
		<view class="active-rule">
			<view class="active-rule-top">
				<view class="rule-line left"></view>
				<view class="rule-word">活动规则</view>
				<view class="rule-line right"></view>
			</view>
			<view class="active-rule-content">
				1. 活动时间：2019年9月27日—2019年10月7日
				</br>
				2. 参与方式：点击授权手机号码，获取抽奖码 
				</br>
				3. 活动规则：在活动期间参与活动，可通过本人参与、受邀、邀请好友三种方式参与活动 
				</br>
				1)首次进入活动，参与活动后获得一个抽奖码； 
				</br>
				2)每次被邀请人接受邀请，发起人和被邀请人双方各自可获得1个抽奖码
			</view>
		</view>
		<view class="gray"></view>
		<view class="active-gift">
			<view class="active-rule-top">
				<view class="rule-line left"></view>
				<view class="rule-word">活动规则</view>
				<view class="rule-line right"></view>
			</view>
			<view class="active-gift-img">
				<image class="active-gift-image" src="https://cdn.doudouxiongglobal.com/store/active/zhekou.png" mode="aspectFill"></image>
			</view>
			
			<view class="vip-lists">
				<view class="vip-list">
					<view class="vip-list-left">
						<view class="vant-icon">&#xe6ad;</view>
						<!-- <i class="van-icon van-icon-dianpu"></i> -->
					</view>
					<view class="vip-list-right">严选门店</view>
				</view>
				<view class="vip-list">
					<view class="vip-list-left">
						<view class="vant-icon">&#xe6ab;</view>
					</view>
					<view class="vip-list-right">会员畅养</view>
				</view>
				<view class="vip-list">
					<view class="vip-list-left">
						<view class="vant-icon">&#xe6ae;</view>
					</view>
					<view class="vip-list-right">洗车免费</view>
				</view>
				<view class="vip-list">
					<view class="vip-list-left">
						<view class="vant-icon">&#xe6b1;</view>
					</view>
					<view class="vip-list-right">品质保证</view>
				</view>
			</view>
			<view class="gift-img">
				<image class="gift-image" src="https://cdn.doudouxiongglobal.com/store/vip/re-vip.png" mode=""></image>
			</view>
		</view>
		<view class="content">
			<!-- <button class="share-btn" @tap="createCanvasImageEvn">分享</button> -->
			<view v-if="deliveryFlag" style="position: fixed;top:0;left:0;width: 100vw;height: 100vh;">
				<view style="position: fixed;background: rgba(0,0,0,0.4);top:0;left:0;width: 100vw;height: 100vh;" @click="canvasCancel"></view>
				<hchPoster ref="hchPoster" :canvasFlag.sync="canvasFlag" @cancel="canvasCancel" :posterObj.sync="posterData"/>
				<view :hidden="canvasFlag"><!-- 海报 要放外面放组件里面 会找不到 canvas-->
					<canvas class="canvas"  canvas-id="myCanvas" ></canvas><!-- 海报 -->
				</view>
			</view>
			
			<!-- 分享弹窗-->
			<view class="share-pro" >
				<!-- <view class="share-pro-mask" v-if="deliveryFlag"></view> -->
				<view class="share-pro-dialog" :class="deliveryFlag?'open':'close'" >
					<!-- <view class="close-btn" @tap="closeShareEvn">
						<span class="font_family">&#xe6e6;</span>
					</view> -->
					<!-- <view class="share-pro-title">分享</view> -->
					<view class="share-pro-body">
						<view class="share-item">
							<button open-type="share">
								<view class="font_family share-icon">&#xe6fa;</view>
								<view >分享给好友</view>
							</button>
						</view>
						<view class="share-item" @tap="saveCanvasImage">
							<view class="font_family share-icon">&#xe6f9;</view>
							<view >保存图片</view>
						</view>
					</view>
		
				</view>
			</view>
			
		</view> 
	</view>
</template>

<script>
	import hchPoster from '../../components/hch-poster/hch-poster.vue'
	import {getWinninCode,getActive} from '../../api/index.js'
	export default {
		components: {hchPoster},
	    data() {
	        return {
				deliveryFlag: false,
				canvasFlag: true,
				posterData:{},
				moreShow:true,
				isLogin:1,
	            indicatorDots: true,
	            autoplay: true,
	            interval: 3000,
	            duration: 500,
				isShow: true,
				txt: '查看更多',
				num: 7,
				activeList:[],
				bgCode:"https://img0.zuipin.cn/mp_zuipin/poster/hch-code.png",
				bgImg:'https://cdn.doudouxiongglobal.com/pinxiang/image/poster.jpg',
				avatar:""
	        }
	    },
	    methods: {
			createCanvasImageEvn(){
				// 这个是固定写死的小程序码
				let that = this
				that.deliveryFlag = true;
				Object.assign(this.posterData,
				{
					url:that.bgImg,//商品主图
					icon:that.avatar,//醉品价图标
					title:"诗酒茶系列 武夷大红袍 2018年 花香型中火 一级 体验装 16g",//标题
					discountPrice:"250.00",//折后价格
					orignPrice:"300.00",//原价
					code:that.bgCode,//小程序码
				})
				that.$forceUpdate();//强制渲染数据
				setTimeout(()=>{
					that.canvasFlag=false;//显示canvas海报
					// that.deliveryFlag = false;//关闭分享弹窗
					that.$refs.hchPoster.createCanvasImage();//调用子组件的方法
				},500)
				// 这个是固定写死的小程序码 end
				// 以下是根据后端接口动态生成小程序码
				// let code="https://img0.zuipin.cn/mp_zuipin/poster/hch-code.png";
				// this.codeImg().then((res)=>{
				// 	code = res;
				// 	Object.assign(this.posterData,
				// 	{
				// 		url:'https://img0.zuipin.cn/mp_zuipin/poster/hch-pro.jpg',//商品主图
				// 		icon:'https://img0.zuipin.cn/mp_zuipin/poster/hch-hyj.png',//醉品价图标
				// 		title:"诗酒茶系列 武夷大红袍 2018年 花香型中火 一级 体验装 16g",//标题
				// 		discountPrice:"250.00",//折后价格
				// 		orignPrice:"300.00",//原价
				// 		code:code,//小程序码
				// 	})
				// 	this.$forceUpdate();//强制渲染数据
				// 	setTimeout(()=>{
				// 		this.canvasFlag=false;//显示canvas海报
				// 		this.deliveryFlag = false;//关闭分享弹窗
				// 		this.$refs.hchPoster.createCanvasImage();//调用子组件的方法
				// 	},500)
				// })
				// 以下是根据后端接口动态生成小程序码 end
			},
			
			// 获取海报的小程序码
			codeImg(){
				let that =this
				return new Promise((resolve,reject)=>{
					wx.request({
						method: 'get',
						url:'http://javaXXXXX',//自己java接口
						header: { 'Content-Type': 'application/x-www-form-urlencoded'},
						data: {
							scene:`sku=${that.sku}`,//自己的参数
							page:"pages/product/detail",//想要生成小程序码的页面地址
							width:"128px",//小程序码大小
						},
						success: res => {
						  if(res.data.code==0){
							if (res.data.code==0) {
								const fsm = wx.getFileSystemManager();
								const FILE_BASE_NAME = 'tmp_img_src';
								let filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.jpg`;//图片临时地址
								fsm.writeFile({
									filePath,
									data: res.data.data,
									encoding: 'binary',
									success() {
										resolve(filePath)
									},
									fail() {
										that.canvasFlag=true;
										uni.showToast({title:'海报生成失败',duration:2000,icon:'none'});
									},
								});
							} else {
								uni.showToast({title: res.data.message, icon: 'none',duration: 2000,icon:'none'})
							}
						  }else{
							this.canvasFlag=true;
							uni.showToast({title:'海报生成失败',duration:2000,icon:'none'});
						  }
						},
						fail:res=>{
						  that.canvasFlag=true;
						  uni.showToast({title:'海报生成失败',duration:2000,icon:'none'});
						}
				  })
				})
			},
			// 分享弹窗
			shareEvn() {
				let that = this
				that.deliveryFlag = true;
			},
			//保存图片
			saveCanvasImage(){
				console.log('点击了保存')
				wx.showLoading({
					title: '保存中...'
				})
				let _this = this;
				// 1-把画布转化成临时文件
				uni.canvasToTempFilePath({
				x: 50,
				y: 40,
				width:(this.phoneW-100),    // 画布的宽
				height: (this.phoneH-120),   // 画布的高
				destWidth: (this.phoneW-100)*5,
				destHeight: (this.phoneH-120)*5,
				canvasId: 'myCanvas',
				success(res) {
					// 2-保存图片至相册
					uni.saveImageToPhotosAlbum({
					filePath: res.tempFilePath,
					success(res2) {
						wx.hideLoading();
						uni.showToast({title: '图片保存成功，可以去分享啦~', duration: 2000})
						_this.canvasCancelEvn();
					},
					fail() {
						uni.showToast({title: '保存失败，稍后再试', duration: 2000,icon:'none'})
						wx.hideLoading();
					}
					})
				},
				fail() {
					uni.showToast({title: '保存失败，稍后再试',duration: 2000,icon:'none'})
					wx.hideLoading();
				}
				})
			},
			
			// 关闭分享弹窗
			closeShareEvn() {
				let that = this
				that.deliveryFlag = false;
				that.canvasFlag = true;
			},
			// 取消海报
			canvasCancel(val){
				let that = this
				that.canvasFlag=val;
				this.deliveryFlag = false;
			},
			showMore(){
				console.log('1', this.isShow);
				this.isShow = !this.isShow;
				console.log('2', this.isShow);
				this.num = this.isShow? 7: this.codeList.length;
				this.txt = this.isShow?  '查看更多':'收起'
			},
			async getCode(){
				let that = this
				let codeData = await getWinninCode()
				if(codeData.Code === 200){
					console.log(codeData.Data)
					that.code = codeData.Data
					
				}
			}
			
	    },
		async onLoad() {
			let that = this
			let userData =JSON.parse(uni.getStorageSync('user_data'));
			console.log(userData)
			this.avatar = userData.Avatar
			console.log(this.avatar)
			let activeData = await getActive()
			if(activeData.Code === 200){
				console.log(activeData.Data)
				if(JSON.stringify(activeData.Data)!=='[]'){
					that.activeList = activeData.Data
					console.log(that.activeList)
					if(that.activeList.CodeList.length ===0){
						that.moreShow = false
					}
				}
				
			}
		},
		onShow() {
			console.log(1)
		}
	}
</script>

<style lang="scss" scoped>
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
.active-code{
	width:750upx;
	height:179upx;
	position: relative;
	border-bottom: 1px solid #f3f3f3;
	.code-img{
		width:523upx;
		height:150upx;
		margin-top:14upx;
		margin-left: 114upx;
	}
	.active-code-word{
		position: absolute;
		top:69upx;
		left:140upx;
		color:#fff;
		font-size:29upx;
		font-weight:500;
	}
	.active-code-word2{
		position: absolute;
		top:35upx;
		left:433upx;
		font-size:29upx;
		font-weight:500;
	}
	.active-code-word3{
		position: absolute;
		top:85upx;
		left:408upx;
		color:#FE5100;
		font-size:29upx;
		font-weight:500;
	}
	.active-code-word4{
		position: absolute;
		top:85upx;
		left:419upx;
		color:#FE5100;
		font-size:29upx;
		font-weight:500;
	}
}
.active-scan{
	width:750upx;
	height:670upx;
	.code-img{
		width:284upx;
		height:284upx;
		margin-left:233upx;
		margin-top:20upx;
	}
	.scan-word1{
		width:750upx;
		text-align: center;
		font-size:27upx;
		font-weight:400;
	}
	.scan-word2{
		width:750upx;
		text-align: center;
		font-size:31upx;
		font-weight:500;
		color:#FE5100;
		margin-top:5upx;
	}
	.vant-icon{
		color:#FE5100;
		text-align: center;
		margin-top: 38upx;
	}
	.scan-join{
		width:301upx;
		height:58upx;
		line-height: 58upx;
		background:rgba(254,81,0,1);
		border-radius:14upx;
		color:#fff;
		display: flex;
		justify-content: flex-start;
		margin:5upx auto;
		position: relative;
		.scan-join-word{
			font-size:33upx;
			margin-left: 60upx;
		}
		.scan-join-word2{
			font-size:31upx;
			margin-left: 25upx;
		}
		.vant-icon{
			position: absolute;
			top:0upx;
			right:0upx;
			margin-top:0;
			color:#fff;
			display: block;
			animation: heart-break 1s;
			-moz-animation: heart-break 1s;	/* Firefox */
			-webkit-animation: heart-break 1s;	/* Safari 和 Chrome */
			-o-animation: heart-break 1s;
			animation-iteration-count:infinite;
			-webkit-animation-iteration-count:infinite;
		}
		.large{
			margin-left: 5upx;
		}
	}
	.active-join-lists{
		width:680upx;
		margin:20upx auto;
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
		.active-join-list{
			margin-right:20upx;
			margin-left: 5upx;
			width:147upx;
			height:38upx;
			line-height: 38upx;
			font-size:27upx;
			color:rgba(51,51,51,1);
		}
		.showMore{
			font-size:25upx;
			color:rgba(254,81,0,1);
			display: flex;
			justify-content: flex-start;
			margin-top: 5upx;
			.vant-icon{
				margin-top:-5upx;
			}
			.top{
				font-size:20upx;
				margin-top:7upx;
				margin-left:10upx;
			}
		}
	}
}
.active-rule{
	margin-top: 20upx;
	.active-rule-top{
		width:750upx;
		height: 96upx;
		line-height: 96upx;
		border-bottom: 1px solid #f3f3f3;
		border-top: 1px solid #f3f3f3;
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
	.active-rule-content{
		width:667upx;
		padding:24upx 36upx;
		font-size:29upx;
	}
}
.active-gift{
	.active-rule-top{
		width:750upx;
		height: 96upx;
		line-height: 96upx;
		border-bottom: 1px solid #f3f3f3;
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
	.active-gift-img{
		margin-top:24upx;
		margin-left:25upx;
		.active-gift-image{
			width:699upx;
			height:161upx;
		}
	}
	.vip-lists {
		margin-top:40upx;
		margin-left:50upx;
		display: flex;
		justify-content: space-between;
		width:650upx;
		padding-bottom:10upx;

		.vip-list {
		  display: flex;
		  justify-content: start;

		  .vip-list-left {
			width: 36upx;
			height: 36upx;
			line-height: 36upx;
			border-radius: 36upx;
			background: -webkit-linear-gradient(#FE8C00, #FE5100);
			background: -o-linear-gradient(#FE8C00, #FE5100); /* Opera 11.1 - 12.0 */
			background: -moz-linear-gradient(#FE8C00, #FE5100); /* Firefox 3.6 - 15 */
			background: linear-gradient(#FE8C00, #FE5100); /* 标准的语法 */
			vertical-align: middle !important;

			.vant-icon {
			  color: #fff;
			  font-size: 25upx;
			  margin-left: 6upx;
			}
		  }

		  .vip-list-right {
			font-size: 24upx;
			line-height: 36upx;
			height: 36upx;
			margin-left: 7upx;
		  }
		}
	}
	.gift-img{
		margin-top:24upx;
		.gift-image{
			width:750upx;
			height:1835.1449upx;
		}
	}
}
@keyframes heart-break
	{
	0%   {
		font-size:30upx;
		}
	50% {
		font-size:45upx;
		}
	100% {
		font-size:30upx;
		}
	}
	
	@-moz-keyframes heart-break
	{
	0%   {
		font-size:30upx;
		}
	50% {
		font-size:45upx;
		}
	100% {
		font-size:30upx;
		}
	}
	
	@-webkit-keyframes heart-break
	{
	0%   {
		font-size:30upx;
		}
	50% {
		font-size:45upx;
		}
	100% {
		font-size:30upx;
		}
	}
	
	@-o-keyframes heart-break
	{
	0%   {
		font-size:30upx;
		}
	50% {
		font-size:45upx;
		}
	100% {
		font-size:30upx;
		}
	}
	
	@font-face {
		font-family: 'font_family';  /* project id 1065286 */
		src: url('//at.alicdn.com/t/font_1065286_3bsye5aijur.eot');
		src: url('//at.alicdn.com/t/font_1065286_3bsye5aijur.eot?#iefix') format('embedded-opentype'),
		url('//at.alicdn.com/t/font_1065286_3bsye5aijur.woff2') format('woff2'),
		url('//at.alicdn.com/t/font_1065286_3bsye5aijur.woff') format('woff'),
		url('//at.alicdn.com/t/font_1065286_3bsye5aijur.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_1065286_3bsye5aijur.svg#font_family') format('svg');
	  }
	  .font_family{
		font-family:"font_family" !important;
		font-size:16px;font-style:normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
	  }
	  /* 按钮去掉边框 */
	  button::after {
		border: none;
	  }
	  button{
		margin-left: 0;
		margin-right: 0;
		padding-left: 0;
		padding-right: 0;
		line-height: 1;
		color: #1c1c1c;
		font-size: 28rpx;
		background: none;
	  }
	  .button-hover {
		color:#1c1c1c;
		background:none;
	  }
	  /*每个页面公共css */
	.content {
		text-align: center;
		height: 100%;
	}
	.share-btn{
		padding: 30upx 60upx;background-color:#FE5100;color:#fff;
	}
	.share-pro{
	    display: flex;
	    align-items: center;
	    justify-content: flex-end;
	    flex-direction: column;
	    // z-index: 5;
	    line-height: 1;
	    box-sizing: border-box;
	    .share-pro-mask{
	        width: 100%;
	        height: 100%;
	        position: fixed;
	        top: 0;
	        right: 0;
	        bottom: 0;
	        left: 0;
	        background: rgba(0, 0, 0, 0.5);
			z-index:999999999;
	    }
	    .share-pro-dialog {
	        width: 750rpx;
	        height: 310rpx;
	        overflow: hidden;
	        background-color: #fff;
	        border-radius: 24rpx 24rpx 0px 0px;
	        position: relative;
	        box-sizing: border-box;
	        position: fixed;
	        bottom: 0;
	        .close-btn {
	            padding: 20rpx 15rpx;
	            position: absolute;
	            top: 0rpx;
	            right: 29rpx;
	        }
	        .share-pro-title {
	            font-size: 28rpx;
	            color: #1c1c1c;
	            padding: 28rpx 41rpx;
	            background-color: #f7f7f7;
	        }
	
	        .share-pro-body{
	            display: flex;
	            flex-direction: row;
	            justify-content:space-around;
	            font-size: 28rpx;
	            color: #1c1c1c;
	            .share-item{
	                display: flex;
	                flex-direction:column;
	                justify-content: center;
	                justify-content:space-around;
	                .share-icon{
	                    text-align:center;
	                    font-size: 70rpx;
	                    margin-top: 39rpx;
	                    margin-bottom: 16rpx;
	                    color: #42ae3c;
	                }
	                &:nth-child(2){
	                    .share-icon{
	                        color: #ff5f33;
	                    }
	                }
	            }
	        }
	    }
	
	    /* 显示或关闭内容时动画 */
	
	    .open {
	        transition: all 0.3s ease-out;
			transform: translateY(0);
	    }
	
	    .close {
	        transition: all 0.3s ease-out;
			transform: translateY(310rpx);
	    }
	
	}
	 .canvas{
	    position: fixed !important;
	    top: 110upx !important;
	    left: 50% !important;
	    display: block !important;
	    width: 554upx !important;
	    height: 800upx !important;
		margin-left:-277upx;
	    z-index: 10;
	}
</style>
