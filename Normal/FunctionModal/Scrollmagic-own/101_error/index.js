$(document).ready(function(){
  // Init ScrollMagic
  // 告诉浏览器使用滚动条并触发动画
  var controller = new ScrollMagic.Controller();

  // pin the intro
  var pinIntroScene = new ScrollMagic.Scene({
    triggerElement: '#intro',
    triggerHook: 0, // 页面顶部
    duration: '30%'
  })
  .setPin('#intro',{pushFollowers: false})
  .addTo(controller);

  // pin again
  var pinIntroScene2 = new ScrollMagic.Scene({
    triggerElement: '#project01',
    triggerHook: 0.4
  })
  .setPin('#project01',{pushFollowers: false})
  .addTo(controller);

  // parallax scene
  var parallaxTl = new TimelineMax();
  parallaxTl
    .from('.content-wrapper',0.4,{autoAlpha:0,ease:Power0.easeNone},0.3)
    .from('.bcg',1,{y:'-30%',ease:Power0.easeNone})
    ;
  var slideParallaxScene = new ScrollMagic.Scene({
    triggerElement: '.bcg-parallax',
    triggerHook: 1,
    duration: '100%'
  })
  .setTween(parallaxTl)
  .addTo(controller); 

  // 循环场景,遍历项目元素并单独创建场景
  $('.project').each(function(){
    // 建立第一个场景
    var ourScene = new ScrollMagic.Scene({
      // 定义触发元素
      triggerElement: this.children[0], // project01 img
      duration: 300, // 当前场景的有效范围,单位为像素; duration: '100%' 响应式即视口高度100%
      triggerHook: 0.9,
      reverse: false, // 动画只发生一次
    })

    .setClassToggle(this,'fade-in') // 给project01添加类

    .addIndicators({ // 设置不同视觉指示器的id和color,准确看到触发场景的时间
      name: 'fade scene', // 用于识别
      colorTrigger: 'black', // 触发指示器颜色定义
      indent: 200, // 指示器的偏移位置
      colorStart: '#75c695', // 开始指示器颜色
      colorEnd: 'pink' // 结束指示器颜色
    }) // trigger

    .addTo(controller);
  })
}) 
