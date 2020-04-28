// pages/cart/cart.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        goodsList: [
            // {
            //     id: 1,
            //     carName: "商品名称",
            //     carImage: "../../image/goods01.jpg",
            //     carPrice: "111.00",
            //     carNum: 7
            // },
            // {
            //     id: 2,
            //     carName: "商品名称",
            //     carImage: "../../image/goods01.jpg",
            //     carPrice: "111.00",
            //     carNum: 1
            // },
            // {
            //     id: 3,
            //     carName: "商品名称",
            //     carImage: "../../image/goods01.jpg",
            //     carPrice: "111.00",
            //     carNum: 1
            // }
        ],
        totalPrice: 200,
        likeGoodsList:[
            {
                id: 5,
                goodsName: "施华洛世奇JG925项链",
                goodsImage: "../../image/goods05.jpg",
                goodsAddress: "广州",
                goodsPrice: '149',
                type: "首饰",
                goodsContent: "镶施华洛世奇锆 · JG925银心形项链镶施华洛世奇锆简约小众锁骨链森系生日礼物个性 K金色",
                goodsOldprice: '399',
            },
            {
                id: 4,
                goodsName: "钥匙扣",
                goodsImage: "../../image/goods04.jpg",
                goodsAddress: "广州",
                goodsPrice: '9.9',
                type: "用品",
                goodsContent: "带有装饰的钥匙扣",
                goodsOldprice: '19.9',
            },
            {
                id: 6,
                goodsName: "WIS极润保湿套装",
                goodsImage: "../../image/goods06.jpg",
                goodsAddress: "广州",
                goodsPrice: '149',
                type: "护肤品",
                goodsContent: "秋冬水乳护肤套装 · 极润保湿套装 补水保湿 温和清洁控油 4件套",
                goodsOldprice: '299',
            },
            {
                id: 7,
                goodsName: "暖色鹿日系小清新衬衫",
                goodsImage: "../../image/goods07.jpg",
                goodsAddress: "广州",
                goodsPrice: '89',
                type: "服装",
                goodsContent: "日系清新甜美减龄 · 韩版百搭ins超火青春甜美学院风复古港味POLO领设计感衬衫 白色 均码",
                goodsOldprice: '199',
            },
        ],
        isEmpty:false
    },
    // 减法计算
    carReduce(options) {
        // 获取id下标值
        // console.log(this.data.goodsList);
        var index = options.target.dataset.id;
        // console.log(index);
        var num = this.data.goodsList[index].carNum; //获取商品数量
        // 提前拼接路径
        var key = "goodsList[" + index + "].carNum";

        var obj = {};
        if (num <= 1) {
            obj[key] = 1;
        } else {
            num--; //数量减一
            obj[key] = num;
        }
        this.setData(obj);
        wx.setStorageSync("GoodsCarList", this.data.goodsList);
        
        // 调用onshow方法
        this.getTotalData();
        
    },
    // 加法计算
    carAdd(options) {
        var index = options.target.dataset.id;
        var num = this.data.goodsList[index].carNum + 1;
        var key = "goodsList[" + index + "].carNum";
        var obj = {};
        // 注意：不会影响原本data中其他对象数据
        obj[key] = num;
        this.setData(obj);
        wx.setStorageSync("GoodsCarList", this.data.goodsList);
        // 调用getTotalData方法
        console.log(wx.getStorageSync("GoodsCarList"))
        // console.log(this.data.goodsList)
        this.getTotalData();

    },

    // 删除功能
    carDel(options) {
        var index = options.target.dataset.id;
        this.data.goodsList.splice(index, 1);
        this.setData({
            goodsList: this.data.goodsList
        })
        wx.setStorageSync("GoodsCarList", this.data.goodsList);
        console.log(this.data.goodsList);
        var getCardata = wx.getStorageSync('GoodsCarList');
        if (getCardata.length == 0) {
            this.setData({
                isEmpty: false
            })
        } else {
            this.setData({
                isEmpty: true
            })
        }
        // 调用onshow方法
        this.getTotalData();
    },
    // 回到首页
    getindex(){
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    // 跳转支付页面
    getPay(){
        wx.navigateTo({
            url:"/pages/pay/pay?type=cart",
        })
        
        var time = new Date().getTime();
        var goodsCart = wx.getStorageSync('GoodsCarList');
        
        goodsCart.forEach(item=>{
            item["orderTime"] = "订单号:" + time;
        })
        wx.setStorageSync('GoodsCarList', goodsCart);
        this.setData({
            goodsList: goodsCart
        })
        
        
        var goodsLists = [];
        this.data.goodsList.forEach((item)=>{
            var orderLists = {
                
                id: item.id,
                gooodsName: item.carName,
                goodsImage: item.carImage,
                goodsPrice: item.carPrice,
                goodsNum: item.carNum
            }
            goodsLists.push(orderLists);
        })
        var ordergoodsList =
            {
                orderNumber: "订单号:" + time,
                type: "未支付",
                typeId: "1",
                btn: "点击支付",
                goods: goodsLists
            }

        var orderList = wx.getStorageSync("ordergoodsList");
        if (orderList) {
            orderList.push(ordergoodsList);
            wx.setStorageSync("ordergoodsList", orderList);
        } else {
            wx.setStorageSync("ordergoodsList", [ordergoodsList])
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
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
        // 获取缓存数据
        var getCardata = wx.getStorageSync('GoodsCarList');
        this.setData({
            goodsList: getCardata
        })
        if (getCardata.length == 0) {
            this.setData({
                isEmpty: false
            })
        } else {
            this.setData({
                isEmpty: true
            })
        }
        this.getTotalData();
        
        
    },
    // 计算总价格的方法
    getTotalData(){
        
        // 计算总价格
        var totalData = 0;
        for (var i = 0; i < this.data.goodsList.length; i++) {
            totalData += parseFloat(this.data.goodsList[i].carPrice) * parseInt(this.data.goodsList[i].carNum);
        }
        totalData = totalData.toFixed(2)
        this.setData({
            totalPrice: totalData
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        wx.setStorageSync("GoodsCarList", this.data.goodsList);
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