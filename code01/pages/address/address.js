// pages/address/address.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressList:[
            {
                username: "李四",
                usertel:"13022221111",
                addressdetail:"广东省惠州市惠阳区飞蛾路222号"
            }
        ]
    },
    addAddress(){
        wx.navigateTo({
            url: '/pages/addAddress/addAddress',
        })
    },
    address(event){
        
        var id = event.currentTarget.dataset.id;
        const pages = getCurrentPages()
        
        const prevPage = pages[pages.length - 2] // 上一页
        // // 调用上一个页面的setData 方法，将数据存储
        prevPage.setData({
            id: id
        })
        // console.log(prevPage)
        // // 返回上一页
        wx.navigateBack({
            delta: 1
        })
        // wx.navigateTo({
        //     url: '/pages/pay/pay?id='+id,
        // })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var addressLists = wx.getStorageSync('addressList');
        if (!addressLists){
            wx.setStorageSync('addressList', this.data.addressList)
        }
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
        var addressLists = wx.getStorageSync("addressList");
        this.setData({
            addressList: addressLists
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
    onUnload: function (options) {
        
        // wx.reLaunch({
        //     url: '/pages/order/order',
        // })
        // wx.navigateBack(
        //     {
        //         delta: 2
        //     }
        // )
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