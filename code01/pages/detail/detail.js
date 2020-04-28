// pages/details/details.js
var GoodsList = require("../../Api/goodsList.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        indicatorDots: true,
        interval: 3000,
        duration: 300,
        imgs: [
            "../../image/goods01.jpg",
            "../../image/goods02.jpg",
            "../../image/goods03.jpg",
        ],
        goods: [
            // {
            //     id: 2,
            //     goodsName: "商品名称",
            //     goodsImage: "../../image/goods02.jpg",
            //     goodsImgs: [
            //         "../../image/goods01.jpg",
            //         "../../image/goods02.jpg",
            //         "../../image/goods03.jpg",
            //     ],
            //     goodsPrice: "210",
            //     goodsPriceOld: "300",
            //     goodsDetails: "../../image/IMG_0466.JPG"
            // }
        ],
        num: 0,
        collect:{
            img:"../../image/icon-aixin1.png",
            text:"未收藏"
        },
        iscollect:false
    },


    // 数据缓存
    // 同步数据  数据量小，直接使用同步操作可以。
    // wx.setStorageSync    添加数据
    // wx.removeStorageSync 删除数据
    // wx.getStorageSync    获取数据
    // wx.clearStorageSync  清空数据
    // wx.getStorageInfoSync 获取信息数据

    // 异步数据 数据量大，需要进行计算使用异步操作
    // wx.setStorage       添加数据
    // wx.removeStorage    删除数据
    // wx.getStorageInfo   获取信息数据
    // wx.getStorage       获取数据
    // wx.clearStorage     清空数据
    // 添加购物车
    getCarNum() {

        var CarData = {
            id: this.data.goods[0].id,
            carName: this.data.goods[0].goodsName,
            carImage: this.data.goods[0].goodsImage,
            carPrice: this.data.goods[0].goodsPrice,
            carNum: 1
        }


        // 1.判断数据缓存中是否有数据
        var GoodsCarList = wx.getStorageSync("GoodsCarList");
        if (GoodsCarList) {

            var isGoodsData = true; //默认值代表状态，有数据，没有相同id
            // 1.1有数据，相同商品数据，数量加一
            for (var i = 0; i < GoodsCarList.length; i++) {
                if (GoodsCarList[i].id == this.data.goods[0].id) {
                    GoodsCarList[i].carNum += 1;
                    isGoodsData = false;
                }
            }
            // 1.2有数据，数据中没有相同id数据，数组中追加数据
            if (isGoodsData) {
                // 把新商品添加购物车
                GoodsCarList.push(CarData);
                isGoodsData = true;
            }

            wx.setStorageSync("GoodsCarList", GoodsCarList);
        } else {
            // 1.3没有数据,添加数据
            wx.setStorageSync("GoodsCarList", [CarData])
        }


        this.setData({
            num: wx.getStorageSync("GoodsCarList").length
        })
        // wx.removeStorageSync("GoodsCarList")
    },
    // 跳转到购物车页面
    getCart(){
        wx.switchTab({
            url: '/pages/cart/cart',
        })
    },
    getIndex(){
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    // 前往支付页面
    getpay(){
        var time = new Date().getTime()
        var GoodsDetail = [
            {
                orderTime: "订单号:" + time,
                id:this.data.goods[0].id,
                carName: this.data.goods[0].goodsName,
                carImage: this.data.goods[0].goodsImage,
                carPrice: this.data.goods[0].goodsPrice,
                carNum:1
            }
        ]
        wx.setStorageSync("GoodsDetail", GoodsDetail);
        wx.navigateTo({
            url: '/pages/pay/pay?type=detail',
        });
        var goodsList = 
            {
                orderNumber: "订单号:" + time,
                type: "未支付",
                typeId: "1",
                btn: "点击支付",
                goods:[{
                    id: this.data.goods[0].id,
                    gooodsName: this.data.goods[0].goodsName,
                    goodsImage: this.data.goods[0].goodsImage,
                    goodsPrice: this.data.goods[0].goodsPrice,
                    goodsNum: 1
                }]
            };
        var orderList = wx.getStorageSync("ordergoodsList");
        if(orderList){
            orderList.push(goodsList);
            wx.setStorageSync("ordergoodsList", orderList);
        }else{
            wx.setStorageSync("ordergoodsList", [goodsList]);
        }
        
    },
    iscollect(){
        // 获取全局变量goods
        var goodslist = this.data.goods[0];
        var collectionlist = {
            id: goodslist.id,
            goodsName: goodslist.goodsName,
            goodsImage: goodslist.goodsImage,
            goodsImgs: goodslist.goodsImgs,
            goodsPrice: goodslist.goodsPrice,
            goodsPriceOld: goodslist.goodsPriceOld,
            goodsContent: goodslist.goodsContent,
            goodsDetails: goodslist.goodsDetails
        }
        var collectLists = wx.getStorageSync("collectionlists");
        // 获取索引值
        if (collectLists){
            var index = collectLists.findIndex(item => item.id == this.data.goods.id);
        }
        if (!this.data.iscollect){
            this.data.collect = {
                img: "../../image/icon-aixin.png",
                text: "已收藏"
            }
            this.data.iscollect = true;
            if(collectLists){
                if (index == -1) {
                    collectLists.push(collectionlist);
                }
            }else{
                wx.setStorageSync("collectionlists", []);
                collectLists = wx.getStorageSync("collectionlists");
                collectLists.push(collectionlist);
            }
            
            

        }else{
            this.data.collect = {
                img: "../../image/icon-aixin1.png",
                text: "未收藏"
            }
            this.data.iscollect = false;
            collectLists.splice(index,1);

        }
        this.setData({
            collect:this.data.collect
        })
        wx.setStorageSync("collectionlists", collectLists)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function ({id}) {
        // 通过跳转路由获取id
        // 请求商品数据
        
        var _this = this;
        GoodsList.goodsListIdData(id,function({data}){
            _this.setData({
                goods:[
                    {
                        id: data.result.id,
                        goodsName: data.result.name,
                        goodsImage: data.result.image,
                        goodsImgs: data.result.imgs,
                        goodsPrice: data.result.price,
                        goodsPriceOld: data.result.oldprice,
                        goodsContent: data.result.content,
                        goodsDetails: [data.result.image,
                            "../../image/detail01.jpg", 
                            "../../image/detail02.jpg", 
                            "../../image/detail03.jpg"]
                    }
                ]
            })
            wx.setStorageSync("goodslist", _this.data.goods);
                // 获取缓存的数据
            var collectLists = wx.getStorageSync("collectionlists");
            // 判断collectLists是否有值
            var iscollected = true; //默认值代表状态，有数据，没有相同id
            // 1.1有数据，相同商品数据，数量加一
            if(collectLists){
                for (var i = 0; i < collectLists.length; i++) {
                    if (collectLists[i].id == _this.data.goods[0].id) {
                        iscollected = false;
                        _this.data.iscollect = true;
                        _this.data.collect = {
                            img: "../../image/icon-aixin.png",
                            text: "已收藏"
                        }
                        _this.setData({
                            collect: _this.data.collect
                        })
                    }
                }
            }
        })
        var goodsCarList = wx.getStorageSync('GoodsCarList');
        this.data.num = goodsCarList.length;
        this.setData({
            num:this.data.num
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