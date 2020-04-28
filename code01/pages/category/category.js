// pages/category/category.js
var Category = require("../../Api/category.js")
var GoodsList = require("../../Api/goodsList.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        categoryList: ["手机", "电脑", "音响", "耳机", 
        "手机", "电脑", "音响", "耳机" ],
        conId:0,
        conicon:[
            {
                goodsImage: "../../image/goods01.jpg",
                goodsName:"巧克力奶"
            },
            {
                goodsImage: "../../image/goods02.jpg",
                goodsName: "威化饼干"
            },
            {
                goodsImage: "../../image/goods03.jpg",
                goodsName: "茶壶"
            },
            {
                goodsImage: "../../image/goods04.jpg",
                goodsName: "钥匙扣"
            },
            {
                goodsImage: "../../image/goods05.jpg",
                goodsName: "施华洛世奇JG925项链"
            },
            {
                goodsImage: "../../image/goods06.jpg",
                goodsName: "WIS极润保湿套装"
            },
            {
                goodsImage: "../../image/goods07.jpg",
                goodsName: "暖色鹿日系小清新衬衫"
            },
            {
                goodsImage: "../../image/goods08.jpg",
                goodsName: "仙蒂奈儿48色眼影盘"
            },
            
            
        ],
    },
    itemclick(event) {
        // 获取触发对象中data每个id数据
        var id = event.target.dataset.id;
        this.setData({
            conId: id
        });
        wx.setStorageSync("CategoryId", id)
        var _this = this;
        GoodsList.goodsListData(function (res) {
            var data = res.data.result;
            var arr = [];
            var list = [];
            data.forEach((item) => {
                arr.push({
                    id: item.id,
                    goodsName: item.name,
                    goodsImage: item.image,
                    goodsAddress: "广州",
                    goodsPrice: item.price,
                    type: item.type,
                    goodsContent: item.content,
                    goodsOldprice: item.oldprice
                })
            })
            if (_this.data.conId == 0) {
                list = arr.filter(item => item.type == "口红")
            } else if (_this.data.conId == 1) {
                list = arr.filter(item => item.type == "化妆品")
            } else if (_this.data.conId == 2) {
                list = arr.filter(item => item.type == "护肤品")
            } else if (_this.data.conId == 3) {
                list = arr.filter(item => item.type == "口罩")
            } else if (_this.data.conId == 4) {
                list = arr.filter(item => item.type == "零食")
            } else if (_this.data.conId == 5) {
                list = arr.filter(item => item.type == "用品")
            } else if (_this.data.conId == 6) {
                list = arr.filter(item => item.type == "首饰")
            } else if (_this.data.conId == 7) {
                list = arr.filter(item => item.type == "服装")
            }
            _this.setData({
                "conicon": list
            })

        })
    },
    getdetail(event){
        // console.log(event);
        var id = event.currentTarget.dataset.id;

        var goods = this.data.conicon[id]
        wx.setStorageSync("goodslist", goods);
        
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this;
        // 分类接口
        Category.categoryData(function(res){
            _this.setData({
                categoryList:res.data.result
            })
        })
        // console.log(this.data.categoryList)
        // 商品列表接口
        GoodsList.goodsListData(function (res) {
            var data = res.data.result;
            var arr = [];
            var list = [];
            data.forEach((item) => {
                arr.push({
                    id: item.id,
                    goodsName: item.name,
                    goodsImage: item.image,
                    goodsAddress: "广州",
                    goodsPrice: item.price,
                    type: item.type,
                    goodsContent: item.content,
                    goodsOldprice: item.oldprice
                })
            })
            if (_this.data.conId == 0){
                list = arr.filter(item=>item.type == "口红")
            } else if (_this.data.conId == 1){
                list = arr.filter(item => item.type == "化妆品")
            } else if (_this.data.conId == 2) {
                list = arr.filter(item => item.type == "护肤品")
            } else if (_this.data.conId == 3) {
                list = arr.filter(item => item.type == "口罩")
            } else if (_this.data.conId == 4) {
                list = arr.filter(item => item.type == "零食")
            } else if (_this.data.conId == 5) {
                list = arr.filter(item => item.type == "用品")
            } else if (_this.data.conId == 6) {
                list = arr.filter(item => item.type == "首饰")
            } else if (_this.data.conId == 7) {
                list = arr.filter(item => item.type == "服装")
            }
            _this.setData({
                "conicon": list
            })
            // console.log(_this.data.goodsList)
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
        // 通过跳转页面指定分类项
        var CategoryId = wx.getStorageSync("CategoryId");
        CategoryId = CategoryId?CategoryId:0
        // wx.getSystemInfo小程序所有信息
        var _this = this;
        wx.getSystemInfo({
            success: function(res) {
                // this.setData()页面数据同步
                _this.setData({
                    conId:CategoryId,
                    scrollHeight: res.windowHeight
                })
            },
        });
        // 商品接口
        var _this = this;
        GoodsList.goodsListData(function (res) {
            var data = res.data.result;
            var arr = [];
            var list = [];
            data.forEach((item) => {
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
            if (_this.data.conId == 0) {
                list = arr.filter(item => item.type == "口红")
            } else if (_this.data.conId == 1) {
                list = arr.filter(item => item.type == "化妆品")
            } else if (_this.data.conId == 2) {
                list = arr.filter(item => item.type == "护肤品")
            } else if (_this.data.conId == 3) {
                list = arr.filter(item => item.type == "口罩")
            } else if (_this.data.conId == 4) {
                list = arr.filter(item => item.type == "零食")
            } else if (_this.data.conId == 5) {
                list = arr.filter(item => item.type == "用品")
            } else if (_this.data.conId == 6) {
                list = arr.filter(item => item.type == "首饰")
            } else if (_this.data.conId == 7) {
                list = arr.filter(item => item.type == "服装")
            }
            _this.setData({
                "conicon": list
            })

        })
        
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