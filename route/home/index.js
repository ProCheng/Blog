const {Article} =  require('../../model/article')
//导入分页模块
const pagination = require('mongoose-sex-page')
module.exports=async (req,res)=>{

    const page= req.query.page;

    //从数据库中查询数据
    let result = await pagination(Article).find().page(page).size(4).display(5).populate('author').exec();
    
    res.render('home/default',{
        result:result,
        
    })
}