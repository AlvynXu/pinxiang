<template>
  <view class="px-popright" v-if="showpopright">
	  <view class="px-popright-content" :style="[{'width':width,'right':marginLeft+'vw'}]" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"
	  :class="{'px-popright-open':pxPopRightStatus=='open', 'px-popright-close':pxPopRightStatus=='close'}">
		  <slot />
	  </view>
	  <view class="px-popright-mask" @click="close()"></view>
  </view>
</template>

<script>
var startPageX = 0;
var startPageY = 0;
var endPageY = 0;
var endPageX = 0;

export default {
  name: 'PxPopright',
  props: {
	width:{
		type: String,
		default:'50%'
	}
  },
  data () {
    return {
		showpopright:false,
		pxPopRightStatus:'close',
		windowWidth:0,
		marginLeft:-100,
		interval:null
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
	  let that = this
	  uni.getSystemInfo({
	  	success(res) {
			if(res.errMsg == 'getSystemInfo:ok'){
				that.windowWidth = res.safeArea.width
			}
	  	}
	  })
  },
  methods: {
	open(){
		this.showpopright = true
		this.pxPopRightStatus = 'open'
		this.$emit('open', 1)
	},
    close(){
		let that = this
		this.pxPopRightStatus = 'close'
		setTimeout(()=>{
			that.showpopright = false
		},200)
		this.$emit('close', 1)
	},
	touchstart(e){
		
	},
	touchmove(e){
		
	},
	touchend(e){
		
	}
  }
}
</script>
<style lang="scss" scoped>
	.px-popright-open{
		animation:open 0.2s; 
		animation-fill-mode: forwards;
	}
	.px-popright-close{
		animation:close 0.2s;
		animation-fill-mode: forwards;
	}
	
	.px-popright{
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
			height: 100%;
			background-color:white;
			bottom:top;
			z-index:1000;
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
		from {right:-100vw;}
		to {right:0;}
	}
	
	@-webkit-keyframes open /*Safari and Chrome*/
	{
		from {right:-100vw;}
		to {right:0;}
	}
	@keyframes close
	{
		from {right:0;}
		to {right:-100vw;}
	}
	
	@-webkit-keyframes close /*Safari and Chrome*/
	{
		from {right:0;}
		to {right:-100vw;}
	}
</style>
