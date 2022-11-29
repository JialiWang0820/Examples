# 03 simple_pinning
## 1. setPin方法
>### `scene.setPin("#pin", {pushFollowers: false})`
>### 效果：在场景的持续时间内钉住`#pin`元素,被钉住元素移过后续元素；
>### 若场景持续时间为0,只有用户向后滚动超过起始位置时元素才被取消钉住;
>### 一个有持续时间的场景的钉子将被钉住相应数量的滚动像素，然后再次释放。
>### 如果没有定义持续时间，被钉住的元素将永不会释放，除非向后滚动超过触发位置
>### 确保在同一时间内只有一个元素被钉住。
>### 一个元素可以被多次钉住，但只能连续钉住。
>### 注意：当场景持续时间为0时，选项pushFollowers没有效果;
>### `pushFollowers` 为 `true` 则持续时间内跟随元素被"推"下去，反之为 `false` 则被钉住元素只是滚过它们
>### `spacerClass` 引脚间隔元素的类名，用于替换元素
<br>

## 2. 实例
```java
// --------- 场景持续时间不为0 ---------
<script>
$(function () { // 等待文档准备
  // 建立场景
  var scene = new ScrollMagic.Scene({triggerElement: "#trigger1", duration: 300})
    .setPin("#pin1")
    .addIndicators({name: "1 (duration: 300)"}) // 添加指示器，需要插件
    .addTo(controller);
});
</script>

// --------- 场景持续时间为0 ---------
<script>
$(function () { // 等待文档准备
  // 建立场景
  var scene = new ScrollMagic.Scene({triggerElement: "#pin2"})
    .setPin("#pin2")
    .addIndicators({name: "2 (duration: 0)"}) // 添加指示器，需要插件
    .addTo(controller);
});
</script>