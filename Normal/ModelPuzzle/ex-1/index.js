/*
	** 此示例参考 HTML5 Drag & Drop 实现 **
*/


/**
* 拖动元素时执行的函数 
**/
function start(e) {
	e.dataTransfer.effecAllowed = 'move'; // 将效果定义为移动（默认）
	e.dataTransfer.setData("Text", e.target.id); // 抓住要移动的项目
	e.target.style.opacity = '0.4'; 
}

/**
* 当元素的拖动完成后执行的函数
**/
function end(e){
	e.target.style.opacity = ''; // 恢复该元素的不透明度	
	e.dataTransfer.clearData("Data");			
}

/**
* 当一个可拖动的元素进入其被调用的元素时，该函数被执行
**/
function enter(e) {
	return true;
}

/**
* 当一个可拖动的元素在它被调用的元素上时，该函数被执行
* 如果该对象可以被丢弃在该元素上，则返回false，否则返回true
**/
function over(e) {
	if ((e.target.className == "containerPiece") || (e.target.id == "containerPieces"))
		return false;
	else
	return true;
}
    
/**
* 当一个可拖动的元素被放到它所调用的元素上时，该函数被执行
**/
function drop(e){
	e.preventDefault(); // 防止被丢弃元素的默认动作被执行
	var elementoArrastrado = e.dataTransfer.getData("Text");
	e.target.appendChild(document.getElementById(elementoArrastrado)); // 将放弃的元素放在调用此函数的元素之上
	comprobarPuzzle();
}

function comprobarPuzzle(){
	if((document.getElementById('piece1').parentNode.id=='uno') && (document.getElementById('piece2').parentNode.id=='dos') 
	&& (document.getElementById('piece3').parentNode.id=='tres') && (document.getElementById('piece4').parentNode.id=='cuatro')) {
		alert('恭喜你，你已经完成了这个拼图！！');
	}
}

/**
* 如果浏览器不支持拖放，则显示警告信息（IE和Safari在Windows上不支持）
**/
function checkBrowser() {
	if((navigator.userAgent.toLowerCase().indexOf('msie ') > -1) || ((navigator.userAgent.toLowerCase().indexOf('safari') > -1) 
	&& (navigator.userAgent.toLowerCase().indexOf('chrome') == -1))) {
		alert("您的浏览器不支持HTML5拖放，请尝试另一个浏览器");
	}
}