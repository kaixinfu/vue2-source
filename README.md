## 用于调试 vue2 源码的项目

### 迁出 vue 项目

```
git clone https://github.com/vuejs/vue.git
```

```
npm i
```

```
npm i -g rollup
```

### 在 package.json 添加打包脚本

--sourcemap 必不可少，只有加了这个参数，看的的才是源文件

```
"debug": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev"
```

### 生成源文件

```
 npm run debug
```

### 创建调试文件，examples/commits/index.html

就可以使用 vscode open with server 调试了
