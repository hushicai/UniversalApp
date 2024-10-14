# UniversalApp

全栈应用框架，支持app、h5、pc等多平台，按[平台](./docs/platform.md)打包。

app端基于react-native框架。

web端基于react-native-web进行web化，本地开发使用`vitejs`，极致的开发体验。

打包顺序：

```
xx.[CONTAINER].js > xx.[TARGET].js > xx.js
```
其中CONTAINER可取App、H5、PC等，TARGET一般区分RN或Web。

这样就可以做到按照文件级别拆分不同平台的代码。


## web

```
npm run start:web
```

## h5

```
npm run start:h5
```

## pc

```
npm run start:pc
```

## app

```
npm run start:app
```
