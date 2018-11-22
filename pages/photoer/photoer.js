// pages/photoer/photoer.js

var savedImagePath = "";
var titleHeight = 100;
var X = 30;
var Y = 90;
var TABLE_MARGIN = 20;
var MARGIN_TOP_BELOW_DIVIDER = 20;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        
        showOrderEditModal: false,
        orderDate:"2018-01-01",
        orderDateCN: "2018年1月1日",
        isShowCanvas: false,
        isEditOrder: false,
        tableWidth: 0,
        tableHegiht:0,
        orderData:[
            {
                name: "Jx12",
                color: "白色",
                number: 1,
                unitPrice: 1.2,
                total: 100, 
                o1: "100", o2: "", o3: "", o4: "", o5: "", o6: "", o7: "", o8: "", o9: ""
             },
            {
                name: "Jx13",
                color: "黄色",
                number: 1,
                unitPrice: 1.2,
                total: 100,
                o1: "", o2: "200", o3: "300", o4: "400", o5: "500", o6: "", o7: "", o8: "", o9: "",
            },
            {
                name: "Jx13",
                color: "黄色",
                number: 1,
                unitPrice: 1.2,
                total: 100,
                o1: "", o2: "200", o3: "300", o4: "400", o5: "500", o6: "", o7: "", o8: "", o9: "",
            },
            {
                name: "Jx13",
                color: "黄色",
                number: 1,
                unitPrice: 1.2,
                total: 100,
                o1: "", o2: "200", o3: "300", o4: "400", o5: "500", o6: "", o7: "", o8: "", o9: "",
            },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 当时间选择器变化的时候
     */
    onDateChange: function(event) {
        console.log(" order date change now: " + event.detail.value);
        let that = this;
        this.setData({
            orderDate: event.detail.value,
            orderDateCN: that.getCurrDateCN(event.detail.value)
        })
    },

    initCurrDate: function() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let dateStr = year + "-" + month + "-" + day;

        console.log(" getCurrDate dateStr: " + dateStr)
        return dateStr;
    },

    getCurrDateCN: function(currDate) {
        let dateArr = currDate.split('-');
        console.log(" getCurrDateCN : " + dateArr);

        if(dateArr != null && dateArr.length == 3) {
            return dateArr[0] + "年" + dateArr[1] + "月" + dateArr[2] + "日";
        } else {
            return this.data.orderData;
        }
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        var that = this;
        let orderDate = that.initCurrDate();
        wx.getSystemInfo({
            success: function(res) {
                console.log(" 屏幕信息: " + JSON.stringify(res))
                that.setData({
                    tableWidth: res.windowWidth,
                    tableHegiht: res.screenHeight,
                    orderDate: orderDate,
                    orderDateCN: that.getCurrDateCN(orderDate)
                });
            }
        });
        
    },
    preview: function() {
        let that = this;

        //显示canvas
        this.setData({
            isShowCanvas: true,
        }, function() {
            //开始绘图
            that.draw(function () {
                //绘图结束后的回调函数，进行创建图片
                that.createImagePath();
            });
        }) 
        
        
    },
    test: function() {
        wx.showLoading({
            title: '被惦记i',
        })
    },
    draw: function(callback) {
        const ctx = wx.createCanvasContext('shareFrends');
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours(); //获取当前小时数(0-23)
        const minute = date.getMinutes();
        const second = date.getSeconds();
        const time = year + '.' + month + '.' + day + ' ' + hour + ':' + minute + ':' + second; 


        ctx.save()
        
        //设置图片背景颜色
        ctx.setFillStyle('white')
        ctx.fillRect(0, 0, this.data.tableWidth, this.data.tableHegiht)
    
        ctx.setFontSize(23);
        //【1】设置公司名字
        let y1Offset = 0;
        let x1 = X
        let y1 = Y;
        ctx.setFillStyle('black')
        ctx.fillText('兴 和 纺 织', x1, y1);

        ctx.setFontSize(16);
        //【2】设置公司英文
        let y2Offset = 0;
        let x2 = X;
        let y2 = Y + 30;
        ctx.fillText('XING HE TEXTILE', x2, y2);
        
        ctx.setFontSize(11);
        //【3】公司信息
        let x3 = this.data.tableWidth /2;
        let y3 = Y - 10;
        let y3Offset = 16;
        ctx.fillText('地址：广州市珠海区逸景路', x3, y3)
        y3 += y3Offset;
        ctx.fillText('         康盛轻纺城后街A117', x3, y3)
        y3 += y3Offset;
        ctx.fillText('手机：18026260054', x3, y3)
        y3 += y3Offset;
        ctx.fillText('建行：6227 0018 2297 0280 284', x3, y3)
        y3 += y3Offset;
        ctx.fillText('农行：6228 4800 6858 6382 175', x3, y3)
        y3 += y3Offset;
        ctx.fillText('户名：黄生根', x3, y3)

        ctx.setFontSize(13);
        //【4】客户名称
        let x4 = X;
        let y4 = y2 + 55;
        ctx.fillText('客 户 名 称：陈强', x4, y4)

        //【5】开单日期
        let x5 = this.data.tableWidth / 3 * 2;
        let y5 = y4;
        ctx.fillText('2018年 11月 21日', x5, y5)

        //【6】分割线
        let x6 = x4;
        let y6 = y4 + 9;
        let x6Dist = this.data.tableWidth - TABLE_MARGIN;
        ctx.moveTo(x6, y6);
        ctx.lineTo(x6Dist, y6);
        ctx.setLineWidth(0.8);
        ctx.stroke();

        ctx.setFontSize(11);
        //【7】开始写表头
        let thXOffset = 22;
        let thXCNOffset = thXOffset + 12;
        let thY = y6 + MARGIN_TOP_BELOW_DIVIDER;
        let th1X = x6 + 5 ;

        let th2X = th1X;
        ctx.fillText('货名', th2X, thY)

        let th3X = th2X + thXCNOffset;
        ctx.fillText('颜色', th3X, thY)
        
        let th4X = th3X + thXCNOffset;
        ctx.fillText('1', th4X, thY)

        let th5X = th4X + thXOffset;
        ctx.fillText('2', th5X, thY)

        let th6X = th5X + thXOffset;
        ctx.fillText('3', th6X, thY)

        let th7X = th6X + thXOffset;
        ctx.fillText('4', th7X, thY)

        let th8X = th7X + thXOffset;
        ctx.fillText('5', th8X, thY)

        let th9X = th8X + thXOffset;
        ctx.fillText('6', th9X, thY)

        let th10X = th9X + thXOffset;
        ctx.fillText('7', th10X, thY)

        let th11X = th10X + thXOffset;
        ctx.fillText('8', th11X, thY)

        let th12X = th11X + thXOffset;
        ctx.fillText('9', th12X, thY)

        let th13X = th12X + thXOffset;
        ctx.fillText('数量', th13X, thY)

        let th14X = th13X + thXCNOffset;
        ctx.fillText('单价', th14X, thY)

        let th15X = th14X + thXCNOffset;
        ctx.fillText('金额', th15X, thY)

        //【8】动态渲染数据
        let orderDateYOffset = 18;
        let orderDataY = thY;
        for(let index in this.data.orderData) {
            orderDataY += orderDateYOffset;
            let order = this.data.orderData[index];
            ctx.fillText(order.name, th2X, orderDataY)
            ctx.fillText(order.color, th3X, orderDataY)
            ctx.fillText(order.o1, th4X, orderDataY)
            ctx.fillText(order.o2, th5X, orderDataY)
            ctx.fillText(order.o3, th6X, orderDataY)
            ctx.fillText(order.o4, th7X, orderDataY)
            ctx.fillText(order.o5, th8X, orderDataY)
            ctx.fillText(order.o6, th9X, orderDataY)
            ctx.fillText(order.o7, th10X, orderDataY)
            ctx.fillText(order.o8, th11X, orderDataY)
            ctx.fillText(order.o9, th12X, orderDataY)
            ctx.fillText(order.number, th13X, orderDataY)
            ctx.fillText(order.unitPrice, th14X, orderDataY)
            ctx.fillText(order.total, th15X, orderDataY)
        }

        //【9】画底部的表格
        let TR_HEIGHT = 30;
        let x9_1 = x4;
        let y9_1 = orderDataY + 80;
        let x9_1Dist = this.data.tableWidth - TABLE_MARGIN;
        ctx.moveTo(x9_1, y9_1);
        ctx.lineTo(x9_1Dist, y9_1);

        let x9_2 = x4;
        let y9_2 = y9_1 + TR_HEIGHT;
        let x9_2Dist = this.data.tableWidth - TABLE_MARGIN;
        ctx.moveTo(x9_2, y9_2);
        ctx.lineTo(x9_2Dist, y9_2);

        let x9_3 = x4;
        let y9_3 = y9_2 + TR_HEIGHT;
        let x9_3Dist = this.data.tableWidth - TABLE_MARGIN;
        ctx.moveTo(x9_3, y9_3);
        ctx.lineTo(x9_3Dist, y9_3);

        //竖1
        ctx.moveTo(x9_1, y9_1);
        ctx.lineTo(x9_3, y9_3);
        
        //竖2
        let verticalX2 = this.data.tableWidth / 5 *3;
        ctx.moveTo(verticalX2, y9_1);
        ctx.lineTo(verticalX2, y9_3);

        //竖3
        ctx.moveTo(x9_1Dist, y9_1);
        ctx.lineTo(x9_1Dist, y9_3);

        ctx.setLineWidth(0.8);
        ctx.stroke();

        //【10】金额合计大写
        let x10_1 = x4 + 10;
        let y10_1 = y9_1 + MARGIN_TOP_BELOW_DIVIDER;
        ctx.fillText("金额合计大写：壹万伍仟", x10_1, y10_1)

        let x10_2 = verticalX2 + 10;
        let y10_2 = y10_1;
        ctx.fillText("¥：15000", x10_2, y10_2)

        //【11】欠款信息
        let x11_1 = x10_1;
        let y11_1 = y9_2 + MARGIN_TOP_BELOW_DIVIDER;
        ctx.fillText("欠款¥：20000", x11_1, y11_1)

        let x11_2 = verticalX2 + 10;
        let y11_2 = y11_1;
        ctx.fillText("累计后欠¥：15000", x11_2, y11_2)

        // 【12】绘制整个外围的边框，宽度使用手机的宽度，高度根据表格数据的大小来增加   
        ctx.setStrokeStyle('black')
        ctx.setLineWidth(1);
        ctx.setShadow(50, 50, 50, 'blue')
        ctx.strokeRect(10, 50, this.data.tableWidth - 20, y9_3)
        
        //最终绘画
        ctx.draw(false, callback);
    },

    save: function() {
        this.setData({
            showOrderEditModal: true,
            orderDialogTitle:"新增货品"
        })
    },

    edit: function () {
        this.setData({
            showOrderEditModal: true,
            orderDialogTitle: "修改货品"
        })
    },

    /**
     * 生成图片的保存路径
     */
    createImagePath: function() {
        var that = this;
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            canvasId: 'shareFrends',
            success: function(res) {
                console.log(res.tempFilePath) // 返回图片路径
                setTimeout(function() {
                    wx.previewImage({
                        current: res.tempFilePath, // 当前显示图片的http链接
                        urls: [res.tempFilePath], // 需要预览的图片http链接列表
                        complete: function () {
                            that.setData({
                                isShowCanvas: false,
                            })
                        }
                    })
                }, 630)
                
            }
        })
    },

    saveImage: function(imagePath) {
        let that = this;
        // 获取用户是否开启用户授权相册
        wx.getSetting({
            success(res) {
                // 如果没有则获取授权
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success() {
                            wx.saveImageToPhotosAlbum({
                                filePath: imagePath,
                                success() {
                                    wx.showToast({
                                        title: '保存成功'
                                    })
                                },
                                fail() {
                                    wx.showToast({
                                        title: '保存失败',
                                        icon: 'none'
                                    })
                                }
                            })
                        },
                        fail() {
                            // 如果用户拒绝过或没有授权，则再次打开授权窗口
                            //（ps：微信api又改了现在只能通过button才能打开授权设置，以前通过openSet就可打开，下面有打开授权的button弹窗代码）
                            wx.showToast({
                                title: '授权失败，请重新授权',
                                icon: 'none'
                            })
                        }
                    })
                } else {
                    // 有则直接保存
                    wx.saveImageToPhotosAlbum({
                        filePath: imagePath,
                        success() {
                            wx.showToast({
                                title: '保存成功'
                            })
                        },
                        fail() {
                            wx.showToast({
                                title: '保存失败',
                                icon: 'none'
                            })
                        }
                    })
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }, 

    onDialogCancel :function() {
        this.setData({
            showOrderEditModal: false
        });
    },

    onDialogConfirm: function() {
        /**
         *  (1)关闭对话框
         * （2）保存新数据
         */
        this.setData({
            showOrderEditModal: false
        });
    }


})