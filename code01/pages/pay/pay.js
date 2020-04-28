// pages/pay/pay.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        totalPrice:0,
        good_list:[],
        address:[
            {
                username: "李四",
                usertel: "13022221111",
                addressdetail: "广东省惠州市惠阳区飞蛾路222号"
            }
        ],
        id:0,
        type:"",
    },
    getPay(){
        wx.navigateTo({
            url: '/pages/order/order',
        });
        console.log("111")
        if(this.data.type == 'cart'){
            wx.removeStorageSync('GoodsCarList');
        }
        var orderList = wx.getStorageSync('ordergoodsList');
        var index = orderList.findIndex((item)=>
            item.orderNumber == this.data.good_list[0].orderTime
        )
        orderList[index].type = "已支付";
        orderList[index].typeId = "2";
        orderList[index].btn = "确认签收";
        wx.setStorageSync('ordergoodsList', orderList);
        
        // console.log(order)
    },
    getAddress(){
        wx.navigateTo({
            url: '/pages/address/address',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function ({type}) {
        var good_list =[];
        var totalData = 0;
        if (type == 'cart'){
            good_list = wx.getStorageSync("GoodsCarList");
            for (var i = 0; i < good_list.length; i++) {
                totalData = totalData + good_list[i].carPrice * good_list[i].carNum;
                
            }
            totalData = totalData.toFixed(2);
            this.setData({
                good_list,
                totalPrice: totalData,
                type:"cart"
            })
        }else if(type == "detail"){
            good_list = wx.getStorageSync("GoodsDetail");
            for (var i = 0; i < good_list.length; i++) {
                totalData = totalData + good_list[i].carPrice * good_list[i].carNum;
            }
            this.setData({
                good_list,
                totalPrice: totalData,
                type: "detail"
            })
        }
        var addressList = wx.getStorageSync('addressList')
        if (!addressList){
            wx.setStorageSync('addressList', this.data.address);
        }
        this.data.address = addressList[this.data.id];

        this.setData({
            address: this.data.address
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
        const pages = getCurrentPages()
        const currPage = pages[pages.length - 1]  // 当前页
        // console.log(currPage.data)  // data中会含有testdata
        this.setData({
            id: currPage.data.id
        })
        var addressList = wx.getStorageSync('addressList')
        this.data.address = [addressList[this.data.id]];
        this.setData({
            address: this.data.address
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
        wx.switchTab({
            url: '/pages/my/my',
        })
        console.log("222");
        if (this.data.type == 'cart') {
            wx.removeStorageSync('GoodsCarList');
        }
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