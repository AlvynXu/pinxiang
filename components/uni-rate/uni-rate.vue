<template>
	<view class="uni-rate">
		<view class="uni-rate-icon" v-for="(star,index) in stars" :key="index" @click="onClick(index)">
			<view class="uni-rate-icon-list-box" v-if="star.actived==0">
				<uni-icon :size="size" color="#fff" :type="isFill === false || isFill === 'false' ? 'star' : 'star-filled'"></uni-icon>
			</view>
			<view class="uni-rate-icon-list-box half" v-if="star.actived==0.5">
				<uni-icon :size="size" color="#fff" :type="isFill === false || isFill === 'false' ? 'star' : 'star-filled'"></uni-icon>
				<view class="uni-rate-icon-list-background-half" :style="{background: star.type=='red' ? '#fe5100 !important' : '#fe8c00 !important'}"></view>
				<uni-icon :size="size" class="uni-rate-icon-list-icon" color="#fff" :type="isFill === false || isFill === 'false' ? 'star' : 'star-filled'"></uni-icon>
			</view>
			<view class="uni-rate-icon-list-box" :style="{background: star.type=='red' ? '#fe5100 !important' : '#fe8c00 !important'}" v-if="star.actived==1">
				<uni-icon :size="size" color="#fff" :type="isFill === false || isFill === 'false' ? 'star' : 'star-filled'"></uni-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		name: "uni-rate",
		components: {
			uniIcon
		},
		props: {
			isFill: { //星星的类型，是否镂空
				type: [Boolean, String],
				default: true
			},
			color: { //星星的颜色
				type: String,
				default: '#ececec'
			},
			activeColor: { //星星选中状态颜色
				type: String,
				default: '#ffca3e'
			},
			size: { //星星的大小
				type: [Number, String],
				default: 24
			},
			value: { //当前评分
				type: [Number, String],
				default: 0
			},
			max: { //最大评分
				type: [Number, String],
				default: 5
			},
			disabled: { //是否可点击
				type: [Boolean, String],
				default: false
			}
		},
		data() {
			console.log('data')
			return {
				maxSync: this.max,
				valueSync: this.value,
				starList:[]
			}
		},
		watch:{
			value(val){
				this.valueSync = val
			}
		},
		computed: {
			stars() {
				const max = Number(this.maxSync) ? Number(this.maxSync) : 5
				const value = Number(this.valueSync) ? Number(this.valueSync) : 0
				const red = value > max - 1 ? true : false
				const starList = []
				const floorValue = Math.floor(value)
				const ceilValue = Math.ceil(value)
				for (let i = 0; i < max; i++) {
					
					if (floorValue > i) {
						starList.push({
							activeWitch: '100%',
							actived: 1,
							type: red ? 'red' : 'yellow'
						})
					} else if (ceilValue - 1 === i) {
						starList.push({
							actived: 0.5,
							activeWitch: (value - floorValue) * 100 + '%',
							type: red ? 'red' : 'yellow'
						})
					} else {
						starList.push({
							actived: 0,
							activeWitch: '0',
							type: red ? 'red' : 'yellow'
						})
					}
				}
				return starList
			}
		},
		methods: {
			onClick(index) {
				if (this.disabled === true || this.disabled === 'true') {
					return
				}
				this.valueSync = index + 1
				this.$emit('change', {
					value: this.valueSync
				})
			}
		}
	}
</script>

<style lang="scss">
	.uni-rate {
		line-height: 0;
		font-size: 0;
		display: flex;
		flex-direction: row;
		.uni-rate-icon-list-box{
			margin-right:7upx;
			border-radius:4upx;
			position:relative;
			background:#d8d8d8;
		}

		&-icon {
			position: relative;
			line-height: 0;
			font-size: 0;
			display: inline-block;

			&-on {
				position: absolute;
				top: 0;
				left: 0;
				overflow: hidden;
			}
		}
	}
	.actived{
		background: #fe8c00 !important;
	}
	.half{
		.uni-rate-icon-list-background-half{
			width: 50%;
			height: 100%;
			position: absolute;
			background: #fe8c00 !important;
			top:0;
			left:0;
			z-index:1;
			border-top-left-radius:4upx;
			border-bottom-left-radius: 4upx;
		}
		.uni-rate-icon-list-icon{
			width: 100%;
			height: 100%;
			position: absolute;
			top:0;
			left:0;
			z-index:2;
		}
	}
	.all{
		background: #fe5100 !important;
	}
</style>
