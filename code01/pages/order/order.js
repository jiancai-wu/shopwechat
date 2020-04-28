// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ordername:["全部订单","未支付","未签收","已完成"],
        orderId:0,
        ordergoodsLists:[]
    },
    // 循环数据
    itemclick(event){
        var id = event.target.dataset.id;
        this.setData({
            orderId: id
        })
        var ordergoods = wx.getStorageSync("ordergoodsList");
        if (ordergoods){
            if (this.data.orderId == 0) {
                var order = []
                ordergoods.forEach((item) => {

                    order.push(item);
                })
                this.setData({
                    ordergoodsLists: order
                })
            } else if (this.data.orderId == 1) {
                var order = []
                ordergoods.forEach((item) => {
                    if (item.typeId == 1) {
                        order.push(item)
                    }
                })
                this.setData({
                    ordergoodsLists: order
                })
            } else if (this.data.orderId == 2) {
                var order = []
                ordergoods.forEach((item) => {
                    if (item.typeId == 2) {
                        order.push(item)
                    }
                })
                this.setData({
                    ordergoodsLists: order
                })
            } else if (this.data.orderId == 3) {
                var order = []
                ordergoods.forEach((item) => {
                    if (item.typeId == 3) {
                        order.push(item)
                    }
                })
                this.setData({
                    ordergoodsLists: order
                })
            }
        }
        
    },
    // 点击操作是否支付/是否确认收货
    operatepay(event){
        var id = event.target.dataset.id;
        // console.log(this.data.ordergoodsLists)
        if(this.data.orderId == 0){
            if (this.data.ordergoodsLists[id].typeId == "1"){
                
                this.data.ordergoodsLists[id].type = "已支付";
                this.data.ordergoodsLists[id].typeId = "2";
                this.data.ordergoodsLists[id].btn = "确认签收";
            } else if (this.data.ordergoodsLists[id].typeId == "2") {
                this.data.ordergoodsLists[id].type = "已完成";
                this.data.ordergoodsLists[id].typeId = "3";
                this.data.ordergoodsLists[id].btn = "商品评价";
            }
            this.setData({
                ordergoodsLists: this.data.ordergoodsLists
            })
            wx.setStorageSync("ordergoodsList", this.data.ordergoodsLists);
            // wx.removeStorageSync("ordergoodsList")
        } else if (this.data.orderId == 1){
            var order = wx.getStorageSync("ordergoodsList");
            var index = order.findIndex(item => item.orderNumber == this.data.ordergoodsLists[id].orderNumber);
            
            this.data.ordergoodsLists[id].type = "已支付";
            this.data.ordergoodsLists[id].typeId = "2";
            this.data.ordergoodsLists[id].btn = "确认签收";
            order[index] = this.data.ordergoodsLists[id]
            this.data.ordergoodsLists.splice(id,1)
            // console.log(order);
            this.setData({
                ordergoodsLists: this.data.ordergoodsLists
            })
            // console.log(this.data.ordergoodsLists)
            wx.setStorageSync("ordergoodsList", order);
        } else if (this.data.orderId == 2){
            var order = wx.getStorageSync("ordergoodsList");
            var index = order.findIndex(item => item.orderNumber == this.data.ordergoodsLists[id].orderNumber);
            this.data.ordergoodsLists[id].type = "已完成";
            this.data.ordergoodsLists[id].typeId = "3";
            this.data.ordergoodsLists[id].btn = "商品评价";
            order[index] = this.data.ordergoodsLists[id]
            this.data.ordergoodsLists.splice(id, 1)
            // console.log(order);
            this.setData({
                ordergoodsLists: this.data.ordergoodsLists
            })
            // console.log(this.data.ordergoodsLists)
            wx.setStorageSync("ordergoodsList", order);
        }
    },
    del(event){
        // 内层循环的索引值
        var id = event.target.dataset.id;
        // 外层循环的索引值
        var rid = event.target.dataset.rid;
        var orderList = wx.getStorageSync('ordergoodsList');
        var index = orderList.findIndex(item => item.orderNumber == this.data.ordergoodsLists[rid].orderNumber )
        // console.log(index);
        if (this.data.ordergoodsLists[rid].goods.length == 1){
            this.data.ordergoodsLists.splice(rid,1);
            orderList.splice(rid,1);
        }else{
            this.data.ordergoodsLists[rid].goods.splice(id, 1);
            orderList[index].goods.splice(id, 1)
        }
        this.setData({
            ordergoodsLists:this.data.ordergoodsLists
        })
        wx.setStorageSync('ordergoodsList', orderList)
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
        var ordergoods = wx.getStorageSync("ordergoodsList")
        if (ordergoods){
            ordergoods.forEach((item)=>{
                this.data.ordergoodsLists.push(item);
            })
            this.setData({
                ordergoodsLists: this.data.ordergoodsLists
            })
        } 
        
        
        // console.log(ordergoods)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        this.setData({
            orderid:0
        });
        
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        wx.switchTab({
            url: '/pages/my/my',
        })
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