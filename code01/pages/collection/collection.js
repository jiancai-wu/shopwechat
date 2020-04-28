// pages/collection/collection.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsList:[
            // {
            //     id: 1,
            //     goodsName: "巧克力奶",
            //     goodsImage: "../../image/goods01.jpg",
            //     goodsAddress: "广州",
            //     goodsPrice: "59.00"
            // },
        ],
        likeGoodsList: [
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
        isEmpty: false
    },
    // 去详情页
    getDetail(options) {
        var index = options.currentTarget.dataset.id;

        wx.setStorageSync("goodslist", this.data.goodsList[index]);
    },
    // 删除
    delcollect(options){
        
        var index = options.currentTarget.dataset.id;
        this.data.goodsList.splice(index,1);
        this.setData({
            goodsList:this.data.goodsList
        })
        
        wx.setStorageSync("collectionlists", this.data.goodsList)
        var collectionlists = wx.getStorageSync('collectionlists');

        if (collectionlists.length == 0) {
            this.setData({
                isEmpty: false
            })
        } else {
            this.setData({
                isEmpty: true
            })
        }
    },
    // 回到首页
    getindex() {
        wx.switchTab({
            url: '/pages/index/index',
        })
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
        var collectionlists = wx.getStorageSync("collectionlists");
        this.setData({
            goodsList: collectionlists
        })
        // 获取缓存数据
        var collectionlists = wx.getStorageSync('collectionlists');
        
        if (collectionlists.length == 0) {
            this.setData({
                isEmpty: false
            })
        } else {
            this.setData({
                isEmpty: true
            })
        }

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