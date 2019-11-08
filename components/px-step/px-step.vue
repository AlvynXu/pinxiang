<template>
	<view class="px-step">
		<view class="px-step-progress">
			<view class="px-step-progress-section" v-for="(value,key) in size-1" :class="{'active' : value<step-1}"></view>
		</view>
		<view class="px-step-circle">
			<view class="px-step-circle-section" v-for="(value,key) in size">
				<view class="px-step-circle-section-dot" :class="{'active' : value<=step-1}">
					<view class="px-step-circle-section-label">
						<label>{{textArr[key]}}</label>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name: 'PxStep',
		props: {
			size:{
				type: Number,
				default:5
			},
			step:{
				type:Number,
				default:1
			},
			textArr:{
				default:Array,
				default:['步骤1','步骤2','步骤3','步骤4','步骤5','步骤6']
			}
		},
		data() {
			return {
			}
		},
		onLoad() {
			
		}
	}
</script>

<style scoped lang="scss">
	.px-step{
		width: 90%;
		height:32upx;
		display: inline-flex;
		margin:0 5%;
		position: relative;
		&-progress{
			width: 98%;
			height:2px;
			background-color:#A4A4A4;
			position:absolute;
			left:2upx;
			top:50%;
			margin-top:-2upx;
			display:inline-flex;
			&-section{
				width: 100%;
				height:2px;
			}
			.active{
				background-color:#FE5100;
			}
		}
		&-circle{
			width: 100%;
			height:24upx;
			position:absolute;
			top:0;left:0;
			display:inline-flex;
			justify-content: space-between;
			&-section{
				width: 24upx;
				height:24upx;
				display:flex;
				justify-content: flex-start;
				&-dot{
					margin-top:1upx;
					width: 16upx;
					height:16upx;
					background:white;
					border-radius: 16upx;
					border:4upx solid #A4A4A4;
					.px-step-circle-section-label{
						width: 100%;
						height: 100%;
						margin-top:19upx;
						position: relative;
						label{
							width: 100upx;
							height: 100%;
							position: absolute;
							display:block;
							height:31upx;
							font-size:22upx;
							font-weight:400;
							color:rgba(95,95,95,1);
							line-height:31upx;
							left:50%;
							margin-left:-50upx;
						}
					}
				}
				.active{
					border:4upx solid #FE5100;
				}
			}
		}
	}
</style>
