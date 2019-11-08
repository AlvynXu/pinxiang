<template>
	<view class="px-message-box" v-if="message" :style="{'background':backgroundColor}">
		<view class="px-message-text-box" @click="go">关注[品象养车]公众号，获取更多的信息</view>
		<view class="px-message-close" @click="close">x</view>
	</view>
</template>

<script>
	import {getMessage} from "@/api/index.js"
	export default {
		props:{
			background:{
				type:String,
				default:'#ffffff'
			},
			type:{
				type:String,
				default:''
			}
		},
	    data(){
	        return{
				backgroundColor:this.background,
				message:'',
				href:''
	        }
	    },
		watch:{
			background(value){
				this.backgroundColor = value
			}
		},
		methods:{
			close(){
				this.message = ''
				uni.setStorage({
					key:'message-box-close-time',
					data:(new Date()).getDate()
				})
			},
			go(){
				if(this.href===''){
					return false
				}
			}
		},
		onShow(){
			let that = this
			if(uni.getStorageSync('message-box-close-time') !== (new Date()).getDate()){
				getMessage({}).then(data=>{
					if(data.Code === 200){
						that.message = data.Data.Message
						that.href = data.Data.Href
					}
				})
			}
			
		},
		onLoad() {
			if(this.type === 'warning') this.backgroundColor = 'rgba(254,140,0,1)'
			if(this.type === 'error') this.backgroundColor = '#FE5100'
		}
	}
</script>

<style scoped lang="scss">
	.px-message-box{
		width: 90%;
		padding: 0 5%;
		position: relative;
		display:inline-flex;
		justify-content: space-between;
		
		.px-message-text-box{
			line-height: 68upx;
			color:#333333;
			font-size: 24upx;
			color:white;
			flex-shrink: 1;
		}
		
		.px-message-close{
			flex-shrink: 0;
			line-height: 68upx;
			color:#333333;
			font-size: 24upx;
			color:white;
		}
	}
</style>
