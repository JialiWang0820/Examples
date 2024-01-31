javascript:(function () {
  // 弹出确认框询问用户是否开始导出图片信息
  var downloadConfirmed = window.confirm('是否开始导出图片信息？');

  if (downloadConfirmed) {
    // 选择所有包含图片信息的行
    var mediaWraps = document.querySelectorAll('.Polaris-IndexTable__TableRow');

    if (mediaWraps.length === 0) {
      // 未找到,则弹出警告框并返回
      window.alert('没有图片信息导出！');
      return;
    }

    // 创建空数组,用于存取图片信息
    var imageData = [];

    mediaWraps.forEach(function (mediaWrap, index) {
      // 图片名称信息
      var imageNameEle = mediaWrap.querySelector('.Polaris-Text--bodyMd:not(.Polaris-Text--subdued)');
      var imageName = imageNameEle.innerText;
      // 图片尺寸信息
      var imageSizesEle = mediaWrap.querySelector('.Polaris-IndexTable__TableCell > span');
      var imageSize = imageSizesEle.innerText;
      // 图片链接信息
      var imageUrlEle = mediaWrap.querySelector('img');
      var imageUrl = imageUrlEle.src.replace(/_60x60(\.[a-zA-Z0-9]+(\?v=[0-9]+)?)$/, '$1');

      // 将提取的图片信息存储为对象,推入`imageData`数组
      imageData.push({
        Name: imageName,
        Size: imageSize,
        Link: imageUrl,
        Index: index + 1
      });
    });

    // 创建表格的标题行
    var header = ['Index', 'Name', 'Size', 'Link'];
    var tableContent = [header];

    // 图片信息数组中的每个对象转换为一行,并推入`tableContent`数组
    imageData.forEach(function (image) {
      var row = [image.Index, image.Name, image.Size, image.Link];
      tableContent.push(row);
    });

    // 将`tableContent`数组转换为以制表符分隔、以换行符连接的字符串
    var tabSeparatedString = tableContent.map(row => row.join('\t')).join('\n');

    // 生成包含图片信息的HTML表格字符串
    var htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
            th {
              background-color: #f2f2f2;
            }
            td {
              white-space: nowrap; /* Prevent text wrapping */
            }
          </style>
        </head>
        <body>
          <table>
            ${tableContent.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
          </table>
        </body>
      </html>
    `;

    // 使用Blog构造函数创建包含HTML内容的Blog对象,并指定MIME类型为Excel文件的MIME类型
    var blob = new Blob([htmlContent], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // 文件下载部分
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    // 导出的文件名
    a.download = 'exported_image_data.xls';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    // 用户取消导出,弹出提示框
    window.alert('已取消导出图片信息!');
  }
})();