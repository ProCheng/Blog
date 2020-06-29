//导入bcrypt
const bcrypt = require('bcrypt')
//生成随机字符串
//genSalt方法接受一个数值作为参数
//数值越大，生成的随机字符串复杂度越高，反之亦然
//默认值是10
//返回生成的随机字符串
async function run(){
    const salt=await bcrypt.genSalt(10)
    //对密码进行加密
    //1.要加密的明文
    //2.随机字符串
    //返回值是加密后的密码
    const result = await bcrypt.hash('123456',salt);
    console.log(salt)
    console.log(result)
}
run();



