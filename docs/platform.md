# 多平台打包

支持`.web`、`.h5`、`.pc`、`.app`、`.android`、`.ios`等后缀。

`web`包括了`h5`、`pc`，即web相关的代码，如果没有`h5`、`pc`的差别，可以直接写在`.web`文件中，`h5`和`pc`平台将直接打包`web`文件；如果`h5`、`pc`有差异，则应该分散到`h5`、`pc`文件中，`h5`和`pc`平台分别打包不同文件。

例如打包命令`PLATFORM=h5 vite build`，`vite`的打包优先级如下：

```
index.web.js
index.h5.js
index.js
```

优先寻找`web`文件，再打包`h5`文件，如果没有找到特殊后缀的文件，则最后打包原始后缀的文件。