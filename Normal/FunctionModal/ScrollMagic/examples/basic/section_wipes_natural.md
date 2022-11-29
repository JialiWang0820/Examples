# 04 section_wipes_natural
>### 用自然滚动的方式擦拭内容，通过`scene.setPin`实现
>### 在幻灯片间创造“暂停”，添加`margin-bottom`
<br>

## 1. triggerHook
```java
//获得当前的触发器值
var triggerHook = scene.triggerHook();

//使用一个字符串设置一个新的触发器
scene.triggerHook("onLeave");
//用一个数字设置一个新的触发器
scene.triggerHook(0.7);
```
## 2. triggerElement
### 获取或设置触发元素的选项值
```java
// 获取当前的触发元素
var triggerElement = scene.triggerElement();

// 使用选择器设置一个新的触发元素
scene.triggerElement("#trigger");
//使用一个DOM对象设置一个新的触发元素
scene.triggerElement(document.getElementById("trigger"))
```

## 3. 实例
```java
<script>
  $(function () { // 等待文档就绪
    // 初始化
    var controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        triggerHook: 'onLeave',
        duration: "200%" // 持续时间为0也能工作
        // 但是，如果有大量（>20个）被钉住的部分，可能会发生显示错误，所以每一个部分一旦被下一个部分覆盖，就应该取消被钉住
        // 通常情况下，100%也可以，但这里使用的是200%，因为由于暂停，面板3的显示时间超过了滚动高度的100%
      }
    });

    // 获取所有幻灯片
    var slides = document.querySelectorAll("section.panel");

    // 为每张幻灯片创建场景
    for (var i=0; i<slides.length; i++) {
      new ScrollMagic.Scene({
          triggerElement: slides[i]
        })
        .setPin(slides[i], {pushFollowers: false})
        .addIndicators() // 添加指示器 (需要插件)
        .addTo(controller);
    }
  });
</script>