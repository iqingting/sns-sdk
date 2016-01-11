## sns-sdk

获取第三方授权信息，以及分享的配置。依赖[UParams](https://github.com/YanagiEiichi/uparams)

#### version
0.1.0 支持微信授权，qq授权，微博授权并返回用户信息。支持微信分享配置。

#### Usage

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
