javascript:(function(){
  // xlsx 库的简化版本
  var xlsxLibrary = `
  var XLSX = {};

  XLSX.utils = {
    aoa_to_sheet: function (data) {
      var ws = {};
      var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
      for (var R = 0; R !== data.length; ++R) {
        for (var C = 0; C !== data[R].length; ++C) {
          if (range.s.r > R) range.s.r = R;
          if (range.s.c > C) range.s.c = C;
          if (range.e.r < R) range.e.r = R;
          if (range.e.c < C) range.e.c = C;
          var cell = { v: data[R][C] };
          if (cell.v == null) continue;
          var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

          if (typeof cell.v === 'number') cell.t = 'n';
          else if (typeof cell.v === 'boolean') cell.t = 'b';
          else cell.t = 's';

          ws[cell_ref] = cell;
        }
      }
      if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
      return ws;
    },
    book_new: function () {
      return { SheetNames: [], Sheets: {} };
    },
    book_append_sheet: function (wb, ws, name) {
      wb.SheetNames.push(name);
      wb.Sheets[name] = ws;
    },
    write: function (wb, options) {
      // 实际的写入操作（省略）
    }
  };
`;

  // 创建一个包含整个脚本的 Blob
  var fullScriptBlob = new Blob([
    xlsxLibrary,
    "var downloadConfirmed = window.confirm('是否开始导出图片信息？');",
    "if (downloadConfirmed) {",
    "  var meidiaWraps = document.querySelectorAll('.Polaris-IndexTable__TableRow');",
    "  if (meidiaWraps.length == 0) {",
    "    window.alert('没有图片信息导出！');",
    "    return;",
    "  }",
    "  var imageNames = [];",
    "  var imageSizes = [];",
    "  var imageUrls = [];",
    "  meidiaWraps.forEach(function (mediaWrap) {",
    "    // 图片命名",
    "    var imageNameEle = mediaWrap.querySelector('.Polaris-Text--bodyMd:not(.Polaris-Text--subdued)');",
    "    var imageName = imageNameEle.innerText;",
    "    // 图片大小",
    "    var imageSizesEle = mediaWrap.querySelector('.Polaris-IndexTable__TableCell > span');",
    "    var imageSize = imageSizesEle.innerText;",
    "    // 图片链接",
    "    var imageUrlEle = mediaWrap.querySelector('img');",
    "    // 使用正则表达式进行替换",
    "    var imageUrl = imageUrlEle.src.replace(/_60x60(\\.[a-zA-Z0-9]+(\\?v=[0-9]+)?)$/, '$1');",
    "    imageNames.push(imageName);",
    "    imageSizes.push(imageSize);",
    "    imageUrls.push(imageUrl);",
    "  });",
    "  // 创建一个二维数组，用于存储数据",
    "  var data = [imageNames, imageSizes, imageUrls];",
    "  // 将数据转换为工作簿",
    "  var ws = XLSX.utils.aoa_to_sheet(data);",
    "  // 创建工作簿",
    "  var wb = XLSX.utils.book_new();",
    "  // 将工作表添加到工作簿",
    "  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');",
    "  // 将工作簿保存为Excel文件",
    "  var excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });",
    "  var blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });",
    "  // 创建一个 <a> 元素",
    "  var a = document.createElement('a');",
    "  // 将 Blob 对象的 URL 赋值给 <a> 元素的 href 属性",
    "  a.href = URL.createObjectURL(blob);",
    "  // 设置下载文件的名称",
    "  a.download = 'exported_data.xlsx';",
    "  // 将 <a> 元素添加到文档中",
    "  document.body.appendChild(a);",
    "  // 模拟点击 <a> 元素，触发下载",
    "  a.click();",
    "  // 下载完成后从文档中移除 <a> 元素",
    "  document.body.removeChild(a);",
    "} else {",
    "  window.alert('已取消导出图片信息!');",
    "}",
    "})();"
  ], { type: 'application/javascript' });

  // 创建一个执行整个脚本的 Blob
  var executeScriptBlob = new Blob([
    "var script = document.createElement('script');",
    "script.textContent = URL.createObjectURL(arguments[0]);", // 将整个脚本 Blob 对象的 URL 赋值给 script 的 textContent 属性
    "document.head.appendChild(script);"
  ], { type: 'application/javascript' });

  // 执行整个脚本
  var executeScriptURL = URL.createObjectURL(executeScriptBlob);
  var executeScript = new Function(executeScriptURL);
  executeScript(fullScriptBlob);
})();