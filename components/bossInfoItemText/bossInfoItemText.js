// components/teamInfoItemText/teamInfoItemText.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: String,
            value: "初始标题"
        },
        value: {
            type: String,
            value: "初始内容"
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        initValue: "我是初始数据",
        
    },

    /**
     * 组件的方法列表
     * (1)包括事件响应函数
     * (2)任意的自定义方法，
     */
    methods: {
        onTitleClick : function(event) {
            console.log(" onTitleClick event: " + JSON.stringify(event));
            var detail = {
                title: this.properties.title,
                value: this.properties.value
            };

            var option = {
                bubbles: true,
                capturePhase: true,
            };

            this.triggerEvent("titleCallback", detail, option);
        },

        say: function(value) {
            console.log("say value: " + value);
        }
    },

    ready: function() {
        console.log("我被初始化: " + this.properties.title + "" + this.properties.value)
    }
})