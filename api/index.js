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
  let formData = new FormData()
  formData.append('type', params.type);
  formData.append('file', params.file);
  formData.append('id', params.id)
  return fetch({
    url: `${api.upload}/driver`,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
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

export function decryptPhone(params={}) {
	return fetch({
		url: `${api.mina}/decrypt`,
		method: 'post',
		data: params
	})
}

export function getStore(params={}) {
	return fetch({
		url: `${api.store}/index`,
		method: 'get',
		params: params
	})
}

export function getStoreByID(id,params={}) {
	return fetch({
		url: `${api.store}/get/${id}`,
		method: 'get',
		params: params
	})
}

