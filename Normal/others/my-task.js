const queryableFunctions = {
  // 示例 1：得到两个数字的差值：
  getDifference(minuend, subtrahend) {
    reply("printStuff", minuend - subtrahend);
  },

  // 示例 2：等待三秒
  waitSomeTime() {
    setTimeout(() => {
      reply("doAlert", 3, "seconds");
    }, 3000);
  },
};

// 系统函数

function defaultReply(message) {
  // 你的默认 PUBLIC 函数只在主页面直接调用 queryableWorker.postMessage() 方法时执行。
  // 做点什么
}

function reply(queryMethodListener, ...queryMethodArguments) {
  if (!queryMethodListener) {
    throw new TypeError("reply - not enough arguments");
  }
  postMessage({
    queryMethodListener,
    queryMethodArguments,
  });
}

onmessage = (event) => {
  if (
    event.data instanceof Object &&
    Object.hasOwn(event.data, "queryMethod") &&
    Object.hasOwn(event.data, "queryMethodArguments")
  ) {
    queryableFunctions[event.data.queryMethod].apply(
      self,
      event.data.queryMethodArguments,
    );
  } else {
    defaultReply(event.data);
  }
};
