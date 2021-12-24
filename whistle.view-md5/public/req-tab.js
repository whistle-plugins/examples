
;(function() {
  function $(selector) {
    return document.querySelector(selector);
  }

  function onClick(elem, l) {
    elem.addEventListener('click', l);
  }

  var urlTab = $('#urlTab');
  var bodyTab = $('#bodyTab');
  var urlResult = $('#urlResult');
  var bodyResult = $('#bodyResult');
  var noop = function() {};

  function showUrlMD5() {
    urlTab.className = 'active';
    bodyTab.className = '';
    urlResult.style.display = 'block';
    bodyResult.style.display = 'none';
  }

  showUrlMD5();
  onClick(urlTab, showUrlMD5);
  onClick(bodyTab, function() {
    urlTab.className = '';
    bodyTab.className = 'active';
    urlResult.style.display = 'none';
    bodyResult.style.display = 'block';
  });

  var wb = window.whistleBridge;
  var cgiOpts = {
    url: 'cgi-bin/md5',
    type: 'post',
    mode: 'cancel'
  };
  var getUrlMD5 = wb.createRequest(cgiOpts);
  var getBodyMD5 = wb.createRequest(cgiOpts);

  wb.addSessionActiveListener(function(item) {
    if (!item) {
      urlResult.innerHTML = '请选择抓包数据';
      bodyResult.innerHTML = '请选择抓包数据';
      return;
    }
    bodyResult.innerHTML = '计算中...';
    var loadMD5 = function() {
      urlResult.innerHTML = '计算中...';
      urlResult.onclick = noop;
      getUrlMD5({ text: item.url }, function(data) {
        if (!data) {
          urlResult.onclick = loadMD5;
          urlResult.innerHTML = '请求失败，请点击<strong>重试</strong>！';
          return;
        }
        urlResult.innerHTML = data.md5;
      });
    };
    loadMD5();
  });
  wb.addSessionReadyListener(function(item) {
    if (!item) {
      return;
    }
    var base64 = item.req.base64;
    if (!base64) {
      bodyResult.innerHTML = 'Body 为空';
      return;
    }
    var loadMD5 = function() {
      bodyResult.innerHTML = '计算中...';
      bodyResult.onclick = noop;
      getBodyMD5({ base64: base64 }, function(data) {
        if (!data) {
          bodyResult.onclick = loadMD5;
          bodyResult.innerHTML = '请求失败，请点击<strong>重试</strong>！';
          return;
        }
        bodyResult.innerHTML = data.md5;
      });
    };
    loadMD5();
  });
})();
