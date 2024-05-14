var controller = new ScrollMagic.Controller();

var scene1 = new ScrollMagic.Scene({
  triggerElement: '#trigger1',
}).setTween('#animate1',0.5,{backgroundColor:'green',scale:2.5})
.addIndicators({name: "1 - no duration"})
.addTo(controller);

var scene2 = new ScrollMagic.Scene({
  triggerElement: '#trigger2',
  duration: 300
}).setTween('#animate2',{backgroundColor:'blue',scale:0.5,borderTop: '30px'})
.addIndicators({name: "2 - 300 duration"})
.addTo(controller);

var scene3 = new ScrollMagic.Scene({
  triggerElement: '#trigger3'
}).setClassToggle('#animate3','zap')
.addIndicators({name: "3 - adding class"})
.addTo(controller);

var animate4 = $('#animate4')[0];
var scene4 = new ScrollMagic.Scene({
  triggerElement: '#trigger4',
  duration: 100
}).on('enter',function() {
  animate4.style.backgroundColor = 'grey';
}).on('leave',function() {
  animate4.style.backgroundColor = '';
}).addIndicators({name: "4 - changing in-line style"})
.addTo(controller);