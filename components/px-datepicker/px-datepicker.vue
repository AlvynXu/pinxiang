<template>
	<view class="px-datepicker">
		<scroll-view class="px-datepicker-week" 
		:scroll-y="true" :show-scrollbar="false">
			<view class="px-datepicker-week-list" 
			v-for="(val, key) in weekArr" :key="key" 
			:class="{ active: val.active }"
			@click="selectDate(key)">
				<text class="disabled" v-if="val.disable">{{ val.week }} {{ val.date }}</text>
				<text v-else>{{ val.week }} {{ val.date }}</text>
			</view>
		</scroll-view>
		<scroll-view class="px-datepicker-time" 
		:scroll-y="true" :show-scrollbar="false">
			<view class="px-datepicker-time-list"
			v-for="(val, key) in timeArr" :key="key" 
			:class="{ active: val.active}"
			@click="selectTime(key)">
				<text class="disabled" v-if="val.disable">{{ val.time }}</text>
				<text v-else>{{ val.time }}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: 'PxDatepicker',

	props: {
		openTime:{
			type:String,
			default:'07:00:00',
		},
		closeTime:{
			type:String,
			default:'21:00:00',
		},
		value:{
			type:String,
			default:''
		}
	},
	data() {
		return {
			weekZH: ['周日','周一','周二','周三','周四','周五','周六'],
			weekArr: [],
			timeArr: [],
			confirmDay:'',
			confirmTime:''
		};
	},
	watch: {
		show(val){
			console.log(val)
		}
	},
	created() {
		let that = this
		let date = new Date()
		let time = Math.floor(date.getTime()/1000)
		let openTimeArr = this.openTime.split(":")
		let closeTimeArr = this.closeTime.split(":")
		let type = 0
		let endtime = 0
		if(parseInt(date.getHours()) > parseInt(closeTimeArr[0])){
			endtime = (time + 7 * 24 * 60 * 60)
		}else if((parseInt(date.getHours()) == parseInt(closeTimeArr[0])) && parseInt(date.getMinutes() > parseInt(closeTimeArr[1]))){
			endtime = (time + 7 * 24 * 60 * 60)
		}else{
			type = 1
			endtime = (time + 6 * 24 * 60 * 60)
		}
		
		if(type === 1) this.weekZH[parseInt(date.getDay())] = '今日'
		for(let i=time; i<=endtime; i+=86400){
			let tmpDate = new Date(i * 1000)
			that.weekArr.push({
				week: that.weekZH[parseInt(tmpDate.getDay())],
				date: (tmpDate.getMonth()+1 < 10 ? `0${tmpDate.getMonth()+1}` : tmpDate.getMonth()+1) + '月' + (tmpDate.getDate() < 10 ? `0${tmpDate.getDate()}` : tmpDate.getDate()) + '日',
				active: that.weekZH[parseInt(tmpDate.getDay())] === '今日' ? true : false,
				disable: false
			})
			if(that.weekZH[parseInt(tmpDate.getDay())] === '今日') that.confirmDay = (date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1) + '月' + (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()) + '日'
		}
		
		let startHour = parseInt(openTimeArr[0])
		let startMinutes = parseInt(openTimeArr[1])
		let endHour = parseInt(closeTimeArr[0])
		let endMinutes = parseInt(closeTimeArr[1])
		if(type === 1){
			if(parseInt(date.getHours()) > parseInt(openTimeArr[0])){
				startHour = parseInt(date.getHours())
				startMinutes = parseInt(date.getMinutes())
			}else{
				if(parseInt(date.getHours()) == parseInt(openTimeArr[0]) && parseInt(date.getMinutes()) > parseInt(openTimeArr[1])){
					startMinutes = parseInt(date.getMinutes())
				}
			}
		}
		
		if(startMinutes < 30){
			that.timeArr.push({ 
				time: (startHour<10 ? `0${startHour}` : startHour) + ':30', 
				active: false, disable: false ,
			})
		}
		
		for (let i=startHour; i<endHour-1; i++){
			that.timeArr.push({
				time: ((i+1)<10 ? `0${i+1}` : i+1) + ':00', 
				active: false, disable: false ,
			})
			that.timeArr.push({
				time: ((i+1)<10 ? `0${i+1}` : i+1) + ':30', 
				active: false, disable: false ,
			})
		}
		
		
		if(endHour == 30){
			that.timeArr.push({
				time: (endHour<10 ? `0${endHour}` : endHour) + ':00', 
				active: false, disable: false ,
			})
		}
		
	},
	methods: {
		selectDate(key){
			let that = this
			let date = new Date()
			if(that.weekArr[key].disable) return false
			for(let i=0;i<that.weekArr.length;i++){
				that.weekArr[i].active = false
			}
			that.weekArr[key].active = true
			that.confirmDay = that.weekArr[key].date
			let openTimeArr = that.openTime.split(":")
			let closeTimeArr = that.closeTime.split(":")
			let startHour = parseInt(openTimeArr[0])
			let startMinutes = parseInt(openTimeArr[1])
			let endHour = parseInt(closeTimeArr[0])
			let endMinutes = parseInt(closeTimeArr[1])
			if(key===0 && that.weekArr[key].week === '今日'){
				if(parseInt(date.getHours()) > parseInt(openTimeArr[0])){
					startHour = parseInt(date.getHours())
					startMinutes = parseInt(date.getMinutes())
				}else{
					if(parseInt(date.getHours()) == parseInt(openTimeArr[0]) && parseInt(date.getMinutes()) > parseInt(openTimeArr[1])){
						startMinutes = parseInt(date.getMinutes())
					}
				}
			}
			
			that.timeArr = []
			
			if(startMinutes < 30){
				that.timeArr.push({ 
					time: (startHour<10 ? `0${startHour}` : startHour) + ':30', 
					active: false, disable: false ,
				})
			}
			
			for (let i=startHour; i<endHour-1; i++){
				that.timeArr.push({
					time: ((i+1)<10 ? `0${i+1}` : i+1) + ':00', 
					active: false, disable: false ,
				})
				that.timeArr.push({
					time: ((i+1)<10 ? `0${i+1}` : i+1) + ':30', 
					active: false, disable: false ,
				})
			}
			
			
			if(endHour == 30){
				that.timeArr.push({
					time: (endHour<10 ? `0${endHour}` : endHour) + ':00', 
					active: false, disable: false ,
				})
			}
			
		},
		selectTime(key){
			if(this.timeArr[key].disable) return false
			for(let i=0;i<this.timeArr.length;i++){
				this.timeArr[i].active = false
			}
			this.timeArr[key].active = true
			let confirmDay = (this.confirmDay.replace(/[月]+/g,'-')).replace(/[日]+/g,' ')
			console.log(confirmDay+this.timeArr[key].time)
			this.$emit("choose",confirmDay+this.timeArr[key].time)
		}
	}
};
</script>
<style lang="scss" scoped>
.px-datepicker {
	width: 100%;
	height: 100%;
	display: inline-flex;
	justify-content: space-between;
	&-week {
		width: 100%;
		height: 100%;
		background-color: rgba(164, 164, 164, 0.2);
		&-list {
			width: 100%;
			height: 43upx;
			text-align: center;
			padding: 10upx 0;
			font-size: 29upx;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			line-height: 43upx;
			.disabled{
				color:#D8D8D8;
			}
		}
		.active {
			background-color: white;
		}
	}
	&-time {
		width: 100%;
		height: 100%;
		background-color: white;
		&-list {
			width: 100%;
			height: 43upx;
			text-align: center;
			padding: 10upx 0;
			font-size: 29upx;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			line-height: 43upx;
			.disabled{
				color:#D8D8D8;
			}
		}
		.active {
			color: #FE5100;
		}
	}
}
</style>
