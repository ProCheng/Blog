//导入用户集合构造函数
const {User} = require('../../model/user.js')
//导入bcrypt
const bcrypt = require('bcrypt')

module.exports = async (req,res)=>{
    const {email,password}=req.body;
    if(email.trim().length==0||password.trim().length==0){
        return res.status(400).render('admin/error.art',{msg:'邮箱地址或者密码错误'});
    }
    let user=await User.findOne({email:email})
    if(user){
        //将密码进行比对
        let isValid = await bcrypt.compare(password,user.password);
        if(isValid){
            //将用户名存储在请求对象中
            req.session.username=user.username;
            //将用户角色存储在session对象中
            req.session.role=user.role;

            //模板中的引擎模块中加入一个共有属性，用户信息
            req.app.locals.userInfo=user;
            if(user.role=='admin'){
                //重定向到用户列表页面
                res.redirect('/admin/user')
            }else{
                //重定向到博客首页
                res.redirect('/home')
            }

            
        }else{
            res.status(400).render('admin/error',{msg:'邮箱地址或者密码错误'})
        }
    }else{
        res.status(400).render('admin/error',{msg:'邮箱地址或者密码错误'})
    }
    
}
