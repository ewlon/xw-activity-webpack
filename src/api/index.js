import ajax from './ajax'

var rootPath = 'http://localhost:3000'

//获取验证码
export const reqYZM = (mobile) => ajax(rootPath+'/hnmccClientWap/yanzhengma/sendmsg.do',{mobile});
//验证是否是河南移动手机号
export const reqCheckPhone = (mobile) => ajax(rootPath+'/hnmccClientWap/yanzhengma/judgeHn.do',{mobile});

