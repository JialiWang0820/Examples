# 01 simple_tweening
## 1. setTween方法
### Tween的持续时间将被投射到场景的滚动距离，进度与滚动条移动同步
``` java
// 直接添加一个单一的Tween
scene.setTween(TweenMax.to("obj"), 1, {x: 100});

// 通过变量添加一个单一的Tween
var tween = TweenMax.to("obj"), 1, {x: 100};
scene.setTween(tween);

// 添加多个Tween，用一个时间线包装
var timeline = new TimelineMax();
var tween1 = TweenMax.from("obj1", 1, {x: 100});
var tween2 = TweenMax.to("obj2", 1, {y: 100});
timeline
  .add(tween1)
  .add(tween2);
scene.addTween(timeline);

// 简言之添加一个TweenMax.to()的Tween
scene.setTween("obj3", 0.5, {y: 100});

// 简言之添加一个TweenMax.to()，时间为1s，
// 当场景有duration，且Tween的持续时间不重要
scene.setTween("obj3", {y: 100});
``` 

>#### `.setTween("#animate1", 0.2, {backgroundColor: "green", scale: 2.5})`
>#### 0.2s内背景色变为绿色，放大2.5倍  
<br>

## 2. addIndicators方法
### 添加视觉指示器
>#### `.addIndicators({name: "pin scene", colorEnd: "#FFFFFF"})`
>#### 添加基本指标，并传递选项；
>#### 其中name显示在场景的开始和结束指标上，用于识别；
>#### indent即指示器的额外位置偏移；
>#### colorStart即开始指示器的css颜色定义；
>#### colorEnd即结束指示器的css颜色定义；
>#### colorTrigger即触发指标的css颜色定义； 
<br>

## 3. duration属性
### 2.1 为场景定义持续时间 
>#### `var scene = new ScrollMagic.Scene({duration: 300})`      
>#### Tween 的进度对应滚动的位置
<br>

### 2.2 没有为场景定义持续时间  
>#### `var scene = new ScrollMagic.Scene({})`    
>#### 滚动到达触发位置时开始播放
<br>

## 4. 实例
```java
<script>
// 构建场景
var scene = new ScrollMagic.Scene({
  triggerElement: "#trigger1"
})
.setTween("#animate1", 0.2, {backgroundColor: "green", scale: 2.5}) // 触发一个TweenMax.to tween
.addIndicators({name: "1 (duration: 0)"}) // 添加指示器（插件）
.addTo(controller);
</script>