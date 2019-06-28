/* 设置本地假数据 */
const Mock = require('mockjs');
var Random = Mock.Random;

module.exports = function (app) {
    app.all('*',function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        if (req.method == 'OPTIONS') {
            res.send(200);
        }
        else {
            next();
        }
    });

    app.get('/hnmccClientWap/yanzhengma/judgeHn.do',function (req, res, next) {
        res.send({
            judgeHn: 'yes'
        })
    })
    app.get('/hnmccClientWap/yanzhengma/sendmsg.do', function (req, res, next) {
        var data =Mock.mock({
            'list|20':[{
                'id|+1':1,
                'serial_number|1-100':1,
                'warn_number|1-100':1,
                'warn_name|1':['流水线编排服务异常','磁盘占用超过阈值'],
                'warn_level|1':['紧急','重要'],
                'warn_detail':'环境IP:10.114.123.12,服务名称:XX',
                'create_time':Random.datetime(),
                'finish_time':Random.datetime(),
                'contact|4':'abc'
            }]
        });

        res.send({
            meta : {
                message: 'success'
            },
            status:true,
            data: data.list
        })
    });




};
