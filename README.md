# 一、简介

美化控件。

一开始想的是仿安卓风，但后来发现太难仿了，仿出来都是半苹果半安卓风格，那干脆就不要专门仿安卓而是美化控件好了。于是起名就把Android切一半叫AndStyle

# 二、控件

## button -> andstyle_button

按钮增加点击涟漪效果

独有属性 | 类型 | 默认值 | 说明
---|---|---|---
ripple_color | $color | $color("white") | 涟漪颜色
ripple_alpha | number | 0.5 | 涟漪透明度
ripple_size | number | 4.1 | 涟漪大小
ripple_duration | number | 0.8 | 涟漪扩大时间
ripple_longPressedStopDuration | number | 0.5 | 长按时涟漪透明度下降的时间
ripple_index | number | Infinity(最上层) | 涟漪所处的层级
ripple_addClearView | boolean | true | 是否添加clearView

## spinner -> andstyle_spinner

原生的转菊花是真的丑，换成谷歌样式的就好看多了👌

独有属性 | 类型 | 默认值 | 说明
---|---|---|---
lineWidth | number | 3 | 圈圈线条的宽度

阉割属性 | 说明
---|---
loading | 加载会立即开始，并无法停止(滑稽) 想停止直接remove掉就好了多方便
style | 本来这个属性也没多少用处吧，阉了阉了
color | color并没有阉割，但是改为只写了

## slider -> andstyle_slider

小滑块的滑条，支持原控件所有属性

## input -> andstyle_input

独有属性 | 类型 | 默认值 | 说明
---|---|---|---
lineWidth | number | 1 | 线条的高度
lineColor | $color | $color("#E3E3E3") | 线条默认颜色
selectedLineColor | $color | $color("tint") | 编辑时线条颜色

支持原控件所有属性

## video -> andstyle_video

原生video控件加强，支持设置播放时间，播放倍速

独有属性 | 类型 | 默认值 | 说明
---|---|---|---
controls | boolean | true | 是否显示控制条

这个控件本质是一个web控件，可以用notify来调用它的方法

方法 | 说明
---|---
play | 开始播放
pause | 暂停
getCurrentTime | 获取当前播放时间和总时长
setProgress | 设定时间
setRate | 设定播放速率

### events:getCurrentTime
用getCurrentTime之后可以在这里获取到时长

## SettingList

设置样式的列表，cell可以自定义成switch或者tab

例子去main.js里看

## TabLayout

独有属性 | 类型 | 默认值 | 说明
---|---|---|---
tabs | array | 无 | (必填)每个tab的文本
tabTextColor | $color | $color("white") | tab文本的颜色
tabTextFont | $font | $font(18) | 字体
tabIndicatorColor | $color | $color("white") | 指示器颜色
tabIndicatorHeight | number | 3 | 指示器高度(设为0则不显示)
setupWithViewPager | string | 无 | (填写ViewPager的id)与ViewPager控件绑定
index | number | 0 | 被选中的index

### events:onTabSelected

某个tab被点击回调

```js
onTabSelected: (index, title) => {

}
```

## ViewPager

独有属性 | 类型 | 默认值 | 说明
---|---|---|---
pages | array | 无 | (必填)每一页的view
setupWithTabLayout | string | 无 | (填写TabLayout的id)与TabLayout控件绑定
index | number | 0 | 被选中的index

ViewPager本质上是一个`scroll`控件，所以支持scroll的所有属性事件，但也不要乱加，可能会出现`八哥`

# 三、API

## render(object) / push(object)

同$ui.render / $ui.push，但是支持AndStyle的控件类型

## changeStyle(array)

给他一组对象，即可得到AndStyle样式的控件对象

>下面两块代码效果相同

```js
andstyle.render({
  views: [
    {
      type: "andstyle_button",
      props: {
        frame: $rect(10, 10, 100, 40)
      }
    }
  ]
});
```

```js
$ui.render({
  views: andstyle.changeStyle([
    {
      type: "andstyle_button",
      props: {
        frame: $rect(10, 10, 100, 40)
      }
    }
  ])
});
```

## setAttribute(view, key, value)

改变某个AndStyle控件的某个属性

```js
andstyle.setAttribute($("button"), "title", "Tapped"); //修改$("button")的title为"Tapped"
```

## hintView(title, buttonTitle, text)

呼出JSBox原生的BaseHintView，并且带一个标题（魔改自Ryan大佬的代码）

返回"tapped"和"canceled"

## startLoading(color, bgcolor)

在页面上创建一个loading view，样式与脚本"樱花动漫"里的一样

## stopLoading()

移除loading view

## alert(object)

仿Safari弹窗，main.js里的是一个获取一言的🌰

属性 | 类型 | 说明
---|---|---
message | string | 顾名思义
bgcolor | $color | 顾名思义
shadowColor | $color | 顾名思义
actions | array | 看下面⬇️

actions用来指定按钮，一共从右到左两个按钮

属性 | 类型 | 说明
---|---|---
title | string | 顾名思义
titleColor | $color | 顾名思义
font | $font | 顾名思义
handler | function | 顾名思义

传入的参数也可以是string，比如

```js
andstyle.alert("message")
```

## dismissAlert()

手动消除`alert`创建的弹窗

## addComponent()

添加一个自定义的控件

首先创建一个类，继承自`andstyle.Component`（禁止吐槽神似某act）或者一个andstyle控件

```js
class test extends andstyle.Component {
  constructor(obj) {
    super(obj);
    this. ...
  }
}
```

调用`addComponent`，依次传入`类`,`type`,`继承的控件`

```js
andstyle.addComponent(test, "test", "view");
```

然后就可以在`andstyle.render()`里用了

AndStyle内置的控件就是类似这样被创建的，可以去`AndStye/class.js`里看实例

# 四、内置的类

名称 | 对应控件类型
---|---
Button | andstyle_button
Spinner | andstyle_spinner
SettingList | SettingList
Slider | andstyle_slider
Input | andstyle_input
TabLayout | TabLayout
ViewPager | ViewPager
Ripple | https://github.com/Azitee/jsbox_ripple

🌰栗子:

```js
const andstyle = require("AndStyle/main")
const ANDStyleButton = new andstyle.Button({
  type: "button",
  props: {
    title: "Button"
  },
  layout: (make, view) => {
    make.center.equalTo(view.super);
    make.size.equalTo(40);
  }
})
$ui.window.add(ANDStyleButton)
```

# 五、注意事项

- 更改AndStyle控件的某个属性时最好用`setAttribute`，不然可能改不了
- 大部分属性都是只写，并且无法动态更改（以后可能会改进？
- 每个AndStyle控件的id都要唯一，若不在props里填写id，将会自动分配一个唯一id
- 控件的info属性不要乱填，可能会有`八哥`
- 控件props里如果有控件（比如stack，list，matrix控件），不会自动转换，请手动用`changeStyle`方法

>v1.0.2
更新&反馈请前往钙hub >> https://github.com/Azitee/jsbox_AndStyle
or 联系 hehedahhd@icloud.com
