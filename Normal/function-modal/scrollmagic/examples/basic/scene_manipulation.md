# 05 scene_manipulation
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
    // 初始化控制器
    var controller = new ScrollMagic.Controller();

    // 建立 tween
    var tween = TweenMax.to("#target", 1, {rotation: 360, ease: Linear.easeNone});

    // 建立场景
    var scene = new ScrollMagic.Scene({triggerElement: "#trigger", duration: 300})
            .setTween(tween)
            .setPin("#target", {pushFollowers: false})
            .addIndicators() // 添加指示器 (需要插件)
            .addTo(controller);
    
    // 初始化选项
    $("input#duration").val(scene.duration());
    $("input#offset").val(scene.offset());
    $("input#triggerElement").val("#" + scene.triggerElement().getAttribute("id"));
    $("input#triggerHook").val(scene.triggerHook());
    $("input#reverse").prop("checked", scene.reverse());
    $("input#tweenChanges").prop("checked", scene.tweenChanges());

    $("div.slider+input").change(); // 触发变化以启动滑块

    // 表单行为
    // 在变化时更新
    $("form #options input:not(#triggerElement)").on("change", function (e) {
      var
        val = $(this).is("[type=checkbox]") ? $(this).prop("checked") : $(this).val(),
        property = $(this).attr("id");
      scene[property](val);
    });
    // 行为
    $("form #actions input[type=checkbox]").on("change", function (e) {
      var
        active = $(this).prop("checked"),
        type = $(this).attr("id");
      if (type == "tween") {
        if (active) {
          scene.setTween(tween);
        } else {
          scene.removeTween(true);
        }
      } else if (type == "pin") {
        if (active) {
          scene.setPin("#target", {pushFollowers: false});
        } else {
          scene.removePin(true);
        }
      } else if (type == "enabled") {
        scene.enabled(active);
      }
    });
    // 更新触发元素
    $("form #options button[name=triggerElement]").on("click", function (e) {
      e.preventDefault();
      var
        selector = $.trim($("input#triggerElement").val());
      if (selector === "") {
        scene.triggerElement(null);
      } else if ($(selector).length > 0) {
        scene.triggerElement(selector);
      } else {
        alert("No element was found using the selector \"" + selector + "\".");
        $("input#triggerElement").val("");
        scene.triggerElement(null);
      }
    });
    // triggerHook 按钮
    $("form #options button[name=triggerHook]").on("click", function (e) {
      e.preventDefault();
      $("input#triggerHook")
        .val($(this).val())
        .change();

    });
  });
</script>