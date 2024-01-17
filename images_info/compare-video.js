javascript:(function(){
  var downloadConfirmed = window.confirm('是否开始下载视频？');
  
  if (downloadConfirmed) {
      var meidiaWraps = document.querySelectorAll('.Polaris-IndexTable__TableRow_1a85o');
      console.log('meidiaWraps', meidiaWraps);
      if (meidiaWraps.length == 0) {
        window.alert('没有视频下载！');
        return
      }
      var coverImgSrcs = [];
      var videoNames = [];
      var videoTypes = [];
      var videoUrls = [];
      var host = 'https://cdn.shopify.com/videos/c/o/v/';

      meidiaWraps.forEach(function (mediaWrap) {
          var coverImgSrc = mediaWrap.querySelector('img').src;
          coverImgSrcs.push(coverImgSrc);
          var videoInfo = mediaWrap.querySelectorAll('.Polaris-Text--bodyMd_jaf4s');
          var videoName = videoInfo[0].innerText;
          var videoType = videoInfo[1].innerText.toLowerCase();
          videoNames.push(videoName), videoTypes.push(videoType);
      });

      var coverImgNames = coverImgSrcs.map(function (coverImgSrc) {
          var start = '';
          if (coverImgSrc.includes('/preview_images/')) {
              start = coverImgSrc.indexOf("/preview_images/") + "/preview_images/".length;
          } else if (coverImgSrc.includes('/products/')) {
              start = coverImgSrc.indexOf("/products/") + "/products/".length;
          }
          var end = coverImgSrc.indexOf(".thumbnail");
          return coverImgSrc.substring(start, end);
      });

      coverImgNames.forEach(function (urlName, index) {
          var videoUrl = host + urlName + '.' + videoTypes[index];
          videoUrls.push(videoUrl);
      });

      console.log('videoUrls', videoUrls);

      function downloadVideo(url, fileName, type) {
          return new Promise(function (resolve, reject) {
              if (type == 'mp4') {
                  fetch(url).then(function (response) {
                      return response.blob();
                  }).then(function (blob) {
                      var a = document.createElement('a');
                      a.href = URL.createObjectURL(blob);
                      a.download = `${fileName}.${type}`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      console.log('成功下载：', `${fileName}.${type}`);
                      resolve(`${fileName}.${type}`);
                  }).catch(function (e) {
                      console.log(`${fileName}.${type}`, '下载失败！！', '链接：', url);
                      reject(`${fileName}.${type}`);
                  });
              }
          });
      }

      var downloadPromises = [];
      videoUrls.forEach(function (videoUrl, index) {
          if (videoTypes[index] == 'mp4') {
              downloadPromises.push(downloadVideo(videoUrl, videoNames[index], videoTypes[index]));
          }
      });

      Promise.all(downloadPromises).then(function (successfulDownloads) {
          var message = '成功下载的视频数量：' + successfulDownloads.length;
          showAlert(message);
      }).catch(function (failedDownloads) {
          var message = '下载失败的视频数量：' + failedDownloads.length;
          showAlert(message);
      });

      function showAlert(message) {
          window.alert(message);
      }
  } else {
      window.alert('已取消下载!');
  }
})();