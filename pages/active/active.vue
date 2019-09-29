<template>
	<view class="active-box">
		<view class="uni-padding-wrap">
			<view class="page-section">
				<view class="page-section-spacing">
					<swiper class="swiper" circular :indicator-dots="indicatorDots" indicator-color="rgba(0,0,0,0.5)" indicator-active-color="#fff" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item>
							<image class="swiper-img" mode="aspectFit" src="https://cdn.doudouxiongglobal.com/store/active/banner1.png"></image>
						</swiper-item>
						<swiper-item>
							<image class="swiper-img" mode="aspectFit" src="https://cdn.doudouxiongglobal.com/store/active/banner2.png"></image>
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
				已有<view>{{activeList.NumberOfParticipants}}</view>人参与
			</view>
		</view>	
		<view class="active-code">
			<image class="code-img" src="https://cdn.doudouxiongglobal.com/store/active/bg-code2.png" mode="aspectFill"></image>
			<view class="active-code-word" v-if="winList.isWinner===undefined">等待开奖</view>
			<view class="active-code-word" v-if="winList.isWinner===0">未中奖</view>
			<view class="active-code-word2">抽奖码</view>
			<view class="active-code-word3" v-if="code!=''">{{code}}</view>
			<view class="active-code-word4" v-if="code===''">*********</view>
		</view>
		<view class="active-scan">
			<image class="code-img" :src="activeList.QrCode" mode="aspectFill"></image>
			<view class="scan-word1">截图微信识别二维码</view>
			<view class="scan-word2">获取最新开奖信息</view>
			<view class="vant-icon">&#xe6b7;</view>
			<view class="scan-word1">抽奖码列表</view>
			<view class="scan-join">
				<view class="scan-join-word" v-if="isLogin===0" @tap="getCodeFunc">参与抽奖</view>
				<button class="scan-join-word" v-if="isLogin===1 && phone===''" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">参与抽奖</button>
				<view class="scan-join-word2" v-if="isLogin===1 && codeList.length==0 && phone!==''" @tap="getCodeFunc">参与抽奖</view>
				<view class="scan-join-word2" v-if="isLogin===1 && codeList.length>0" @tap="createCanvasImageEvn">获得更多抽奖码</view>
				<view class="vant-icon finger samll" v-if="isLogin===0">&#xe6b8;</view>
				<view class="vant-icon finger large" v-if="isLogin===1">&#xe6b8;</view>
			</view>
			<view class="active-join-lists">
				<view class="active-join-list" v-for="(val,key) in activeList.CodeList" :key="key" v-show="key<num">
					·{{val}}
				</view>
				<view class="showMore" v-if="moreShow" @click="showMore">
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
				<view>1.活动时间:2019年9月27日—2019年10月7日；</view>
				<view>2.参与方式:点击「参与活动」授权手机号码，获取抽奖码；</view>
				<view>3.活动规则：活动期间用户首次登录并授权手机号码后可获得1个抽奖码，同时用户将活动分享给好友且好友成功参与后可继续获得抽奖码，同时若好友通过分享购买会员，将会优惠25元同时用户获得25元现金红包；</view>
				<view>4.开奖说明：平台将在抽奖时间（10月7日 10:00）从所有抽奖码中随机抽取70个抽奖码为中奖号码，并于该获得页面公示中奖信息，中奖用户可获得品象养车提供的全年无限制免费保养全合成机油版会员卡一张。</view>
				<view>
					注意事项：
					</br> 
					1.若平台发现用户存在批量注册、恶意刷奖等行为平台有权取消其中奖资格且不予兑换；
					</br> 
					2.因需要对中奖用户发送相关通知与确认用户的真实性，故要求用户授权手机号码。
				</view>
			</view>
		</view>
		<view class="gray"></view>
		<view class="active-gift">
			<view class="active-rule-top">
				<view class="rule-line left"></view>
				<view class="rule-word">国庆献礼</view>
				<view class="rule-line right"></view>
			</view>
			<view class="active-gift-img"  @click="goBuyVip">
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
		
			<!-- <view class="scan-join-word" v-if="isLogin===0">参与抽奖</view>
			<button class="scan-join-word" v-if="isLogin===1 && phone===''" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">参与抽奖</button>
			<view class="scan-join-word2" v-if="isLogin===1 && activeList.CodeList.length==0 && phone!==''" @tap="getCodeFunc">参与抽奖</view>
			<view class="scan-join-word2" v-if="isLogin===1 && activeList.CodeList.length>0" @tap="createCanvasImageEvn">获得更多抽奖码</view> -->
		<view class="code-box" v-if="isLogin===1 && codeList.length>0" @tap="createCanvasImageEvn">
			获得更多抽奖码
		</view>
		<view class="code-box" v-if="isLogin===1 && codeList.length==0 && phone!==''" @tap="getCodeFunc">
			参与抽奖
		</view>
		<button class="code-box" v-if="isLogin===1 && phone===''" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
			参与抽奖
		</button>
		<view class="code-box" v-if="isLogin===0" @tap="getCodeFunc">
			参与抽奖
		</view>
		<view class="content">
			<!-- <button class="share-btn" @tap="createCanvasImageEvn">分享</button> -->
			<view v-if="deliveryFlag" style="position: fixed;top:0;left:0;width: 100vw;height: 100vh;">
				<view style="position: fixed;background: rgba(0,0,0,0.4);top:0;left:0;width: 100vw;height: 100vh;" @click="canvasCancel"></view>
				<hchPoster ref="hchPoster" :canvasFlag.sync="canvasFlag" @cancel="canvasCancel" :posterObj.sync="posterData"/>
				
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
		
		<view class="uni-popup"  style="" v-show="popupShow">
			<view class="popup-detail">
				<view class="uni-img2" v-if="vip===1">
					<image src="https://cdn.doudouxiongglobal.com/pinxiang/image/shop/cry_bg.png" mode="aspectFit" class="img"></image>
				</view>
				<view class="uni-img" v-if="vip===0">
					<image src="https://cdn.doudouxiongglobal.com/pinxiang/image/shop/cry_bg.png" mode="aspectFit" class="img"></image>
				</view>
				<view class="uni-word">很抱歉，您未中奖</view>
				<view class="uni-word2" v-if="vip===0">感谢您的参与</br> 我们将赠送您50元购卡红包</view>
				<view class="uni-button" v-if="vip===0"  @click="goBuyVip">立即开卡，全年免费保养</view>
				<view class="uni-list" @click="goList">查看中奖名单</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import hchPoster from '../../components/hch-poster/hch-poster.vue'
	import {getWinninCode,getActive,decryptPhone,changePhone,getWinList} from '../../api/index.js'
	export default {
		components: {hchPoster,uniPopup},
	    data() {
	        return {
				popupShow:false,
				vip:0,
				deliveryFlag: false,
				canvasFlag: true,
				posterData:{},
				moreShow:true,
				lookShow:false,
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
				avatar:"",
				phone:'',
				codeList:[],
				code:'',
				winList:[]
	        }
	    },
	    methods: {
			goList(){
				uni.navigateTo({
				    url: `../winList/winList`
				});
			},
			createCanvasImageEvn(){
				// 这个是固定写死的小程序码
				let that = this
				that.deliveryFlag = true;
				console.log(that.bgCode)
				
				Object.assign(this.posterData,
				{
					url:that.bgImg,//商品主图
					icon:that.avatar,//醉品价图标
					code:that.activeList.QrCode,//小程序码
				})
				that.$forceUpdate();//强制渲染数据
				setTimeout(()=>{
					that.canvasFlag=false;//显示canvas海报
					that.$refs.hchPoster.createCanvasImage();//调用子组件的方法
				},500)
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
				x: 0,
				y: 0,
				canvasId: 'myCanvas',
				success(res) {
					// 2-保存图片至相册
					uni.saveImageToPhotosAlbum({
					filePath: res.tempFilePath,
					success(res2) {
						wx.hideLoading();
						uni.showToast({title: '图片保存成功，可以去分享啦~', duration: 2000})
						_this.deliveryFlag = false;
						_this.canvasFlag = true;
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
				this.isShow = !this.isShow;
				this.num = this.isShow? 7: this.codeList.length;
				this.txt = this.isShow?  '查看更多':'收起'
			},

			async getPhoneNumber(e){
				let that = this
				let userData = uni.getStorageSync('user_data')
				if(userData === null || userData.length === 0){
					wx.showModal({
						title:"提示",
						content:"未登录，请前往登录",
						success: function (res) {
						            if (res.cancel) {
						               //点击取消,默认隐藏弹框
						            } else {
						              uni.navigateTo({
						              	url:"/pages/login/login"
						              })
						            }
						         },
					})
					return false;
				}
				if(e.detail.errMsg === 'getPhoneNumber:ok'){
					let wxOpenID = uni.getStorageSync('wxOpenID')
					decryptPhone({'OpenID':wxOpenID,'Encrypt':e.detail.encryptedData,'IV':e.detail.iv}).then(res => {
						if(res.Code === 200){
							that.phone = res.Data.Phone
							changePhone({Phone:res.Data.Phone}).then(response =>{
								if(response.Code === 200){
									let userData = uni.getStorageSync('user_data')
									userData = JSON.parse(userData)
									userData['Phone'] = res.Data.Phone
									uni.setStorageSync('user_data',JSON.stringify(userData))
									that.getCodeFunc()
									// getWinninCode({}).then(res=>{
									// 	console.log(res)
									// })
								}
							})
						}
					})
				}
			},
			async getCodeFunc(){
				let code = uni.getStorageSync('ReferrerCode')
				let data = code === 0 ? {} : {code:code}
				let that = this
				let codeData = await getWinninCode(data)
				if(codeData.Code === 200){
					// console.log(codeData.Data)
					wx.showToast({
						title:"成功获取抽奖码",
						icon:"none"
					})
					this.code = codeData.Data
					let activeData = await getActive()
					if(activeData.Code === 200){
						console.log(activeData.Data)
						if(JSON.stringify(activeData.Data)!=='[]'){
							that.activeList = activeData.Data
							console.log(that.activeList)
							that.isLogin= that.activeList.IsLogin
							if(that.isLogin ===0){
								wx.showModal({
									title:'提醒',
									content:'您未登陆，请完成登陆',
									confirmText:'前往',
									success (res) {
									    if (res.confirm) {
											uni.navigateTo({
												url:"/pages/login/login"
											})
									      // window.location.href = '/login'
									    } else if (res.cancel) {
									      console.log('用户点击取消')
									    }
									}
								})
							}
							that.codeList = that.activeList.CodeList
							if(that.codeList.length ===0){
								that.moreShow = false
							}else{
								that.code = that.codeList[0]
								that.moreShow = true
							}
						}
					}
				}
			},
			login(userData){
				console.log(userData)
				let that = this
				that.$refs.popup.open();
				let openID = uni.getStorageSync('wxOpenID')
				login({
					'Type':'WECHAT',
					'OpenID': openID,
					'Nickname': userData.userInfo.nickName,
					'Avatar':userData.userInfo.avatarUrl,
					'Sex': userData.userInfo.gender === 1 ? 0 : 1,
					'Province': userData.userInfo.province,
					'City':userData.userInfo.city,
					'ReferrerCode':uni.getStorageSync('ReferrerCode')
				}).then((res)=>{
					if(res.Code === 200)
					{
						uni.setStorageSync('api_token',res.Data.access_token)
						uni.setStorageSync('user_data',JSON.stringify(res.Data.user))
						that.avatar = res.Data.user.Avatar,
						that.nickname = res.Data.user.Nickname,
						that.phone = res.Data.user.Phone
						that.isLogin = 1
						// let userData = uni.getStorageSync('user_data')
						// console.log(userData)
						if(res.Data.user.Vip === 1){
							that.vip = 1
							getVip({}).then((res)=>{
								console.log(res)
								if(res.Code === 200){
									that.vipData = res.Data
								}
							})
						}
						
						if(that.redirect!=''){
							console.log(that.redirect)
							getApp().globalData.redirect=''
							wx.navigateTo({
								url:that.redirect
							})
						}
						
					}
				})
				console.log(openID)
			},
			goBuyVip(){
				uni.navigateTo({
					url:"/pages/user/active?type=active20191001"
				})
			}
	    },
		async onShow() {
			let userData = uni.getStorageSync('user_data')
			if(userData === null || userData.length === 0){
				return false;
			}
			userData = JSON.parse(userData)
			this.vip = userData.Vip
			this.phone = userData.Phone
			if(userData['Phone'] !== ''){
				this.avatar = userData['Avatar']
			}
			
			if(userData.length > 0){
				this.login({userInfo:{
					nickName: userData.Nickname,
					gender:userData.Sex,
					province:userData.Province,
					city:userData.City
				}})
			}
			
			let that = this
			
			let activeData = await getActive()
			if(activeData.Code === 200){
				if(JSON.stringify(activeData.Data)!=='[]'){
					that.activeList = activeData.Data
					that.isLogin= that.activeList.IsLogin
					if(that.isLogin ===0){
						wx.showModal({
							title:'提醒',
							content:'您未登陆，请完成登陆',
							confirmText:'前往',
							success (res) {
							    if (res.confirm) {
									uni.navigateTo({
										url:"/pages/login/login"
									})
							      // window.location.href = '/login'
							    } else if (res.cancel) {
							      console.log('用户点击取消')
							    }
							}
						})
					}
					that.codeList = that.activeList.CodeList
					if(that.codeList.length ===0){
						that.moreShow = false
					}else if(that.codeList.length >7){
						that.lookShow = true
					}else{
						that.code = that.codeList[0]
						if(that.codeList.length>7){
							that.moreShow = true
						}else{
							that.moreShow = false
						}
					}
				}
			}
			
			if(that.isLogin === 1){
				let winListData = await getWinList()
				if(winListData.Code === 200){
					console.log(winListData.Data)
					that.winList = winListData.Data
					if(winListData.Data.isWinner === 0){
						that.popupShow = true
					}
				}
			}
			
		},
		async onLoad(options) {
			// console.log(options.code)
			if(options.code!=undefined){
				uni.setStorageSync('ReferrerCode',options.code)
			}else{
				let referrerCode = uni.getStorageSync('ReferrerCode')
				if(referrerCode===null || referrerCode.length===0){
					uni.setStorageSync('ReferrerCode',0)
				}
			}
			let that = this
			
			let activeData = await getActive()
			if(activeData.Code === 200){
				// console.log(activeData.Data)
				if(JSON.stringify(activeData.Data)!=='[]'){
					that.activeList = activeData.Data
					// console.log(that.activeList)
					that.isLogin= that.activeList.IsLogin
					// console.log(that.isLogin)
					// if(that.isLogin ===0){
					// 	wx.showModal({
					// 		title:'提醒',
					// 		content:'您未登陆，请完成登陆',
					// 		confirmText:'前往',
					// 		success (res) {
					// 		    if (res.confirm) {
					// 				uni.navigateTo({
					// 					url:"/pages/login/login"
					// 				})
					// 		      // window.location.href = '/login'
					// 		    } else if (res.cancel) {
					// 		      console.log('用户点击取消3')
					// 		    }
					// 		}
					// 	})
					// }
					that.codeList = that.activeList.CodeList
					console.log(that.codeList.length)
					if(that.codeList.length ===0){
						that.moreShow = false
					}else if(that.codeList.length >7){
						that.lookShow = true
					}else{
						if(that.codeList.length>7){
							that.moreShow = true
						}else{
							that.moreShow = false
						}
						that.code = that.codeList[0]
					}
				}
			}
			if(that.isLogin === 1){
				let winListData = await getWinList()
				if(winListData.Code === 200){
					console.log(winListData.Data)
					if(winListData.Data.isWinner === 0){
						that.popupShow = true
					}
				}
			}
			
			
			let userData = uni.getStorageSync('user_data')
			
			if(userData === null || userData.length === 0){
				return false;
			}
			userData = JSON.parse(userData)
			that.phone = userData['Phone']
			if(userData.length > 0){
				this.login({userInfo:{
					nickName: userData.Nickname,
					gender:userData.Sex,
					province:userData.Province,
					city:userData.City
				}})
			}
			
		}
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
		.uni-img2{
			width:341upx;
			height:341upx;
			margin-left:178upx;
			padding-top:151upx;
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
.swiper{
	width:750upx;
	height:350upx;
}
.swiper-img{
	width:750upx;
	height:350upx;
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
	// height:670upx;
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
		/deep/ button{
			font-size:31upx;
			width: 100%;
			height:58upx;
			margin-left:0 !important;
			color:#fff;
			line-height: 58upx;
		}
		.scan-join-word2{
			width: 100%;
			text-align: center;
			font-size:31upx;
			color:#fff;
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
			margin-left: 3upx;
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
		font-size:25upx;
		view{
			margin-bottom: 10upx;
		}
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
		margin-bottom:95upx;
		.gift-image{
			width:750upx;
			height:1835.1449upx;
		}
	}
}
.code-box{
	width:750upx;
	height:109upx;
	line-height:109upx;
	background:rgba(254,81,0,1);
	color:#fff;
	text-align: center;
	position: fixed;
	bottom:0;
	left:0;
	letter-spacing: 2upx;
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
	        height: 240rpx;
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
	//  .canvas{
	//     position: fixed !important;
	//     top: 110upx !important;
	//     left: 50% !important;
	//     display: block !important;
	//     width: 554upx !important;
	//     height: 800upx !important;
	// 	margin-left:-277upx;
	//     z-index: 10;
	// }
</style>
