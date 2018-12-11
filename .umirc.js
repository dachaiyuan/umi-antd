
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        immer: true
      },
      dynamicImport: false,
      title: 'Auth Center',
      dll: true,
      routes: {
        exclude: [],
      },
      hardSource: false,
      locale: {
        enable: true, // default false
        default: 'zh-CN', // default zh-CN
        baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
      },
    }],
    ['babel-plugin-import', {
      libraryName: 'ant-design-pro',
      libraryDirectory: 'lib',
      style: true,
      camel2DashComponentName: false,
    }]
  ],
  lessLoaderOptions: {
    module: {
      rules: [{
        test: /\.less$/,
        loader: 'less-loader' // compiles Less to CSS
      }]
    }
  },
  proxy: {
    "/api": {
      "target": "http://192.168.50.50:8080",
      "changeOrigin": true,
      "pathRewrite": { "" : "" }
    }
  }
}
