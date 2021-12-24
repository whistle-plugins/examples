
;(function() {
  function $(selector) {
    return document.querySelector(selector);
  }

  var content = $('#content');
  var noop = function() {};


  var wb = window.whistleBridge;
  var cgiOpts = {
    url: 'cgi-bin/md5',
    type: 'post',
    mode: 'cancel'
  };
  var getBodyMD5 = wb.createRequest(cgiOpts);

  wb.addSessionActiveListener(function(item) {
    if (!item) {
      content.innerHTML = '请选择抓包数据';
      return;
    }
    content.innerHTML = '计算中...';
  });
  wb.addSessionReadyListener(function(item) {
    if (!item) {
      return;
    }
    var base64 = item.res.base64;
    if (!base64) {
      content.innerHTML = 'Body 为空';
      return;
    }
    var loadMD5 = function() {
      content.innerHTML = '计算中...';
      content.onclick = noop;
      getBodyMD5({ base64: base64 }, function(data) {
        if (!data) {
          content.onclick = loadMD5;
          content.innerHTML = '请求失败，请点击<strong>重试</strong>！';
          return;
        }
        content.innerHTML = data.md5;
      });
    };
    loadMD5();
  });
})();
