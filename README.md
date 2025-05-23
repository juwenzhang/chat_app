* https://vvsqgfab4ks.feishu.cn/wiki/ZPlHwBy5vimILJkbUQecsnaenIb?from=from_copylink
* 开发文档日报总结，如果想要进行访问，可以自行申请飞书权限进行查看，只是对开发的整体流程进行了总结
* 具体的设计内容还是需要查看代码的实际实现吧

> 主要原因：因为女朋友以及完成一个有实际意义的上传保存生活日志的功能吧

> 次要原因：自身的手机内存严重不足，所以说急需一个程序来帮助自己实现代理记录生活的功能吧

## tips
* if you fork my project to your local, you need to do:
  * first: `git cloe mt_repo_link`
  * second: config node backend env variable.The variables is:
```bash
# you need to config your mongodb uri, and then copy it to the following variable
MONGODB_URI=mongodb://localhost:27017/chat_app_node
PORT=3000

# you can by useing openssl to generate a secret key, and then copy it to the following variable
JWT_SECRET=secret_key

# when you deploy your project, you need to change it to production 
NODE_ENV=development

# you need go to cloudinary to get the following variables
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```