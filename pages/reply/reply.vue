<template>
	<view class="reply-box">
		<view class="reply-top">
			<view class="reply-title">门店名称
				<view class="reply-fabu">发布</view>
			</view>
			<view class="reply-rate">
				<view class="reply-rate-name">
					评分
					<uni-rate class="star" value="5" size="18"></uni-rate>
				</view>
				<view class="reply-word">超赞</view>
			</view>
		</view>
		<view class="reply-content">
			<view class="uni-textarea">
				<textarea @blur="bindTextAreaBlur" auto-height />
				<view class="uni-textarea">
					<textarea placeholder-style="color:#D8D8D8" placeholder="亲爱的品象会员车主，门店的服务您还满意吗？您的评价对我们非常重要，将会帮助我们更好的监督门店，同时会帮助到更多会员朋友哦～"/>
				</view>
			</view>
		</view>
		<view class="create-top">
			<view class="create-top-name">
				门头照片
				<view class="create-top-name-tip">*</view>
			</view>
			<view class="create-top-img">
				<view class="show-img" v-if="showImg" v-for="(val,key) in imgList" :key="key">
					<image mode="aspectFill" :src="val"></image>
					<view class="delete-img" @click="deleteImage(key)">X</view>
				</view>
				<view class="create-top-img-left" @click="chooseImage" v-if="chooseImg">
					<view class="vant-icon">&#xe6a4;</view>
					<view class="create-top-img-left-word">上传门头图</view>
				</view>
				<view class="create-top-img-right" v-show="showWord">
					<view class="create-top-img-right-word">
						带图评价更加生动哦
					</view>
				</view>
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
				chooseImg:true,
				showImg:false,
				showWord:true,
				imgList:[],
			};
		},
		methods: {
			bindTextAreaBlur: function (e) {
				console.log(e.detail.value)
			},
			//删除图片
			deleteImage(key){
				this.imgList.splice(key,1);
			},
			//选择图片上传
			chooseImage(){
				let that = this
				uni.chooseImage({
				    count: 9,
				    sourceType: ['album'],
				    success: function (res) {
				        // console.log(JSON.stringify(res.tempFilePaths));
						let imgList = JSON.stringify(res.tempFilePaths)
						that.imgList = that.imgList.concat(res.tempFilePaths)
						console.log(that.imgList);
						if(that.imgList.length>8){
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
		height:259upx;
		background: #fff;
		.create-top-name{
			width:696upx;
			margin:0 auto;
			padding-top:24upx;
			font-size:27upx;
			display: flex;
			justify-content:start;
			.create-top-name-tip{
				color:#FE5100;
			}
		}
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
					color:#FE5100;
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
				height:145upx;
				line-height:145upx;
				.create-top-img-right-word{
					text-align: center;
					font-size:25upx;
					color:#A4A4A4;
				}
			}
		}
	}
	
}
</style>
