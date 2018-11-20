1.在属性赛程列表中：对球的名字如果溢出，则需要使用 overflow:auto来控制，记得要也设置父元素，以及父元素的兄弟元素的的宽度用 width:20%，百分比来控制，而不能使用 flex:1 这边来控制，因为flex属性会根据元素的内容进行伸缩，导致文本不会漂浮在最上面

2.关于 postion属性：4种属性值的描述：
  (1)https://www.cnblogs.com/520chensiqi/p/6540068.html
  (2)“子绝父相”：相对位置  和 绝对位置 一起使用

3.bindtap事件的 event.currentTarget.dataset.valStr
其中 valStr 在 xx.wxml中的书写方式 必须是小写字母不是驼峰式，比如：teamname，而不能是teamName
https://blog.csdn.net/genius_yym/article/details/52904161?locationNum=2&fps=1

dataset
在组件中可以定义数据，这些数据将会通过事件传递给 SERVICE。 书写方式： 以data-开头，多个单词由连字符-链接，不能有大写(大写会自动转成小写)如data-element-type，最终在 event.currentTarget.dataset 中会将连字符转成驼峰elementType。
参考官方说明：https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html

4.实现 ViewPager + Tab的方式
https://blog.csdn.net/lily2016n/article/details/78414306

5. flex 布局的介绍：
https://blog.csdn.net/zhaoweizheng66/article/details/50614003

6.使用自定义组件关注以下几点：
（1）类似SDK中 catch/bindtap 监听函数，在自定义组件的时候，需要为你的组件定义将要发生的事件，
    比如会发生  say 事件，则 在引入你的自定义组件的父控件中，使用 
    <customedView bindsay="xxxmethod" /> 来监听事件；
    而customedView内部在监听SDK的事件或者也是监听其他自定义组件的事件后，进行本组件的事件的
    触发，事件的触发涉及到函数 triggerEvent(event, detail, option);
    event: 事件的名字；
    detail:事件对外传递的参数；
    option：事件床传递的类型；

7.对于小程序将内容转化为图片，并且进行转发的功能，可以做如下实现方式：
1.
（1）通过 Canvas来 绘制内容；
    wx.createCanvasContext('canvasId').draw();
（2）然后保存到本地相册中；
    wx.canvasToTempFilePath();
（3）再将生成的图片显示在<img>，再进行预览，接着长按发送给用户；
    wx.previewImage();

2.通过截图的功能，将界面的制定区域的内容截图下来，再手动选择相册的内容发送给用户；

3.通过 java 语言后端生成图片的方式：https://blog.csdn.net/tds411255224/article/details/83054543