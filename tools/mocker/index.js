var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')



var port = 8233
var app = express()

//用body parser 来解析post和url信息中的参数
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// 使用 morgan 将请求日志打印到控制台
app.use(morgan('dev'));

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port );
});


let ordersApi = require('./module/orders')
app.use('/api', ordersApi);
  

app.listen(port)
console.log(`server is runing at http://localhost:${port}`)




