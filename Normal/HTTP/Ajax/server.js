//1.引入express
const express = require('express');

//2.创建应用对象
const app = express();

//3.创建路由规则
//request是对请求报文的封装
//response是对响应报文的封装
app.get('/server',(request,response)=>{
  //设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*');
  //设置响应体
  response.send('HELLO AJAX');
});

//可以接收任何类型的请求
app.all('/server',(request,response)=>{
  //设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*');
  //响应头
  response.setHeader('Access-Control-Allow-Headers','*');
  //设置响应体 
  response.send('HELLO AJAX POST');
});

app.all('/json-server',(request,response)=>{
  //设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*');
  //响应头 
  response.setHeader('Access-Control-Allow-Headers','*');
  // 响应一个数据
  const data = {
    name:'baidu'
  }
  //对对象进行字符串转换
  let str = JSON.stringify(data);
  //设置响应体 
  response.send(str);
});

//针对 IE 缓存
app.get('/ie',(request,response)=>{
  //设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*');
  //设置响应体
  response.send('HELLO IE');
});

//延时响应
app.all('/delay',(request,response)=>{
  //设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*');
  setTimeout(() => {
    // 设置响应体
    response.send('延时响应');
  },3000)
});

//jQuery服务
app.all('/jquery-server',(request,response)=>{
  //设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*');
  //响应头 
  response.setHeader('Access-Control-Allow-Headers','*');
  // response.send('Hello jQuery AJAX');
  // 数据转json格式
  const data = {name:'baidu'};
  response.send(JSON.stringify(data));
});

//axios服务
app.all('/axios-server',(request,response)=>{
  //设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*');
  //响应头 
  response.setHeader('Access-Control-Allow-Headers','*');
  // response.send('Hello jQuery AJAX');
  // 数据转json格式
  const data = {name:'baidu'};
  response.send(JSON.stringify(data));
});

//fetch服务
app.all('/fetch-server',(request,response)=>{
  //设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*');
  //响应头 
  response.setHeader('Access-Control-Allow-Headers','*');
  // response.send('Hello jQuery AJAX');
  // 数据转json格式
  const data = {name:'baidu'};
  response.send(JSON.stringify(data));
});

//jsonp服务
app.all('/jsonp-server',(request,response)=> {
  // response.send('jsonp-server');
  const data = {
    name:'尚硅谷atguigu'
  };
  // 将数据转化为字符串
  let str = JSON.stringify(data);
  // 返回结果
  response.end(`handle(${str})`);
});

//4.监听端口启动服务
app.listen(8000,()=>{
  console.log("服务已经启动，8000端口监听中...")
})