//引用express框架
const express = require('express')


//创建博客展示页面路由
const admin =  express.Router();

//渲染登录功能
admin.get('/login',require('./admin/loginPage.js'))

//实现登录功能
admin.post('/login',require('./admin/login.js'))

//创建用户列表路由
admin.get('/user',require('./admin/userPage.js'))

//实现退出功能
admin.get('/logout',require('./admin/logout.js'))

//创建用户编辑页面路由
admin.get('/user-edit',require('./admin/user-edit.js'))

//创建实现用户添加功能路由
admin.post('/user-edit',require('./admin/user-edit-fn.js'))
//实现用户修改功能路由
admin.post('/user-modify',require('./admin/user-modify.js'))

//删除用户功能路由
admin.get('/delete',require('./admin/user-delete'))

//文章列表页面路由
admin.get('/article',require('./admin/article'))

//文章编辑页面路由
admin.get('/article-edit',require('./admin/article-edit'))

//实现文章添加功能的路由
admin.post('/article-add',require('./admin/article-add'))

// admin.get('/user-edit',(req,res)=>{
//     res.render('admin/user-edit')
// })
// admin.get('/article',(req,res)=>{
//     res.render('admin/article')
// })
// admin.get('/article-edit',(req,res)=>{
//     res.render('admin/article-edit')
// })
module.exports=admin;

