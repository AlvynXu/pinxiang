<template>
	<!-- 海报(想让海报显示隐藏要用hidden，v-if关闭后没办法在完整的出来海报) 保存海报按钮和关闭按钮 在html代码中写出来 绑定点击方法然后透明 再用canvas 覆盖 -->
	<view class="canvas_box" :hidden="canvasFlag">
		<!-- <view class="canvas_box_mask" @tap="canvasCancelEvn"></view><!-- 遮罩 --> 
		<!-- <icon type="cancel" class="canvas_close_btn" size="60" @tap="canvasCancelEvn" color="transparent" /><!-- 关闭 --> 
		<view class="button-wrapper">
			<!-- 保存海报按钮 -->
			<!-- <cover-image :src="tmpImage"></cover-image> -->
			<cover-view class="save_btn" @tap="saveCanvasImage"></cover-view>
		</view>
		<view :hidden="canvasFlag"><!-- 海报 要放外面放组件里面 会找不到 canvas-->
			<canvas class="canvas" :style="canvasStyle" canvas-id="myCanvas" ref="myCanvas"></canvas><!-- 海报 -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				canvasW : 0,
				canvasH : 0,
				canvasStyle:'',
				tmpImage:''
			}
		},
		props: {
			canvasFlag: {
				type: Boolean,
				default: true,
			},
			posterObj: {
				type: Object,
				default: {
					url: 'https://img0.zuipin.cn/mp_zuipin/poster/hch-pro.jpg', //商品主图
					icon: 'https://img0.zuipin.cn/mp_zuipin/poster/hch-hyj.png', //会员价图标
					title: "诗酒茶系列 武夷大红袍 2018年 花香型中火 一级 体验装 16g", //标题
					discountPrice: "250.00", //折后价格
					orignPrice: "300.00", //原价
					code: 'https://img0.zuipin.cn/mp_zuipin/poster/hch-code.png', //小程序码
				}
			}
		},
		methods: {
			// 海报
			// 画圆角矩形 ctx、x起点、y起点、w宽度、h高度、r圆角半径、fillColor填充颜色、strokeColor边框颜色
			roundRect(ctx, x, y, w, h, r, fillColor, strokeColor, btn) {
				// 开始绘制
				ctx.beginPath()
				// 绘制左上角圆弧 Math.PI = 180度
				// 圆心x起点、圆心y起点、半径、以3点钟方向顺时针旋转后确认的起始弧度、以3点钟方向顺时针旋转后确认的终止弧度
				ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
				// 绘制border-top
				// 移动起点位置 x终点、y终点
				ctx.moveTo(x + r, y)
				// 画一条线 x终点、y终点
				ctx.lineTo(x + w - r, y)
				// 绘制右上角圆弧
				ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
				// 绘制border-right
				ctx.lineTo(x + w, y + h - r)
				// 绘制右下角圆弧

				ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

				// 绘制左下角圆弧

				ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

				// 绘制border-left
				ctx.lineTo(x, y + r)
				if (btn == 'btn') {
					const grd = ctx.createLinearGradient(0, 0, 200, 0) //渐变色
					grd.addColorStop(0, fillColor)
					grd.addColorStop(1, strokeColor)
					// 因为边缘描边存在锯齿，最好指定使用 transparent 填充
					ctx.setFillStyle(grd)
					// 对绘画区域填充
					ctx.fill()
				} else {

					if (fillColor) {
						// 因为边缘描边存在锯齿，最好指定使用 transparent 填充
						ctx.setFillStyle(fillColor)
						// 对绘画区域填充
						ctx.fill()
					}
					if (strokeColor) {
						// 因为边缘描边存在锯齿，最好指定使用 transparent 填充
						ctx.setStrokeStyle(strokeColor)
						// 画出当前路径的边框
						ctx.stroke()
					}
				}
				// 关闭一个路径
				ctx.closePath()
				// 剪切，剪切之后的绘画绘制剪切区域内进行，需要save与restore 这个很重要 不然没办法保存
				ctx.clip()
			},

			/**
			 * canvas绘图相关，把文字转化成只能行数，多余显示省略号
			 * ctx: 当前的canvas
			 * text: 文本
			 * contentWidth: 文本最大宽度
			 * lineNumber: 显示几行
			 */
			canvasMultiLineText(ctx, text, contentWidth, lineNumber) {
				var textArray = text.split(""); // 分割成字符串数组
				var temp = "";
				var row = [];
				for (let i = 0; i < textArray.length; i++) {
					if (ctx.measureText(temp).width < contentWidth) {
						temp += textArray[i];
					} else {
						i--; // 这里添加i--是为了防止字符丢失
						row.push(temp);
						temp = "";
					}
				}
				row.push(temp);

				// 如果数组长度大于2，则截取前两个
				if (row.length > lineNumber) {
					var rowCut = row.slice(0, lineNumber);
					var rowPart = rowCut[1];
					var test = "";
					var empty = [];
					for (var a = 0; a < rowPart.length; a++) {
						if (ctx.measureText(test).width < contentWidth) {
							test += rowPart[a];
						} else {
							break;
						}
					}
					empty.push(test); // 处理后面加省略号
					var group = empty[0] + '...'
					rowCut.splice(lineNumber - 1, 1, group);
					row = rowCut;
				}
				return row;
			},


			// 生成海报
			createCanvasImage() {
				// this.canvasFlag=false;
				// this.deliveryFlag = false;//关闭分享的弹窗
				wx.showLoading({
					title: '海报生成中...'
				})
				let _this = this;
				let phoneData = wx.getSystemInfoSync();
				wx.getImageInfo({
					src:_this.posterObj.url,
					success:(res)=>{
						console.log(res)
						let imageW = res.width
						let imageH = res.height
						let phoneW = phoneData.windowWidth;
						let phoneH = phoneData.windowHeight;
						let canvasW = Math.floor(phoneW * 0.7);
						let canvasH = Math.floor(canvasW * imageH / imageW)
						_this.canvasW = canvasW
						_this.canvasH = canvasH
						console.log(canvasW,canvasH)
						console.log(phoneW,phoneH)
						let left = (phoneW-canvasW)/2
						let top = ((phoneH-(Math.floor(phoneW*240/750)))-canvasH)/2
						_this.canvasStyle = `width:${canvasW}px !important; height:${canvasH}px !important; left:${left}px !important;top:${top}px !important;`
						const ctx = wx.createCanvasContext('myCanvas');
						let url = _this.posterObj.url; //商品主图
						let zpPriceIcon = _this.posterObj.icon //图标
						let code = _this.posterObj.code
						let closeBtn = 'https://imgzuipin.oss-cn-hangzhou.aliyuncs.com/mp_zuipin/poster/close_btn.png'
						
						ctx.draw() //清空原来的画图内容
						ctx.save();
						// _this.roundRect(ctx, 35, 40, 300, 430, 10, '#fff', '#fff'); //绘制海报圆角背景白色的
						ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 可以继续绘制
						ctx.save();
						// this.roundRect(ctx,50,40,(this.phoneW-100), 400,10,'#f7f7f7','#f7f7f7');//绘制海报圆角背景 上半截灰色的
						ctx.restore();
						wx.downloadFile({
							url: url,
							success(res) {
								if (res.statusCode === 200) {
									let filePath = res.tempFilePath
									// wx.getImageInfo({
									// 	src: filePath,
									// 	success(res){
									ctx.save();
									//覆盖绘制
									//问题：在微信小程序使用canvas绘制圆角图片时，微信调试工具正常显示，android真机都不显示。
									// 原因：因为ctx.clip()剪切区域使用的填充颜色是透明的，所以图片没出来。
									// 解决方案：将剪切区域设置成实体颜色就好了。
									// _this.roundRect(ctx, 50, 55, (_this.phoneW - 100), 405, 10, '#f7f7f7', '#f7f7f7') //绘制图片圆角背景
									ctx.drawImage(filePath, 0, 0, _this.canvasW, _this.canvasH, 1, 1); //绘制图
									ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 可以继续绘制
									ctx.draw(true)
									
									const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(code) || [];
									if (!format) {
										
									}
									const FILE_BASE_NAME = 'tmp_img_src';
									const filePathCode = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
									const buffer = wx.base64ToArrayBuffer(bodyData);
									wx.getFileSystemManager().writeFile({
										filePath:filePathCode,
										data: buffer,
										encoding: 'binary',
										success() {
											_this.tmpImage = filePathCode
											ctx.save();
											// //覆盖绘制
											// //问题：在微信小程序使用canvas绘制圆角图片时，微信调试工具正常显示，android真机都不显示。
											// // 原因：因为ctx.clip()剪切区域使用的填充颜色是透明的，所以图片没出来。
											// // 解决方案：将剪切区域设置成实体颜色就好了。
											// // _this.roundRect(ctx,50,300,50,50,10,'#f7f7f7','#f7f7f7')//绘制图片圆角背景
											let codeTop = _this.canvasH*0.708
											let codeLeft = _this.canvasW*0.15
											let codeW = _this.canvasW*0.173
											let codeH = codeW
											ctx.drawImage(filePathCode, codeLeft, codeTop, codeW, codeH, 1, 1); //绘制图
											// // ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 可以继续绘制
											ctx.draw(true)
										},
										fail() {
										},
									});
									
									
									// wx.downloadFile({
									// 	url: code,
									// 	success(res) {
									// 		if (res.statusCode === 200) {
												
									// 		}
									// 	}
									// })
									
									wx.downloadFile({
										url: zpPriceIcon,
										success(res) {
											if (res.statusCode === 200) {
												let filePath = res.tempFilePath
												let avatarW = Math.floor(_this.canvasW*0.13)
												let left = (_this.canvasW-_this.canvasW*0.76-_this.canvasW*0.033)/2+_this.canvasW*0.76-avatarW/2
												ctx.drawImage(filePath, left, 21, avatarW, avatarW, 1, 1)
												ctx.draw(true)
											}
										}
									})
						
						
								}
							}
						
						})
						wx.hideLoading();
					}
				})
				// let scaleW = _this.phoneW / 375; //按照苹果留 375*667比例 其他型号手机等比例缩放 显示
				// let scaleH = _this.phoneH / 667; //按照苹果留 375*667比例 其他型号手机等比例缩放 显示
				
				//将网络图片转成本地路径 商品图片
				
			
		},

		// 保存到系统相册
		saveCanvasImage() {
			console.log('点击了保存')
			wx.showLoading({
				title: '保存中...'
			})
			let _this = this;
			// 1-把画布转化成临时文件
			uni.canvasToTempFilePath({
				// x: 0,
				// y: 0,
				// width: (_this.phoneW - 100), // 画布的宽
				// height: 405, // 画布的高
				// destWidth: (_this.phoneW - 100),
				// destHeight: 405,
				canvasId: 'myCanvas',
				success(res) {
					// 2-保存图片至相册
					uni.saveImageToPhotosAlbum({
						filePath: res.tempFilePath,
						success(res2) {
							wx.hideLoading();
							uni.showToast({
								title: '图片保存成功，可以去分享啦~',
								duration: 2000
							})
							_this.canvasCancelEvn();
						},
						fail() {
							uni.showToast({
								title: '保存失败，稍后再试',
								duration: 2000,
								icon: 'none'
							})
							wx.hideLoading();
						}
					})
				},
				fail() {
					uni.showToast({
						title: '保存失败，稍后再试',
						duration: 2000,
						icon: 'none'
					})
					wx.hideLoading();
				}
			})
		},
		// 取消海报
		canvasCancelEvn() {
			console.log()
			this.$emit('cancel', true)
		}
	}
	}
</script>

<style lang="scss">
	.content {
		text-align: center;
		height: 100%;
	}

	.canvas_box {
		.canvas_box_mask {
			// width: 100%;
			// height: 100%;
			// position: fixed;
			// top: 0;
			// right: 0;
			// bottom: 0;
			// left: 0;
			// background: rgba(0, 0, 0, 0.5);
			// z-index: 1;
		}

		.canvas {
			position: fixed !important;
			// top: 0 !important;
			// left: 0 !important;
			display: block !important;
			// width: 100% !important;
			// height: 100% !important;
			z-index: 9;
		}

		.button-wrapper {
			width: 320rpx;
			height: 72rpx;
			position: absolute;
			bottom: 20rpx;
			left: 215rpx;
			z-index: 16;
		}

		.save_btn {
			font-size: 30rpx;
			line-height: 72rpx;
			color: #fff;
			width: 100%;
			height: 100%;
			text-align: center;
			border-radius: 45rpx;
			border-radius: 36rpx;
			z-index: 10;
		}

		.canvas_close_btn {
			position: fixed;
			top: 30rpx;
			right: 0;
			z-index: 12;

		}
	}
</style>
