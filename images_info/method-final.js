javascript:(function () {
  var downloadConfirmed = window.confirm('是否开始导出图片信息？');

  if (downloadConfirmed) {
    var mediaWraps = document.querySelectorAll('.Polaris-IndexTable__TableRow');

    if (mediaWraps.length === 0) {
      window.alert('没有图片信息导出！');
      return;
    }

    var imageData = [];

    mediaWraps.forEach(function (mediaWrap, index) {
      var imageNameEle = mediaWrap.querySelector('.Polaris-Text--bodyMd:not(.Polaris-Text--subdued)');
      var imageName = imageNameEle.innerText;
      var imageSizesEle = mediaWrap.querySelector('.Polaris-IndexTable__TableCell > span');
      var imageSize = imageSizesEle.innerText;
      var imageUrlEle = mediaWrap.querySelector('img');
      var imageUrl = imageUrlEle.src.replace(/_60x60(\.[a-zA-Z0-9]+(\?v=[0-9]+)?)$/, '$1');

      imageData.push({
        Name: imageName,
        Size: imageSize,
        Link: imageUrl,
        Index: index + 1
      });
    });

    var header = ['Index', 'Name', 'Size', 'Link'];
    var tableContent = [header];

    imageData.forEach(function (image) {
      var row = [image.Index, image.Name, image.Size, image.Link];
      tableContent.push(row);
    });

    var tabSeparatedString = tableContent.map(row => row.join('\t')).join('\n');

    var htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            table {
              border-collapse: collapse;
              width: auto;
            }
            th, td {
              border: 1px solid #dddddd;
              padding: 16px;
              text-align: left;
            }
            td {
              white-space: wrap;
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

    var blob = new Blob([htmlContent], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'exported_image_data.xls';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    window.alert('已取消导出图片信息!');
  }
})();