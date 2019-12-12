import {
	fetch
} from "./fetch"; //引用fetch.js
import api from './url'; //引用url.js

/**
 * 获取话题
 * @param params
 * @returns {*|Promise<any>}
 */
export function getTopicTitle(params = {}) {
	return fetch({
		url: `${api.base}/topicTitle`,
		method: 'get',
		params: params
	})
}

/**
 * 创建话题
 * @param params
 * @returns {*|Promise<any>}
 */
export function createTopic(params = {}) {
	return fetch({
		url: `${api.base}/topic/insert`,
		method: 'post',
		data: params
	})
}

/**
 * 创建长文
 * @param params
 * @returns {*|Promise<any>}
 */
export function createLongText(params = {}) {
	return fetch({
		url: `${api.blog}/longText`,
		method: 'post',
		data: params
	})
}

/**
 * 上传话题图片
 * @param params
 * @returns {*|Promise<any>}
 */
export function uploadTopicImg(params) {
	let formData = new FormData()
	formData.append('type', params.type);
	formData.append('file', params.file);
	formData.append('id', params.id)
	return fetch({
		url: `${api.upload}/topic`,
		method: 'post',
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		data: formData
	})
}

/**
 * 上传车辆图片
 * @param params
 * @returns {*|Promise<any>}
 */
export function uploadCarImg(params) {
	return fetch({
		url: `${api.upload}/driver`,
		method: 'post',
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		data: {
			'type': params.type,
			'file': params.file,
			'id': params.id
		}
	})
}
export function blogCollect(id, params = {}) {
	return fetch({
		url: `${api.blog}/collect/${id}`,
		method: 'post',
		data: params
	})
}

export function getVideo(id, params = {}) {
	return fetch({
		url: `${api.blog}/video/${id}`,
		method: 'get',
		params: params
	})
}
export function blogLike(id, params = {}) {
	return fetch({
		url: `${api.blog}/like/${id}`,
		method: 'post',
		data: params
	})
}

export function nextVideo(params = {}) {
	return fetch({
		url: `${api.blog}/nextVideo`,
		method: 'post',
		data: params
	})
}

/**
 * 上传视频
 * @param params
 * @returns {*|Promise<any>}
 */
export function uploadVideo(params) {
	let formData = new FormData()
	formData.append('type', params.type);
	formData.append('file', params.file);
	formData.append('id', params.id)
	return fetch({
		url: `${api.upload}/topic`,
		method: 'post',
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		data: formData
	})
}

/**
 * 获取长文
 * @param params
 * @returns {*|Promise<any>}
 */
export function getLongText(id, params = {}) {
	return fetch({
		url: `${api.blog}/longText/${id}`,
		method: 'get',
		params: params
	})
}

/**
 * 创建blog
 * @param params
 * @returns {*|Promise<any>}
 */
export function createBlog(params = {}) {
	return fetch({
		url: `${api.blog}/insert`,
		method: 'post',
		data: params
	})
}

/**
 * 获取blog
 * @param params
 * @returns {*|Promise<any>}
 */
export function getBlog(id, params = {}) {
	return fetch({
		url: `${api.blog}/get/${id}`,
		method: 'get',
		params: params
	})
}

/**
 * 上传评论
 * @param params
 * @returns {*|Promise<any>}
 */
export function createReply(params = {}) {
	return fetch({
		url: `${api.blog}/reply`,
		method: 'post',
		data: params
	})
}

/**
 * 获取评论
 * @param params
 * @returns {*|Promise<any>}
 */
export function getReply(blogId, params = {}) {
	return fetch({
		url: `${api.blog}/reply/${blogId}`,
		method: 'get',
		params: params
	})
}

/**
 * 关注按钮
 * @param params
 * @returns {*|Promise<any>}
 */
export function getFollow(params = {}) {
	return fetch({
		url: `${api.user}/follow`,
		method: 'put',
		data: params
	})
}

export function getBlogList(type, params = {}) {
	return fetch({
		url: `${api.blog}/index/${type}`,
		method: 'post',
		data: params
	})
}

export function h5UploadKey(params) {
	return fetch({
		url: `${api.upload}/h5key`,
		method: 'post',
		data: params
	})
}

// 登录接口
export function login(params) {
	return fetch({
		url: api.base + '/regOrLogin',
		method: 'post', //请求方法
		data: params
	})
}

export function loginSms(params) {
	return fetch({
		url: `${api.sms}/login`,
		method: 'post',
		data: params
	})
}

export function checkSms(params) {
	return fetch({
		url: `${api.sms}/check`,
		method: 'get',
		params: params
	})
}

export function changePassword(params) {
	return fetch({
		url: `${api.base}/changePassword`,
		method: 'put',
		data: params
	})
}

export function checkLogin(params = {}) {
	return fetch({
		url: `${api.base}/checkLogin`,
		method: 'get',
		params: params
	})
}

export function getUserDetail(params = {}) {
	return fetch({
		url: `${api.user}/detail`,
		method: 'get',
		params: params
	})
}

export function changePhone(params = {}) {
	return fetch({
		url: `${api.user}/phone`,
		method: 'put',
		data: params
	})
}

export function changeNickname(params = {}) {
	return fetch({
		url: `${api.user}/nickname`,
		method: 'put',
		data: params
	})
}

export function changeSex(params = {}) {
	return fetch({
		url: `${api.user}/sex`,
		method: 'put',
		data: params
	})
}

export function changeAvatar(params = {}) {
	return fetch({
		url: `${api.user}/avatar`,
		method: 'put',
		data: params
	})
}

export function changeUsername(params = {}) {
	return fetch({
		url: `${api.user}/username`,
		method: 'put',
		data: params
	})
}

export function changeAddress(params = {}) {
	return fetch({
		url: `${api.user}/address`,
		method: 'put',
		data: params
	})
}

export function changeSign(params = {}) {
	return fetch({
		url: `${api.user}/sign`,
		method: 'put',
		data: params
	})
}

export function changeBirth(params = {}) {
	return fetch({
		url: `${api.user}/birth`,
		method: 'put',
		data: params
	})
}

export function changeSchool(params = {}) {
	return fetch({
		url: `${api.user}/school`,
		method: 'put',
		data: params
	})
}

export function getOpenID(params = {}) {
	return fetch({
		url: `${api.mina}/code2Session`,
		method: 'post',
		data: params
	})
}

export function decryptPhone(params = {}) {
	return fetch({
		url: `${api.mina}/decrypt`,
		method: 'post',
		data: params
	})
}

export function getStore(params = {}) {
	return fetch({
		url: `${api.store}/index`,
		method: 'get',
		params: params
	})
}

export function getStoreByID(id, params = {}) {
	return fetch({
		url: `${api.store}/get/${id}`,
		method: 'get',
		params: params
	})
}

export function getStoreItem(id, params = {}) {
	return fetch({
		url: `${api.store}/item/${id}`,
		method: 'get',
		params: params
	})
}

export function getStoreItemDetail(id, params = {}) {
	return fetch({
		url: `${api.store}/item/detail/${id}`,
		method: 'get',
		params: params
	})
}

export function getStoreReply(id, params={}){
	return fetch({
		url: `${api.store}/reply/${id}`,
		method: 'get',
		params: params
	})
}

export function storeSearch(params={}) {
	return fetch({
		url: `${api.store}/search`,
		method: 'post',
		data: params
	})
}

export function getAppointmentTime(params={}) {
	return fetch({
		url: `${api.store}/appointment`,
		method: 'get',
		params: params
	})
}

export function appointment(params={}) {
	return fetch({
		url: `${api.store}/appointment`,
		method: 'post',
		data: params
	})
}
export function appointmentV2(params={}) {
	return fetch({
		url: `${api.store}/appointment/v2`,
		method: 'post',
		data: params
	})
}
export function getVipCount(params={}) {
	return fetch({
		url: `${api.vip}/count`,
		method: 'get',
		params: params
	})
}
export function getAppointmentDetail(id,params={}) {
	return fetch({
		url: `${api.store}/appointment/${id}`,
		method: 'get',
		params: params
	})
}
export function getAppointmentV2(id,params={}) {
	return fetch({
		url: `${api.store}/appointmentV2`,
		method: 'get',
		params: params
	})
}

export function getVip(params={}) {
	return fetch({
		url: `${api.user}/vip`,
		method: 'get',
		data: params
	})
}

export function getDriver(params={}) {
	return fetch({
		url: `${api.user}/driver`,
		method: 'get',
		params: params
	})
}

export function addDriver(params={}) {
	return fetch({
		url: `${api.user}/driver`,
		method: 'post',
		data: params
	})
}

export function rateRecord(params={}){
	return fetch({
		url: `${api.user}/rate/record`,
		method: 'get',
		params: params
	})
}

export function vipBenefits(params={}){
	return fetch({
		url: `${api.user}/vip/benefits`,
		method: 'get',
		params: params
	})
}
export function getAppointment(type,params={}){
	return fetch({
		url: `${api.order}/user/${type}`,
		method: 'get',
		params: params
	})
}
export function cancleOrder(id, params = {}) {
	return fetch({
		url: `${api.order}/user/${id}`,
		method: 'put',
		data:params,
	})
}

export function payDetail(params={}) {
	return fetch({
		url: `${api.pay}/detail`,
		method: 'post',
		data: params
	})
}

export function payDetailOne(params={}) {
	return fetch({
		url: `${api.pay}/detail/one`,
		method: 'post',
		data: params
	})
}

export function payVip(params={}) {
	return fetch({
		url: `${api.pay}/vip`,
		method: 'post',
		data: params
	})
}

export function payOne(params={}) {
	return fetch({
		url: `${api.pay}/one`,
		method: 'post',
		data: params
	})
}

export function addReply(params={}) {
	return fetch({
		url: `${api.store}/reply`,
		method: 'post',
		data: params
	})
}

export function getToken(params = {}) {
	return fetch({
		url: `${api.user}/token`,
		method: 'get',
		params: params
	})
}

export function getBanner(params={}) {
	return fetch({
		url: `${api.base}/banner`,
		method: 'get',
		params: params
	})
}

export function getUserByCode(code,params={}) {
	return fetch({
		url: `${api.user}/code/${code}`,
		method: 'get',
		params: params
	})
}
export function getActive(code,params={}) {
	return fetch({
		url: `${api.active}/20191001`,
		method: 'get',
		params: params
	})
}

export function getWinninCode(params={}) {
	return fetch({
		url: `${api.active}/20191001`,
		method: 'post',
		data: params
	})
}
export function getWinList(code,params={}) {
	return fetch({
		url: `${api.active}/result/20191001`,
		method: 'get',
		params: params
	})
}

export function getSessionID(params={}) {
	return fetch({
		url: `${api.base}/getSessionID`,
		method:'get',
		params:params
	})
}

export function storeSearchV2(params={}) {
	return fetch({
		url: `${api.store}/search/v2`,
		method:'post',
		data:params
	})
}

export function getMessage(params={}){
	return fetch({
		url: `${api.base}/message`,
		method:'get',
		params:params
	})
}

export function offerNumber(params={}) {
	return fetch({
		url: `${api.base}/offerNumber`,
		method:'post',
		data:params
	})
}

export function usedCount(params = {}) {
	return fetch({
		url: `${api.base}/usedCount`,
		method: 'get',
		params:params
	})
}

export function useCarNumber(params={}) {
	return fetch({
		url: `${api.user}/lastCarNumber`,
		method: 'get',
		params:params
	})
}
