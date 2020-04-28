var Category = require("../../Api/category.js")
var GoodsList = require("../../Api/goodsList.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        indicatorDots:true,
        interval:3000,
        duration:300,
        imgs:[
            "../../image/goods05.jpg",
            "../../image/goods13.jpg",
            "../../image/goods17.jpg"
        ],
        category:[
            {
                id:0,
                img:"../../image/icon-qiandao.png",
                txt:"签到"
            },
            {
                id: 1,
                img:"../../image/icon-fujin.png",
                txt:"附近"
            },
            {
                id: 2,
                img:"../../image/icon-zhanhui.png",
                txt:"展会"
            },
            {
                id: 3,
                img:"../../image/icon-fuli.png",
                txt:"福利"
            },
            {
                id: 4,
                img:"../../image/icon-muma.png",
                txt:"玩乐"
            },
            {
                id: 5,
                img:"../../image/icon-tiyu.png",
                txt:"体育"
            },
            {
                id: 6,
                img:"../../image/icon-xingxing.png",
                txt:"周边"
            },
            {
                id: 7,
                img:"../../image/icon-qinzi.png",
                txt:"亲子"
            },
        ],
        goodsList:[
            {
                id:1,
                goodsName:"巧克力奶",
                goodsContent:"显白限定车厘子色·dior红管口红 #851 ULTRA SHOCK",
                goodsImage:"../../image/goods01.jpg",
                goodsAddress:"广州",
                goodsPrice:"59.00"
            },
            {
                id:2,
                goodsName:"威化饼干",
                goodsContent: "显白限定车厘子色·dior红管口红 #851 ULTRA SHOCK",
                goodsImage:"../../image/goods02.jpg",
                goodsAddress:"广州",
                goodsPrice:"29.90"
            },
            {
                id:3,
                goodsName:"茶壶",
                goodsContent: "显白限定车厘子色·dior红管口红 #851 ULTRA SHOCK",
                goodsImage:"../../image/goods03.jpg",
                goodsAddress:"广州",
                goodsPrice:"299.00"
            },
            {
                id:4,
                goodsName:"钥匙扣",
                goodsContent: "显白限定车厘子色·dior红管口红 #851 ULTRA SHOCK",
                goodsImage:"../../image/goods04.jpg",
                goodsAddress:"广州",
                goodsPrice:"9.90"
            },
        ]
    },
    getCategory(options){
        var id = options.target.dataset.id;  //获取id
        wx.setStorageSync("CategoryId", id);
        wx.switchTab({
            url: '/pages/category/category',
        })
    },
    getDetail(options){
        var index = options.currentTarget.dataset.id;
        wx.setStorageSync("goodslist", this.data.goodsList[index]);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this;
        // 分类接口
        Category.categoryData(function(res){
            _this.setData({
                category:res.data.result
            })
        });
        // 商品列表接口
        GoodsList.goodsListData(function(res){
            var data = res.data.result;
            var arr = [];
            data.forEach((item)=>{
                arr.push({
                    id: item.id,
                    goodsName: item.name,
                    goodsImage: item.image,
                    goodsAddress: "广州",
                    goodsPrice: item.price,
                    type: item.type,
                    goodsContent: item.content,
                    goodsOldprice: item.oldprice,

                })
            })
            _this.setData({
                "goodsList":arr
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        
    }
})