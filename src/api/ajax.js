import axiox from 'axios'

export default function ajax(url, data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    let promise;
    if (type.toUpperCase() === 'GET') { // 处理get请求
      let dataStr = '' // 数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      });
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url += '?' + dataStr
      }
      promise = axiox.get(url)
    } else { // 处理post
      promise = axiox.post(url, data)
    }
    promise.then(function (response) {
      resolve(response.data)
    }).catch(function (error) {
      reject(error)
    })
  })
}
