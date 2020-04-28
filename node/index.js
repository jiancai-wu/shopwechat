// 项目管理包
// $npm init -y 
// 后端内容node.js
// $cnpm i express -S

// 安装依赖包
// cnpm i

// 启动服务器
// $node index.js

var express = require("express");
var app = express();

// 创建静态目录./dist,默认访问index.html文件
app.use(express.static("./dist"));


//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

// req 客户端向服务器数据响应
// res 服务器向客户端数据响应
// get() 数据请求get请求post请求
// post()
// "/" 路由操作
// http://127.0.0.1:3000/
app.get("/",function(req,res){
    // 返回字符串 send()方法
    res.send("你好");
})

// 请求数据接口APi，获取数据
// http://127.0.0.1:3000/goodsApi
app.get("/goodsApi",function(req,res){
    // 返回对象 json()方法
    res.json({name:"商品名称",price:"22",num:1})
})
// 在服务器中定义变量，重启服务器会被初始化
var userList = [];//全局数据变量
// 先注册用户，在登陆用户

// 登陆接口
// http://127.0.0.1:3000/login
app.get("/login",function(req,res){
    console.log(req.query);
    let {username,password} = req.query;
    if(username == "" && password == ""){
        return; //终止路由操作
    }

    // 1.通过前端传递登陆信息
    // 2.使用前台登陆用户名，在后台中userList匹配到相同用户名密码，找到为登陆成功，找不到登陆失败
    
    // 使用前台用户名找userlist对象数据，对比密码
    let data = userList.find(item=>item.username == username);//返回对象
    console.log("返回对象",data);
    // 判断密码是否相同
    if( data && data.password == password){
        res.send("200");
    }else{
        res.send("201");
    }

})

// 注册接口
// http://127.0.0.1:3000/register
// http://127.0.0.1:3000/register?username=zhangsan&password=123123&password2=123123
app.get("/register",function(req,res){
    // req.query获取get请求传递数据
    console.log(req.query);
    // 判断数据
    let {username,password,password2} = req.query;
    if(username != "" && password == password2 && password != ""){
        console.log("注册成功");
        userList.push({username,password});
        res.send("200");
    }else{
        res.send("201");
    }
})


let result = [
    {
        id:5,
        name:"施华洛世奇JG925项链",
        content:"镶施华洛世奇锆 · JG925银心形项链镶施华洛世奇锆简约小众锁骨链森系生日礼物个性 K金色",
        price:'149',
        oldprice:'399',
        image:"../../image/goods05.jpg",
        imgs:[
            "../../image/goods05.jpg",
            "../../image/goods06.jpg",
            "../../image/goods07.jpg"
        ],
        categroyId:4,
        type:"首饰"

    },
    {
        id:1,
        name:"巧克力奶",
        price:'54.9',
        oldprice:'89.9',
        content:"OATLY噢麦力巧克力原味燕麦奶进口植物奶蛋白饮料早餐奶250ml装",
        image:"../../image/goods01.jpg",
        imgs:[
            "../../image/goods01.jpg",
            "../../image/goods02.jpg",
            "../../image/goods03.jpg"
        ],
        categroyId:0,
        type:"零食"
    },
    {
        id:6,
        name:"WIS极润保湿套装",
        price:'169',
        oldprice:'299',
        content:"秋冬水乳护肤套装 · 极润保湿套装 补水保湿 温和清洁控油 4件套",
        image:"../../image/goods06.jpg",
        imgs:[
            "../../image/goods06.jpg",
            "../../image/goods07.jpg",
            "../../image/goods08.jpg"
        ],
        categroyId:5,
        type:"护肤品"
    },
    {
        id:4,
        name:"钥匙扣",
        price:'9.9',
        oldprice:'19.9',
        content:"带有装饰的钥匙扣",
        image:"https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1575882086.62224334.jpg",
        image:"../../image/goods04.jpg",
        imgs:[
            "../../image/goods04.jpg",
            "../../image/goods05.jpg",
            "../../image/goods06.jpg"
        ],
        categroyId:3,
        type:"用品"
    },
    {
        id:7,
        name:"暖色鹿日系小清新衬衫",
        price:'89',
        oldprice:'199',
        content:"日系清新甜美减龄 · 韩版百搭ins超火青春甜美学院风复古港味POLO领设计感衬衫 白色 均码",
        image:"../../image/goods07.jpg",
        imgs:[
            "../../image/goods07.jpg",
            "../../image/goods08.jpg",
            "../../image/goods09.jpg"
        ],
        categroyId:6,
        type:"服装"
    },
    {
        id:2,
        name:"嘉顿威化饼干",
        price:'24.8',
        oldprice:'59.9',
        content:"嘉顿威化饼干200g*3袋巧克力花生牛奶早餐零食威化饼",
        image:"../../image/goods02.jpg",
        imgs:[
            "../../image/goods02.jpg",
            "../../image/goods03.jpg",
            "../../image/goods04.jpg"
        ],
        categroyId:1,
        type:"零食"
    },
    {
        id:8,
        name:"仙蒂奈儿48色眼影盘",
        price:'49',
        oldprice:'159',
        content:"神仙48色眼影盘 · 48土豆泥眼影盘ins超火独角兽闪粉大地色珠光防水女哑光平价彩妆 48色",
        image:"../../image/goods08.jpg",
        imgs:[
            "../../image/goods08.jpg",
            "../../image/goods09.jpg",
            "../../image/goods10.jpg"
        ],
        categroyId:7,
        type:"化妆品"
    },
    {
        id:9,
        name:"许霸霸手绘帆布鞋",
        price:'55',
        oldprice:'99',
        content:"许霸霸手绘帆布鞋 · 鮀品漫画帆布鞋女鞋子ulzzang学生小白鞋2020新款春季百搭高帮鞋 白色 36",
        image:"../../image/goods09.jpg",
        imgs:[
            "../../image/goods09.jpg",
            "../../image/goods10.jpg",
            "../../image/goods11.jpg"
        ],
        categroyId:8,
        type:"服装"
    },
    {
        id:10,
        name:"老奶奶面膜",
        price:'24',
        oldprice:'59',
        content:"俄国好用平价面膜 · 阿卡菲奶奶的秘方水洗式老奶奶面膜 100ml 抗氧舒缓 紫色 ×3",
        image:"../../image/goods10.jpg",
        imgs:[
            "../../image/goods10.jpg",
            "../../image/goods11.jpg",
            "../../image/goods12.jpg"
        ],
        categroyId:9,
        type:"护肤品"
    },
    {
        id:3,
        name:"茶壶",
        price:'158',
        oldprice:'398',
        content:"轻奢时尚精致实用 · 下午茶茶壶",
        image:"../../image/goods03.jpg",
        imgs:[
            "../../image/goods03.jpg",
            "../../image/goods04.jpg",
            "../../image/goods05.jpg"
        ],
        categroyId:2,
        type:"用品"
    },
    {
        id:11,
        name:"银链",
        price:'149',
        oldprice:'359',
        content:"可以戴的福牌 · 吉祥祝福本命年足金999圆形福字吊坠搭配s925银链",
        image:"../../image/goods11.jpg",
        imgs:[
            "../../image/goods11.jpg",
            "../../image/goods12.jpg",
            "../../image/goods13.jpg"
        ],
        categroyId:10,
        type:"首饰"
    },
    {
        id:12,
        name:"完美日记斩男复古酒红色口红",
        price:'49.9',
        oldprice:'99.9',
        content:"斩男复古酒红色 · 雾色梦境哑光唇釉 909 小圆舞曲",
        image:"../../image/goods12.jpg",
        imgs:[
            "../../image/goods12.jpg",
            "../../image/goods13.jpg",
            "../../image/goods14.jpg"
        ],
        categroyId:11,
        type:"口红"
    },
    {
        id:13,
        name:"自然旋律身体乳",
        price:'24',
        oldprice:'59',
        content:"网红去鸡皮身体乳 · 去鸡皮温和果酸身体乳 300g",
        image:"../../image/goods13.jpg",
        imgs:[
            "../../image/goods13.jpg",
            "../../image/goods14.jpg",
            "../../image/goods15.jpg"
        ],
        categroyId:12,
        type:"护肤品"
    },
    {
        id:14,
        name:"AGE 20'S BB霜气垫",
        price:'158',
        oldprice:'199',
        content:"BB霜气垫 · AGE 20'S BB霜气垫遮瑕保湿粉底 带替换装14G*2 #23 自然色",
        image:"../../image/goods14.jpg",
        imgs:[
            "../../image/goods14.jpg",
            "../../image/goods15.jpg",
            "../../image/goods16.jpg"
        ],
        categroyId:13,
        type:"化妆品"
    },
    {
        id:15,
        name:"一次性医用口罩",
        price:'29.9',
        oldprice:'59.9',
        content:"现货直发 · 一次性口罩医用医护成人三层防护现货医疗防尘透气加厚10只装",
        image:"../../image/goods15.jpg",
        imgs:[
            "../../image/goods15.jpg",
            "../../image/goods16.jpg",
            "../../image/goods17.jpg"
        ],
        categroyId:14,
        type:"口罩"
    },
    {
        id:16,
        name:"车厘子色·dior红管口红",
        price:'369',
        oldprice:'599',
        content:"显白限定车厘子色·dior红管口红 #851 ULTRA SHOCK",
        image:"../../image/goods16.jpg",
        imgs:[
            "../../image/goods16.jpg",
            "../../image/goods17.jpg",
            "../../image/goods01.jpg"
        ],
        categroyId:15,
        type:"口红"
    },
    {
        id:17,
        name:"提升肌肤感光感小白瓶礼盒",
        price:'239',
        oldprice:'399',
        content:"新风尚Olay水感透白光塑精华30ml+Olay水感透白光塑精华6ml*2+Olay水感透白光塑钻弹力面膜2P",
        image:"../../image/goods17.jpg",
        imgs:[
            "../../image/goods17.jpg",
            "../../image/goods01.jpg",
            "../../image/goods02.jpg"
        ],
        categroyId:16,
        type:"护肤品"
    },
];
// 商品数据接口
// http://127.0.0.1:3000/goodsList
app.get("/goodsList",(req,res)=>{
    res.json({code:200,result});
})

// 通过id获取商品
// http://127.0.0.1:3000/goodsList/1
app.get("/goodsList/:id",(req,res)=>{
    let data = result.find(item=>item.id == req.params.id);
    res.json({code:200,result:data});
})


// 分类接口
app.get("/category",(req,res)=>{
    var result = [
        {
            id:0,
            img: "../../image/category01.png",
            txt:"口红"
        },
        {
            id:1,
            img: "../../image/category02.png",
            txt:"化妆品"
        },
        {
            id:2,
            img: "../../image/category03.png",
            txt:"护肤品"
        },
        {
            id:3,
            img: "../../image/category04.png",
            txt:"口罩"
        },
        {
            id:4,
            img: "../../image/category05.png",
            txt:"零食"
        },
        {
            id:5,
            img: "../../image/category06.png",
            txt:"用品"

        },
        {
            id:6,
            img: "../../image/category07.png",
            txt:"首饰"
        },
        {
            id:7,
            img: "../../image/category08.png",
            txt:"服装"
        }
    ]
    res.json({code:200,result})
})






app.listen(3000,()=>{
    console.log("请访问:http://127.0.0.1:3000");
})