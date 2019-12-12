let base = 'https://api.quchebang.cn'
switch (__wxConfig.envVersion){
	case "develop": base = 'https://test.api.pxglobal.cn';break; //本地开发
	case "trial": base = 'https://test.api.pxglobal.cn';break; // 体验版
	default: break;
}
export default {
  base: base,
  upload: `${base}/upload`,
  sms: `${base}/sms`,
  blog: `${base}/blog`,
  user: `${base}/user`,
  mina: `${base}/mina`,
  store: `${base}/store`,
  order: `${base}/order`,
  pay: `${base}/pay`,
  vip: `${base}/vip`,
  active: `${base}/active`
  
  // base: 'http://api.dev.doudouxiongglobal.com',
  // upload: 'http://api.dev.doudouxiongglobal.com/upload',
  // sms: 'http://api.dev.doudouxiongglobal.com/sms',
  // blog: 'http://api.dev.doudouxiongglobal.com/blog',
  // user: 'http://api.dev.doudouxiongglobal.com/user',
  // mina: 'http://api.dev.doudouxiongglobal.com/mina'
  //接口代理配置
}
