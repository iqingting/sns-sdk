## sns-sdk

获取第三方授权信息，以及分享的配置。依赖 [UParams](https://github.com/YanagiEiichi/uparams)

1. 支持微信授权，QQ 授权，微博授权并返回用户信息。
2. 支持微信分享配置。

#### 安装与使用

###### 1. 安装

```html
<!-- 判断微信浏览器，并引入微信的 SDK -->
<script>
if (/MicroMessenger/i.test(navigator.userAgent))
  document.write('<script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"><\/script>');
</script>
<!-- 引入依赖 UParams -->
<script src="/node_modules/uparams/uparams.js"></script>
<!-- 引入 sns-sdk -->
<script src="/node_modules/sns-sdk/sns-sdk.js"></script>
```

###### 2. 使用

调用平台分享功能

```js
sns.share({
  title: '分享标题',
  desc: '分享描述',
  // 注意！imgUrl 和 link 必须是以 http 或 https 开头的绝对 URL
  imgUrl: '分享图标',
  link: '分享链接'
});
```

获取用户信息（可能会跳到授权页再链接回来，导致页面重新加载）

```js
sns.getUserInfo(user => {
  /**
   # 此处 user 的值为
   {
     openid: "唯一标识符",
     name: "用户昵称",
     avatar: "头像链接",
     // ...
   }
  **/
});
```
