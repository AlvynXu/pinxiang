<template>
  <view class="px-popdown" v-if="showPopDown">
	  <view class="px-popdown-content" :style="{'height':height}" 
	  :class="{'px-popdown-open':pxPopDownStatus=='open', 'px-popdown-close':pxPopDownStatus=='close'}">
		  <view class="px-popdown-content-title">请选择预约时间</view>
		  <scroll-view class="px-popdown-content-slot" :scroll-y="true">
			  <slot />
		  </scroll-view>
	  </view>
	  <view class="px-popdown-mask" @click="close()"></view>
	<!-- <slot /> -->
  </view>
</template>

<script>
export default {
  name: 'PxPopdown',
  props: {
	height:{
		type: String,
		default:'50%'
	}
  },
  data () {
    return {
		showPopDown:false,
		pxPopDownStatus:'close'
    }
  },
  watch: {
    show(value){
		if(value){
			this.open()
		}else{
			this.close()
		}
	}
  },
  created () {
	  
  },
  methods: {
	open(){
		this.showPopDown = true
		this.pxPopDownStatus='open'
		this.$emit('open', 1)
	},
    close(){
		let that = this
		this.pxPopDownStatus='close'
		setTimeout(()=>{
			this.showPopDown = false
		},200)
		this.$emit('close', 1)
	}
  }
}
</script>
<style lang="scss" scoped>
	.px-popdown-open{
		animation:open 0.2s; 
		animation-fill-mode: forwards;
	}
	.px-popdown-close{
		animation:close 0.2s;
		animation-fill-mode: forwards;
	}
	.px-popdown{
		position: fixed;
		top:0;left:0;
		z-index:999;
		width: 100%;
		height: 100vh;
		&-mask{
			width: 100%;
			height: 100%;
			position: absolute;
			top:0;left:0;
			z-index:999;
			background-color:rgba(0,0,0,0.4);
		}
		&-content{
			position: fixed;
			width: 100%;
			background-color:white;
			bottom:0;
			left:0;
			z-index:1000;
			-webkit-transform: translateY(45px);
			transform: translateY(100%);
			border-top-left-radius: 22upx;
			border-top-right-radius: 22upx;
			&-title{
				width:100%;
				height:91upx;
				font-size:29upx;
				font-weight:400;
				text-align: center;
				color:rgba(51,51,51,1);
				line-height:91upx;
			}
			&-slot{
				width: 100%;
				height: calc(100% - 91upx);
			}
		}
	}
	
	@keyframes open
	{
		from {transform: translateY(100%);}
		to {transform: translateY(0);}
	}
	
	@-webkit-keyframes open /*Safari and Chrome*/
	{
		from {transform: translateY(100%);}
		to {transform: translateY(0);}
	}
	@keyframes close
	{
		from {transform: translateY(0);}
		to {transform: translateY(100%);}
	}
	
	@-webkit-keyframes close /*Safari and Chrome*/
	{
		from {transform: translateY(0);}
		to {transform: translateY(100%);}
	}
</style>
