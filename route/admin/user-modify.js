const {User} = require('../../model/user')
const bcrypt = require('bcrypt')
const {validateUser} = require('../../model/user')

module.exports=async (req,res,next)=>{

    //接受客户端传递过来的请求参数
    const {username,email,role,state,password} = req.body

    //判断用户输入是否合法
    try {
       await validateUser({username:username,role:role,email:email,state:state,password:'abcdef'})
    } catch (e) {
        return next(JSON.stringify({path:'/admin/user-edit',message:e.message,id:req.query.id}));
       
    }


    //即将要修改的用户id
    const id = req.query.id

    let user = await User.findOne({_id:id});
    const isValid = await bcrypt.compare(password,user.password);
    if(isValid){
        // console.log('比对成功')
        // 将用户信息跟新到数据库中
        await User.updateOne({_id:id},{
            username:username,
            email:email,
            role:role,
            state:state,
        });
        //将页面重定向到用户列表页面
        res.redirect('/admin/user')

    }else{
        //密码比对失败
        let obj = {path:'/admin/user-edit',message:'密码比对失败，无法修改',id:id}
        next(JSON.stringify(obj))
    }
    // res.send(user)
}