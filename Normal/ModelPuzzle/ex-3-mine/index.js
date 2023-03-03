var img = 'https://media.gettyimages.com/vectors/hand-drawing-hipster-fantasy-animal-unicorn-illustration-vector-id1065322868?s=2048x2048'

// 随机生成并平铺图片
// function randomize() {
//   let root = document.documentElement
//   root.style.setProperty('--image','url('+img+')')
//   var ul = document.querySelectorAll('#puzz i');
//   for(var i=0;i<ul.length;i++){
//     ul[i].style.left = Math.random()*(window.innerWidth-100) + 'px'
//     ul[i].style.top = Math.random()*(window.innerHeight-100) + 'px'
//   }
// }
// randomize()

// 选中匹配
var fp = document.querySelectorAll('#puz i')
fp.forEach(function(el){
  el.addEventListener('click', function(){
    if(document.querySelector('.clicked')){
      var c = document.querySelector('.clicked')
      if(c.classList.contains(el.classList)) {
        el.classList.add('dropped')
        c.classList.add('done')
        c.classList.toggle('clicked')

        if(document.querySelectorAll('.dropped').length == 4) {
          // 全部完成拼图放大效果
          document.querySelector('#puz').classList.add('allDone')
          document.querySelector('#puz').style.border = 'none'  
          document.querySelector('#puz').style.animation = 'allDone 1s linear forwards'

          // setTimeout(function(){
          //   randomize()            
          // },1500)
        } 
      }
    }    
  })
})

// desktop drag and drop
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.className);  
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text")

  if(ev.target.className == data){
    ev.target.classList.add('dropped')
    // 隐藏原先放置拼图片的位置
    document.querySelector('.'+data+"[draggable='true']").classList.add('done')

    if(document.querySelectorAll('.dropped').length == 4) {
      console.log("Yes!!")
      document.querySelector('#puz').classList.add('allDone')
      document.querySelector('#puz').style.border = 'none'  
      document.querySelector('#puz').style.animation = 'allDone 1s linear forwards'  

      // setTimeout(function(){
      //   randomize()        
      // },1500)
    }    
  }  
}