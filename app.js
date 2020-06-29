//引用express框架
const  express = require('express')
const path = require('path');
//引入body-parser模块，用来处理post请求参数
const bodyPaser = require('body-parser')
//导入express-session模块
const session = require('express-session')
//导入art-template模块引擎
const template = require('art-template')
//导入dateformat第三方模块
const dateFormat = require('dateformat')

//导入morgan这个第三方模块
const morgan = require('morgan')
//导入config模块
const config = require('config')
//创建网站服务器
const app = express();

//数据库连接
require('./model/connect')

//处理post请求参数
app.use(bodyPaser.urlencoded({extended:false}))
//配置session
app.use(session({
    secret:'secret key',
    saveUninitialized:false,
    cookie:{
        maxAge:24*60*60*1000
    }
}))


//开放静态资源
app.use(express.static(path.join(__dirname,'public')))

console.log(config.get('title'))
if(process.env.NODE_ENV=='development'){
    console.log('当前是开发环境');
    app.use(morgan('dev'))
}else{
    console.log('当前是生产环境')
}


//告诉express框架模板所在位置
app.set('views',path.join(__dirname,'views'))
//告诉express框架模板的默认后缀是什么
app.set('view engine','art')
//当渲染后缀为art的模板时，所使用的模板引擎是什么
app.engine('art',require('express-art-template'))
template.defaults.imports.dateFormat=dateFormat;
//引用路由模块
const home = require('./route/home.js');
const admin = require('./route/admin.js')




//拦截请求，判断用户登录状态
app.use('/admin',require('./middleware/loginGuard.js'))

app.use('/',home)
app.use('/admin',admin)



//传递错误信息
app.use((err,req,res,next)=>{
    //将字符串转换为对象
    //JSON.parse();
    const result = JSON.parse(err)
    let params = [];
    for(let attr in result){
        if(attr!='path'){
            params.push(attr+'='+result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`)
})


app.listen(80)

