var {url} = require("./config.js");

// 自定义方法,请求api接口
function categoryData(callback){
// 请求分类接口数据
wx.request({
    url: `${url}category`,
    header:{
    'content-type':'application/json'  //默认值
    },
    success(res){
    callback(res);
    }
})
};

// module.exports导入方法对象
module.exports.categoryData = categoryData;