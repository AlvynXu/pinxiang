<template>
    <!-- 车牌组件 -->
    <view class="plate-content">
        <view class="plate-popup" v-if="plateShow">
            <!-- 关闭 -->
            <!-- <view class="plate-close" v-show="plateNumber.length===8 || plateNumber.length===7" @click="close">关闭</view> -->
            <view class="plate-close" @click="close">关闭</view>
            <view v-if="!plateNumber">
                <view class="plate-popup-item">
                    <view class="plate-popup-item-list" v-for="(item,itemIndex) in keyVehicle1" :key="itemIndex" @click="plateHead(item)">{{item}}</view>
                </view>
                <view class="plate-popup-item">
                    <view class="plate-popup-item-list" v-for="(item,itemIndex) in keyVehicle2" :key="itemIndex" @click="plateHead(item)">{{item}}</view>
                </view>
                <view class="plate-popup-item">
                    <view class="plate-popup-item-list" v-for="(item,itemIndex) in keyVehicle3" :key="itemIndex" @click="plateHead(item)">{{item}}</view>
                </view>
                <view class="plate-popup-item">
                    <view class="plate-popup-item-list" v-for="(item,itemIndex) in keyVehicle4" :key="itemIndex" @click="plateHead(item)">{{item}}</view>
                    <!-- 删除 -->
                    <view class="plate-popup-item-list del" @click="plateDel">
                        <image :src="src" />
                    </view>
                </view>
            </view>

            <view v-if="plateNumber">
                <view class="plate-popup-item">
                    <!-- 数字选择 -->
                    <view class="plate-popup-item-list" :class="(plateNumber.length<2 || isInputZh)?'':''" v-for="(item,itemIndex) in keyNumber" :key="itemIndex" @click="plateNum(item)">{{item}}</view>

                </view>
                <view class="plate-popup-item">
                    <view class="plate-popup-item-list" :class="!isInputZh?'':''" v-for="(item,itemIndex) in keyEnInput1" :key="itemIndex" @click="plateInput(item)">{{item}}</view>
                </view>
                <view class="plate-popup-item">
                    <view class="plate-popup-item-list" :class="!isInputZh?'':''" v-for="(item,itemIndex) in keyEnInput2" :key="itemIndex" @click="plateInput(item)">{{item}}</view>
                </view>
                <view class="plate-popup-item">
                    <view class="plate-popup-item-list" :class="!isInputZh?'':''" v-for="(item,itemIndex) in keyEnInput3" :key="itemIndex" @click="plateInput(item)">{{item}}</view>
                    <!-- 车牌最后一位-->
                    <view class="plate-popup-item-list" :class="(plateNumber.length===6 || plateNumber.length===7) &&!isInputZh?'':''" v-for="(item,itemIndex) in keyEnInput4" :key="itemIndex" @click="plateLast(item)">{{item}}</view>
                    <!-- 删除 -->
                    <view class="plate-popup-item-list del" @click="plateDel">
                        <image :src="src" />
                    </view>
                </view>
            </view>

        </view>
        <!-- <button class="btn" type="button" @click="show" data-position="bottom">底部弹出 popup</button> -->

    </view>
</template>

<script>
	import plateDel from './plate-del.png'
    export default {
		props: {
			value:{
				type:String,
				default:''
			}
		},
        data() {
            return {
				plateNumber:this.value,//输入的车牌
                plateShow: false, //车牌选择是否打开
                keyVehicle1: ['京', '沪', '粤', '津', '冀', '豫', '云', '辽', '黑', '湘'],
                keyVehicle2: ['皖', '鲁', '新', '苏', '浙', '赣', '鄂', '桂', '甘'],
                keyVehicle3: ['晋', '蒙', '陕', '吉', '闽', '贵', '渝', '川'],
                keyVehicle4: ['青', '藏', '琼', '宁', "港", "澳"],
                keyNumber: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
                keyEnInput1: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
                keyEnInput2: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
                keyEnInput3: ["Z", "X", "C", "V", "B", "N", "M"],
                isInputZh: false, //是否输入了特殊字符
                src: ''
            };
        },
		watch:{
			value(newValue){
				this.plateNumber = newValue
			}
		},
        mounted() {
            this.src = plateDel;
        },
        methods: {
            /**
             * @desc 初始化
             */
            init() {
                this.plateNumber = '';
            },
            /**
             * @desc 打开下拉栏
             */
            show() {
                this.plateShow = true;
				//传值到父组件
				this.$emit('showOrHide', true);
            },
            /**
             * @desc 关闭弹出的车牌
             */
            close() {
				wx.vibrateShort();
                this.plateShow = false;
				//传值到父组件
				this.$emit('showOrHide', false);
            },
            /**
             * @desc 首字母选择
             */
            plateHead(plate) {
				wx.vibrateShort();
                if (!this.plateNumber) {
                    this.plateNumber = this.plateNumber + plate;
                    //与父组件双向绑定，传值到父组件
                    this.$emit('input', this.plateNumber);
                }
            },
            /**
             * @desc 字母选择
             */
            plateInput(plate) {
				wx.vibrateShort();
                //判断是否输入了字母
                if (this.isInputZh) {
                    return;
                }
                if (this.plateNumber.length < 8) {
                    this.plateNumber = this.plateNumber + plate;
                    //与父组件双向绑定，传值到父组件
                    this.$emit('input', this.plateNumber);
                }
            },
            /**
             * @desc 数字选择
             */
            plateNum(plate) {
				wx.vibrateShort();
                //判断是否输入了字母
                if (this.isInputZh) {
                    return;
                }
                if (this.plateNumber.length >= 2 && this.plateNumber.length < 8) {
                    this.plateNumber = this.plateNumber + plate;
                    //与父组件双向绑定，传值到父组件
                    this.$emit('input', this.plateNumber);
                }
            },
            /**
             * @desc 最后一位选择
             */
            plateLast(plate) {
                //判断是否输入了字母
				wx.vibrateShort();
                if (this.isInputZh) {
                    return;
                }
                if (this.plateNumber.length === 6 || this.plateNumber.length === 7) {
                    this.plateNumber = this.plateNumber + plate;
                    this.isInputZh = true;
                    //与父组件双向绑定，传值到父组件
                    this.$emit('input', this.plateNumber);
                }
            },
            /**
             * @desc 删除
             */
            plateDel() {
				wx.vibrateShort();
                if (this.plateNumber) {
                    this.plateNumber = this.plateNumber.substring(0, this.plateNumber.length - 1);
                }

                if (this.plateNumber.length === 6 || this.plateNumber.length === 7) {
                    this.isInputZh = false;
                }
                //与父组件双向绑定，传值到父组件
                this.$emit('input', this.plateNumber);
            }
        }
    }
</script>

<style lang="scss">
    @import "./plateNumber.scss";
</style>
