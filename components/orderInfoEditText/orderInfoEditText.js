// components/orderInfoEditText/orderInfoEditText.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: String,
            value: "初始标题"
        },

        key: {
            type: String,
            value: "key"
        },

        value: {
            type: String,
            value: "初始内容"
        },
        inputType: {
            type:String,
            value: "text"
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onChange: function (e) {
            console.log(" onChange event: " + JSON.stringify(e))
            let orderItem = {
                key: this.properties.key,
                value: e.detail.value
            }
            this.triggerEvent("change", orderItem)
        }
    },

   
})
