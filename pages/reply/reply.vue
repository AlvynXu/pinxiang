<template>
	<view class="reply-box">
		<view class="reply-top">
			<view class="reply-title">门店名称
				<view class="reply-fabu" @click="submit">发布</view>
			</view>
			<view class="reply-rate">
				<view class="reply-rate-name">
					评分
					<uni-rate class="star" :value="rate" size="18"></uni-rate>
				</view>
				<view class="reply-word">超赞</view>
			</view>
		</view>
		<view class="reply-content">
			<view class="uni-textarea">
				<textarea @blur="bindTextAreaBlur" auto-height />
				<view class="uni-textarea">
					<textarea placeholder-style="color:#D8D8D8"  @blur="bindTextAreaBlur" placeholder="亲爱的品象会员车主，门店的服务您还满意吗？您的评价对我们非常重要，将会帮助我们更好的监督门店，同时会帮助到更多会员朋友哦～"/>
				</view>
			</view>
		</view>
		<view class="create-top">
			<view class="create-top-img">
				<view class="show-img" v-if="showImg" v-for="(val,key) in imgList" :key="key">
					<image mode="aspectFill" :src="val"></image>
					<view class="delete-img" @click="deleteImage(key)">X</view>
				</view>
				<view class="create-top-img-left" @click="chooseImage" v-if="chooseImg">
					<view class="vant-icon">&#xe6a4;</view>
					<view class="create-top-img-left-word">上传图片</view>
				</view>
				<view class="create-top-img-right" v-show="showWord">
					<view class="create-top-img-right-word">
						带图评价更加生动哦
					</view>
				</view>
			</view>
		</view>
		<view class="servince-box">
			<view class="servince-title">服务项目</view>
			<view class="servince-list">
				<view class="servince-left" :class="{clean:isclean}" @click="clean">洗车</view>
				<view class="servince-right" :class="{clean:iscare}" @click="care">保养</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	export default {
		components: {uniRate},
		data() {
			return {
				rate:5,
				chooseImg:true,
				showImg:false,
				showWord:true,
				imgList:[],
				isclean:false,
				iscare:false,
				type:0,
				value:""
			};
		},
		methods: {
			bindTextAreaBlur: function (e) {
				this.value = e.detail.value
				console.log(this.value)
			},
			//删除图片
			deleteImage(key){
				this.imgList.splice(key,1);
				if(this.imgList.length<3){
					this.chooseImg = true
				};
			},
			//选择图片上传
			chooseImage(){
				let that = this
				uni.chooseImage({
				    count: 3,
				    sourceType: ['album'],
				    success: function (res) {
				        // console.log(JSON.stringify(res.tempFilePaths));
						let imgList = JSON.stringify(res.tempFilePaths)
						that.imgList = that.imgList.concat(res.tempFilePaths)
						console.log(that.imgList);
						if(that.imgList.length>2){
							that.chooseImg = false
						};
						that.showImg = true
						that.showWord = false
				        uni.getImageInfo({
				            src: res.tempFilePaths[0],
				            success: function (image) {
							},
				        });
				    }
				});
			},
			clean(){
				this.isclean = true;
				this.iscare = false;
				this.type = 0
			},
			care(){
				this.isclean = false;
				this.iscare = true;
				this.type = 1
			},
			submit(){
				console.log(this.value)
				console.log(this.imgList)
				console.log(this.type)
				console.log(this.rate)
			}
		}
	}
</script>

<style lang="scss" scoped>
.reply-box{
	width:750upx;
	background: #f3f3f3;
	.reply-top{
		width:750upx;
		background: #fff;
		.reply-title{
			height:82upx;
			width:667upx;
			line-height:82upx;
			margin:0 auto;
			font-size:29upx;
			display: flex;
			justify-content:space-between;
			.reply-fabu{
				width:101upx;
				height:45upx;
				line-height: 45upx;
				background:#FE5100;
				border-radius:23upx;
				color:#fff;
				font-size:27upx;
				text-align: center;
				margin-top: 18upx;
			}
		}
		.reply-rate{
			height:82upx;
			width:667upx;
			line-height:82upx;
			margin:0 auto;
			font-size:29upx;
			border-bottom:2upx solid #f3f3f3;
			display: flex;
			justify-content:space-between;
			.reply-rate-name{
				display: flex;
				justify-content:flex-start;
				.star{
					margin-top:22upx;
					margin-left: 20upx;
				}
			}
			.reply-word{
				height:45upx;
				line-height: 45upx;
				color:#A4A4A4;
				font-size:27upx;
				margin-top: 18upx;
			}
		}
	}
	.reply-content{
		width:750upx;
		background: #fff;
		.uni-textarea{
			width:667upx;
			margin:0 auto;
			font-size:29upx;
		}
	}
	.create-top{
		width:100%;
		height:289upx;
		background: #fff;
		.create-top-img{
			width:696upx;
			margin:0 auto;
			padding-top:24upx;
			display: flex;
			justify-content:start;
			flex-wrap: wrap;
			.create-top-img-left{
				width:217upx;
				height:217upx;
				background: #f3f3f3;
				border:1px dashed #A4A4A4;
				margin-left:10upx;
				margin-top:10upx;
				.vant-icon{
					text-align: center;
					color:#FE5100;
					font-size:50upx;
					padding-top:49upx;
					margin-right: 0;
				}
				.create-top-img-left-word{
					text-align: center;
					font-size:27upx;
					color:#A4A4A4;
				}
			}
			.show-img{
				width:217upx;
				height:217upx;
				margin-left:10upx;
				margin-top:10upx;
				position: relative;
				.delete-img{
					width:38upx;
					height:38upx;
					line-height:38upx;
					text-align: center;
					border-radius:38upx;
					position: absolute;
					right:0;
					top:-15upx;
					background: #A4A4A4;
					color: #fff;
					font-size:28upx;
				}
				image{
					width:217upx;
					height:217upx;
					border-radius:11upx;
				}
			}
			.create-top-img-right{
				width:450upx;
				height:217upx;
				line-height:217upx;
				.create-top-img-right-word{
					text-align: center;
					font-size:25upx;
					color:#A4A4A4;
				}
			}
		}
	}
	.servince-box{
		width:750upx;
		margin-top:18upx;
		height:199upx;
		background: #fff;
		.servince-title{
			font-size:33upx;
			width:667upx;
			margin:0 auto;
			padding-top: 16upx;
		}
		.servince-list{
			font-size:33upx;
			width:407upx;
			margin:45upx auto 0 auto;
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
			}
			.care{
				background:rgba(254,81,0,0.2);
			}
		}
	}
}
</style>
