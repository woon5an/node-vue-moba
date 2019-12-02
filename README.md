# node-vue-moba
node+vue学习


首先是安装node.js，因为这个项目要用到vue-cli3，vue-cli3是基于webpack搭建的，所以需要安装node9以上的环境

下面是安装node时踩得坑：
之前安装npm的时候都是点默认安装，模块都装在c盘，看了网上的很多教程建议装到其他盘然后要把node_global、node_cache装到该目录下。
于是开始了一系列的XX模块不是内部命令的提示，就是环境变量配置的问题，经历了一个反复重装node、配环境变量的黑暗下午总算是搞定了，遇到这个问题的朋友可以看看这篇教程 https://blog.csdn.net/qq_36648555/article/details/78460648
