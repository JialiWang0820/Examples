javascript:(function downloadAllImagesInfo(pageNumber = 1) {
  var allImageData = [];

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function isPageLoading() {
    return !!document.querySelectorAll('.Polaris-IndexTable__LoadingPanel')[1];
  }

  async function waitForPageToLoad() {
    while (isPageLoading()) {
      console.log('页面正在加载中，等待...');
      await wait(2000);
    }
  }

  var downloadConfirmed = window.confirm('是否开始导出图片信息？');

  if (!downloadConfirmed) {
    window.alert('已取消导出图片信息!');
    return;
  }

  async function exportImagesInfo(pageNumber) {
    await waitForPageToLoad();

    var mediaWraps = document.querySelectorAll('.Polaris-IndexTable__TableRow');

    if (mediaWraps.length === 0) {
      window.alert('当前页面没有图片信息导出！');
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
        Index: index + 1 + (pageNumber - 1) * 250
      });
    });

    allImageData.push(...imageData);

    console.log('第' + pageNumber + '页图片信息已下载完成！');

    var nextButton = document.querySelector('#nextURL');
    var hasNextPage = nextButton && !nextButton.getAttribute('aria-disabled');

    if (hasNextPage) {
      nextButton.click();
      await wait(6000);
      await exportImagesInfo(pageNumber + 1);
    } else {
      window.alert('所有图片信息已下载完成!');
      compileAndDownload();
    }
  }

  function compileAndDownload() {
    var header = ['Index', 'Name', 'Size', 'Link'];
    var tableContent = [header];

    allImageData.forEach(function (image) {
      var row = [
        image.Index, 
        image.Name,
        image.Size, 
        image.Link
      ];
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
  }

  exportImagesInfo(pageNumber);
})();
