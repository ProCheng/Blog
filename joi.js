//引入joi模块
const Joi = require('joi')
//定义对象的验证规则

const Schema={
    username:Joi.string().min(2).max(5).error(new Error('请输入2-5个字符'))
};

async function run() { 
    //实施验证
   try {
        await Joi.validate({username:'a'},Schema);
   } catch (error) {
       console.log(error.message)
   }
   console.log('验证通过')

 }
run()