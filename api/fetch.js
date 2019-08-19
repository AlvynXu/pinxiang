// import axios from 'axios';
import uniRequest from 'uni-request';
// import { Toast,Notify,Dialog  } from 'vant';
// import UserAgent from '@/libs/user-agent'

uniRequest.defaults.baseURL = 'https://yourapi.domain.com';
uniRequest.defaults.headers.common['Authorization'] = uni.getStorageInfoSync('api_token');
uniRequest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

uniRequest.interceptors.response.use(
	response => {
		if (parseInt(response.status) === 200) {
			const code = response.data.Code;
			if (parseInt(code) === 80002) {
				Dialog.confirm({
					title: '提醒',
					message: '您未登陆，请完成登陆',
					confirmButtonText: '前往',
					lockScroll: true
				}).then(() => {
					// on confirm
					window.location.href = '/login'
				}).catch(() => {
					// on cancel
				});
				return Promise.resolve(response.data);
			}
			if (parseInt(code) !== 200) {
				Toast(response.data.Msg)
				return Promise.resolve(response.data);
			}
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
		if (options.method == 'get') {
			uniRequest.get(options.url, {
				data: options.params
			}).then(function(response) {
				console.log(response)
				resolve(response);
			}).catch(function(error) {
				console.log(error);
			});
		}
		if (options.method == 'post') {
			uniRequest.post(options.url, {
				data: options.params
			}).then(function(response) {
				resolve(response);
			}).catch(function(error) {
				console.log(error);
			});
		}
		if (options.method == 'put') {
			uniRequest.put(options.url, {
				data: options.params
			}).then(function(response) {
				resolve(response);
			}).catch(function(error) {
				console.log(error);
			});
		}

	});
}
