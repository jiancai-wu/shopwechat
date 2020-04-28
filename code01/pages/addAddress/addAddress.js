// pages/addAddress/addAddress.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name:"",
        tel:"",
        addressDetail:""
    },
    inpname(event){
        this.setData({
            name:event.detail.value
        })
    },
    inptel(event){
        this.setData({
            tel: event.detail.value
        })
    },
    // 
    inpdetail(event){
        this.setData({
            addressDetail: event.detail.value
        })
    },
    // 保存数据
    save(){
        if (this.data.name != "" && this.data.tel != "" && this.data.addressDetail != "" ){
            wx.navigateBack({
                delta: 1
            })
            var addressList = {
                username: this.data.name,
                usertel: this.data.tel,
                addressdetail: this.data.addressDetail,
            }
            var addressLists = wx.getStorageSync("addressList");
            if (addressLists) {
                addressLists.push(addressList);
                wx.setStorageSync("addressList", addressLists)
            } else {
                wx.setStorageSync("addressList", [addressList])
            }
        }
        // wx.removeStorageSync('addressList')
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