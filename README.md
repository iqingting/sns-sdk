## sns-sdk

获取第三方授权信息，以及分享的配置。依赖[UParams](https://github.com/YanagiEiichi/uparams)

#### version
0.1.0 支持微信授权，qq授权，微博授权并返回用户信息。支持微信分享配置。

1.返回用户信息

```javascript

  {
    openid: "xxx",
    name: "xxx",
    avatar: "xxx",
    eleme_key: "xxxxxxxxxxxxx",
    ...
  }

```


2.配置微信分享

```javascript

  shareParam = {
    title: 'xxx',
    desc: 'xxx',
    imgUrl: 'xxx',
    link: 'xxx'
  };
  snsSDK.share(shareParam);

```

#### Usage

#####引入

```javascript

<!-- wechat分享 -->
<script type="text/javascript"> if (/MicroMessenger/i.test(navigator.userAgent)) document.write('<script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"><\/script>'); </script>

<!-- 引入 -->
<script file="bower_components/uparams/uparams.js" src="/activities/bower_components/uparams/uparams.js"></script>

<script src="/activities/node_modules/sns-sdk/sns-sdk.js" file="node_modules/sns-sdk/sns-sdk.js"></script>

...
```

#####调用

```javascript

  switch (snsSDK.where) {
    // snsSDK.where = ['qq' || 'weixin' || 'weibo' || 'browser']
    case 'browser':
      init();
      break;
    case 'weixin':
      snsSDK.share(shareParam);
    default:
      snsSDK.getUserInfo(user => init(user));
  }

```

####other
1.属性

```javascript
  snsSDK.where;  // ['qq' || 'weixin' || 'weibo' || 'browser']
  snsSDK.params; // 获取url参数
```

2.方法

```javascript
  snsSDK.share(param);
  snsSDK.getUserInfo();
  snsSDK.authorize();
```
