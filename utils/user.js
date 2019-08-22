import {getOpenID,login} from '@/api/index.js'
export async function wxLogin(userData){
	let wxOpenID = uni.getStorageSync('wxOpenID')
	let wxData = uni.getStorageSync('userData')
		
	if(wxData == null || wxData.length === 0)
	{
		let loginResult = await login({
			Type:'WECHAT',
			EncryptedData:userData.encryptedData,
			IV:userData.iv,
			OpenID:wxOpenID
		})
	}
}


