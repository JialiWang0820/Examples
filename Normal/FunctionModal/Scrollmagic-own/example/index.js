// -------------------------------- 视差效果 ---------------------------------
// 创建控制器容纳动画
var controller = new ScrollMagic.Controller();
// 视差效果
new ScrollMagic.Scene({
  triggerElement: "#parallax", // 需要监视的元素，在#parallax进入屏幕时开始
  triggerHook: "onEnter", // 动画开始时屏幕上的点，默认情况下动画将在triggerElement碰到屏幕中间（'onCenter'）时开始，改为（'onEnter'）
})
.duration('200%') // 动画持续的时间，100%为持续一整屏，视差效果设置为200%
.setTween("#parallax", { // GSAP动画，添加需要动画的元素，同被监视的元素，在数组中添加动画信息
  backgroundPosition: "50% 100%",
  ease: Linear.easeNone
})
//.addIndicators() // 出于调试目的，查看动画的触发器、起点和终点
.addTo(controller); // 场景完成后添加到控制器



// -------------------------------- 滑动和固定动画 ---------------------------------
new ScrollMagic.Scene({
  triggerElement: "#slidein", // 需要监视的元素，在#slidein离开屏幕时开始
  triggerHook: "onLeave", // 幻灯片在即将离开屏幕时被固定在屏幕上
})
.setPin("#slidein") // 将动画设置为 ScrollMagic 的内置行为之一，即pin，对于此动画不需要GSAP
//.addIndicators()  // add indicators (requires plugin) 出于调试目的，查看动画的触发器、起点和终点
.addTo(controller); // 场景完成后添加到控制器

new ScrollMagic.Scene({
  triggerElement: "#slidein2", // 需要监视的元素，在#slidein2离开屏幕时开始
  triggerHook: "onLeave", // 幻灯片在即将离开屏幕时被固定在屏幕上
})
.setPin("#slidein2") // 将动画设置为 ScrollMagic 的内置行为之一，即pin，对于此动画不需要GSAP
//.addIndicators() // add indicators (requires plugin) 出于调试目的，查看动画的触发器、起点和终点
.addTo(controller); // 场景完成后添加到控制器



// -------------------------------- 其他动画 之 左侧飞入 ---------------------------------
// ps:三个动画每一项都需要使用 GASP 时间表，已被弃用，可创建比使用简单补间更复杂的序列
var fromLeftTimeline = new TimelineMax(); // 创建一个包含两个点的 GSAP 时间线
var fromLeftFrom = TweenMax.from("#left", 1, {
  x: -500 // 放置在屏幕左侧500像素处，即起点
});
var fromLeftTo = TweenMax.to("#left", 1, {
  x: 0 // 以原始位置结束，即终点
});
fromLeftTimeline
.add(fromLeftFrom)
.add(fromLeftTo);

new ScrollMagic.Scene({
  triggerElement: "#slidein2",// 需要监视的元素，在#slidein2偏移顶部200像素时开始
  offset: 200, // 偏移量，起点位于#slide2顶部下方200像素处 
})
.setTween(fromLeftTimeline) // 添加时间线
.duration(400) // 持续时间设置为400像素滚动
//.reverse(false) // 动画只发生一次而非每次向上向下滚动
//.addIndicators() // add indicators (requires plugin)
.addTo(controller); // 场景完成后添加到控制器
new ScrollMagic.Scene({
  triggerElement: "#slidein2", // 需要监视的元素，在#slidein2偏移顶部200像素时开始
  offset: 200, // 偏移量，起点位于#slide2顶部下方200像素处 
})
.setTween(fromLeftTimeline)// GSAP动画，添加需要动画的元素，同被监视的元素，在数组中添加动画信息
.duration(400) // 动画持续的时间为400像素
//.reverse(false) // 动画只发生一次而非每次向上向下滚动
//.addIndicators() // add indicators (requires plugin) 出于调试目的，查看动画的触发器、起点和终点
.addTo(controller); // 场景完成后添加到控制器



// -------------------------------- 其他动画 之 淡入 ---------------------------------
var fadeInTimeline = new TimelineMax(); // 创建一个包含两个点的 GSAP 时间线
var fadeInFrom = TweenMax.from("#opacity", 1, {
  autoAlpha: 0 // 以透明度为0开始，即起点（不可见）
});
var fadeInTo = TweenMax.to("#opacity", 1, {
  autoAlpha: 1  // 以透明度为1结束，即终点（完全可见）
});
fadeInTimeline
.add(fadeInFrom)
.add(fadeInTo);

new ScrollMagic.Scene({
  triggerElement: "#slidein2",// 需要监视的元素，在#slidein2偏移顶部200像素时开始
  offset: 200,// 偏移量，起点位于#slide2顶部下方200像素处 
})
.setTween(fadeInTimeline)// GSAP动画，添加需要动画的元素，同被监视的元素，在数组中添加动画信息
.duration(400) //动画持续的时间为400像素
//.reverse(false) // 动画只发生一次而非每次向上向下滚动
//.addIndicators() // add indicators (requires plugin) 出于调试目的，查看动画的触发器、起点和终点
.addTo(controller); // 场景完成后添加到控制器



// -------------------------------- 其他动画 之 底部进入 ---------------------------------
var fromBottomTimeline = new TimelineMax(); // 创建一个包含两个点的 GSAP 时间线
var fromBottomFrom = TweenMax.from("#bottom", 1, {
  y: 300 // 放置在屏幕底部300像素处，即起点
});
var fromBottomTo = TweenMax.to("#bottom", 1, {
  y: 0 // 以原始位置结束，即终点
});
fromBottomTimeline
.add(fromBottomFrom)
.add(fromBottomTo);

new ScrollMagic.Scene({
  triggerElement: "#slidein2", // 需要监视的元素，在#slidein2偏移顶部200像素时开始
  offset: 200, // 偏移量，起点位于#slide2顶部下方200像素处 
})
.setTween(fromBottomTimeline) // GSAP动画，添加需要动画的元素，同被监视的元素，在数组中添加动画信息
.duration(400) //动画持续的时间为400像素
//.reverse(false) // 动画只发生一次而非每次向上向下滚动
//.addIndicators() // add indicators (requires plugin) 出于调试目的，查看动画的触发器、起点和终点
.addTo(controller); // 场景完成后添加到控制器
