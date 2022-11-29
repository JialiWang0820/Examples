# 02 simple_velocity
## 1. setVelocity方法
>### `.setVelocity("#animate", {opacity: 0}, {duration: 400})`
>### 效果：0.4s内消失，即透明度变为0；
>### 其中 "#animate" 为动画的目标;
>### {opacity: 0} 为动画化的css属性;
>### {duration: 400} 为持续时间或缓和;
<br>

## 2. 实例
```java
<script>
// 初始化控制器
var controller = new ScrollMagic.Controller();

// 建立场景
var scene = new ScrollMagic.Scene({triggerElement: "#trigger"})
  // 触发速度透明度动画
  .setVelocity("#animate", {opacity: 0}, {duration: 400})
  .addIndicators() // 添加指示器，需要插件
  .addTo(controller);
</script>