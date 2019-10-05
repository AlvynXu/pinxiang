<template>
  <view class="wallet-box">
	<wuc-tab class="wuc-tab" :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
	<view class="ddx-information-box" v-if="TabCur===0">
	    <view class="wallet">
	      <view class="wallet-left used">
	        <view class="left-one">
	          <view class="one">￥</view>
	          <view class="two">25</view>
	          <view class="three">会员优惠券</view>
	        </view>
	        <view class="left-two">年卡续费可用</view>
	        <view class="left-three">有效期 2019.08.01-2019.08.04</view>
	      </view>
	      <view class="wallet-right used">
	        立即使用
	      </view>
	    </view>
	</view><view class="ddx-information-box" v-if="TabCur===1">
        <view class="wallet">
          <view class="wallet-left use">
            <view class="left-one">
              <view class="one">￥</view>
              <view class="two">25</view>
              <view class="three">会员优惠券</view>
            </view>
            <view class="left-two">年卡续费可用</view>
            <view class="left-three">有效期 2019.08.01-2019.08.04</view>
          </view>
          <view class="wallet-right use">
            立即使用
          </view>
        </view>
    </view>
	<view class="ddx-information-box" v-if="TabCur===2">
        <view class="wallet">
          <view class="wallet-left over">
            <view class="left-one">
              <view class="one">￥</view>
              <view class="two">25</view>
              <view class="three">会员优惠券</view>
            </view>
            <view class="left-two">年卡续费可用</view>
            <view class="left-three">有效期 2019.08.01-2019.08.04</view>
          </view>
          <view class="wallet-right over">
            立即使用
          </view>
        </view>
    </view>
    
  </view>
</template>

<script>
	
	import WucTab from '@/components/wuc-tab/wuc-tab.vue'
    export default {
		components: {WucTab},
        data(){
            return{
				TabCur: 0,
				tabList: [
					{ 
						name: '已使用',
					 }, 
					{ 
						name: '可使用',
					},
					{ 
						name: '已过期',
					},
				]
            }
        },
		methods:{
			tabChange(index) {
				this.TabCur = index;
				// if(index === 3){
				// 	
				// }
			},
		}
    }
</script>

<style scoped lang="scss">
	/deep/ .wuc-tab{
		width:750upx;
		// margin-left: 23upx;
	}
	/deep/ .wuc-tab-item{
		width:210upx;
		font-size:25upx;
	    height: 80upx;
	    line-height: 80upx;
	    padding: 0 0upx;
	    margin: 0 18upx 0 18upx;
		color:#A4A4A4;
		text-align: center;
	}
	.wuc-tab /deep/ .text-blue{
		color:#FE5100;
	}
	.wuc-tab /deep/ .wuc-tab-item.cur {
		font-size:29upx;
		color:#333333;
	    border-bottom: 4upx solid #FE5100;
	}
.wallet-box{
  background: #f3f3f3;
  height:100vh;
  .used{
    background:rgba(254,81,0,0.2);
    color:#fe5100;
  }
  .use{
    background:rgba(254,81,0,0.1);
    color:#fe5100;
  }
  .over{
    background:rgba(164,164,164,0.2);
    color:#a4a4a4;
  }
  .wallet{
    margin-top: 45upx;
    display: flex;
    justify-content: start;
    .wallet-left{
      width:486upx;
      height:159upx;
      border-radius:7upx 22upx 22upx 7upx;
      margin-left: 29upx;
      .left-one{
        margin-top:20upx;
        display: flex;
        justify-content: start;
        margin-left: 18upx;
        height:60upx;
        line-height: 60upx;
        .one{
          font-size:33upx;
          font-weight: 600;
        }
        .two{
          font-size:62upx;
          font-weight: bolder;
        }
        .three{
          font-size:25upx;
        }
      }
      .left-two{
        font-size: 22upx;
        margin-left: 11upx;
        margin-top: 10upx;
      }
      .left-three{
        font-size: 22upx;
        margin-left: 11upx;
      }
    }
    .wallet-right{
      width:207upx;
      height:159upx;
      font-size: 29upx;
      line-height:159upx;
      border-radius:22upx 7upx 7upx 22upx;
      text-align: center;
      letter-spacing: 2upx;
    }
  }
}
</style>
