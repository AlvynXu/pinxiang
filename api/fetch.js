// import axios from 'axios';
import uniRequest from 'uni-request';
uniRequest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
uniRequest.interceptors.response.use(
	response => {
		if (parseInt(response.status) === 200) {
			const code = response.data.Code;
			const msg = response.data.Msg;
			if(parseInt(code)===80003){
				uni.removeStorageSync('user_data')
				uni.removeStorageSync('api_token')
				return Promise.resolve(response.data);
			}
			if (parseInt(code) === 80002) {
				uni.removeStorageSync('user_data')
				uni.removeStorageSync('api_token')
				wx.showModal({
					title:'提醒',
					content:'您未登陆，请完成登陆',
					confirmText:'前往',
					success (res) {
					    if (res.confirm) {
							uni.navigateTo({
								url:"/pages/login/login"
							})
					    } else if (res.cancel) {
					      console.log('用户点击取消')
					    }
					}
				})
				return Promise.resolve(response.data);
			}
			if (parseInt(code) === 50016) {
				wx.showModal({
					title:'提醒',
					content:msg,
					confirmText:'认证',
					success (res) {
					    if (res.confirm) {
							uni.navigateTo({
								url:"/pages/userSub/car"
							})
					    } else if (res.cancel) {
					      console.log('用户点击取消')
					    }
					}
				})
				return Promise.resolve(response.data);
			}
			if (parseInt(code) !== 200) {
				wx.showToast({
					title:response.data.Msg,
					icon: 'error',
					duration:2000
				})
				return Promise.resolve(response.data);
			}
			console.log(response.data)
			return Promise.resolve(response.data);
		}
	},
	error => {
		console.log('err' + error);
		// return Promise.reject(error);
	}
)

export function fetch(options) {
	return new Promise((resolve, reject) => {
		uniRequest.defaults.headers.common['Authorization'] = 'bearer '+ uni.getStorageSync('api_token');
		uniRequest.defaults.headers.common['SessionID'] = uni.getStorageSync('session_id');
		if (options.method == 'get') {
			uniRequest.get(options.url, {data:options.params}).then(function(response) {
				resolve(response);
			}).catch(function(error) {
				console.log(error);
			});
		}
		if (options.method == 'post') {
			uniRequest.post(options.url, options.data).then(function(response) {
				resolve(response);
			}).catch(function(error) {
				console.log(error);
			});
		}
		if (options.method == 'put') {
			uniRequest.put(options.url, options.data).then(function(response) {
				resolve(response);
			}).catch(function(error) {
				console.log(error);
			});
		}

	});
}
