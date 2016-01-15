/**/ define('sns', ['UParams'], function (UParams) {

"use strict";

var DOMAIN = location.host.match(/\w+\.\w+$|$/)[0];
var UA = navigator.userAgent;
var parse = function parse(text) {
  try {
    return JSON.parse(text) || {};
  } catch (error) {
    return {};
  }
};

var setCookie = function setCookie(info) {
  var info = encodeURIComponent(JSON.stringify(info));
  document.cookie = 'snsInfo=' + info + '; Domain=' + DOMAIN + '; Path=/; Expires=Wed, 31 Dec 2098 16:00:00 GMT';
};

var removeCookie = function removeCookie() {
  document.cookie = 'snsInfo=; Domain=' + DOMAIN + '; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

return new function () {
  var _this = this;

  this.where = /MicroMessenger/i.test(UA) ? 'weixin' : /QQ/i.test(UA) ? 'qq' : /weibo/i.test(UA) ? 'weibo' : 'browser';
  this.params = new UParams();
  if (_this.where === 'browser') return;
  var queue = [];
  var done = function done(object) {
    object.name = object.name || object.nickname;
    object.openid = object.openid || object.id;
    object.avatar = object.figureurl_qq_1 || object.headimgurl || object.profile_image_url;
    object.eleme_key = object.eleme_key || object.key;

    if (!object.openid) return _this.authorize();
    setCookie(object);
    queue.reverse();
    while (queue.length) queue.pop()(object);
  };

  this.authorize = function () {
    removeCookie();

    var url = encodeURIComponent(location.href);
    var authorize = {};
    authorize['weixin'] = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2a416286e96100ed&redirect_uri=' + url + '&response_type=code&scope=snsapi_userinfo';
    authorize['qq'] = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101204453&redirect_uri=' + url + '&response_type=code&scope=get_user_info';
    authorize['weibo'] = 'https://api.weibo.com/oauth2/authorize?client_id=1772937595&redirect_uri=' + url + '&display=mobile';
    location.href = authorize[_this.where];
  };

  this.getUserInfo = function (callback) {
    if (queue.push(callback) > 1) return;
    if (_this.params.code) {
      (function () {
        var copy = new UParams(_this.params);
        delete copy.code;
        history.replaceState(null, null, copy);
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '//waltz.ele.me/' + _this.where + '/userinfo?code=' + encodeURIComponent(_this.params.code));
        xhr.onerror = xhr.onload = function () {
          var response = parse(xhr.responseText);
          done(response);
        };
        xhr.send();
        delete _this.params.code;
      })();
    } else {
      done(parse(decodeURIComponent(document.cookie.match(/snsInfo=([^;]*)|$/)[1])));
    }
  };

  if (_this.where !== 'weixin') return;
  this.share = function (param) {
    if (!window.wx) return;
    var list = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'];
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '//waltz.ele.me/weixin/jssign?url=' + encodeURIComponent(param.link));
    xhr.onload = function () {
      var data = parse(xhr.responseText);
      wx.config({
        appId: data.appid,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: list.slice(0)
      });
      wx.ready(function () {
        return list.forEach(function (name) {
          return wx[name](param);
        });
      });
    };
    xhr.send();
  };
}();

/**/ });
