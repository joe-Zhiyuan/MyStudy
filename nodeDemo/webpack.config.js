const path = require('path');//path是node.js中的基本包，用来处理路径
const HTMLPlugin = require('html-webpack-plugin');//引入html-webpack-plugin
const webpack = require('webpack');//引入webpack
const ExtractPlugin = require('extract-text-webpack-plugin');//打包插件

//webpack 15
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//判断是不是开发环境
const isDev = process.env.NODE_ENV === 'development';//判断是否为测试环境，在启动脚本时设置的环境变量都是存在于process.env这个对象里

const config = {
    target:'web',   //前端项目  webpack的编译目标平台
    entry: path.join(__dirname, "src/index.js"),    //声明js文件入口,__dirname就是我们文件根目录，用join()拼接
    output: {   //声明出口文件
        filename: "bundle.[hash:8].js", //将挂载的App全部打包成一个bundle.js 在浏览器中直接运行的代码
        path: path.join(__dirname, "dist"), //bundle.js的保存位置
    },
    module: {   //因为webpack只能处理js文件 只识别ES5的语法，所以针对不同文件我们定义不同的识别规则，最终目标打包成js文件
        rules: [
            {
                test: /\.vue$/,     //  处理 .vue文件
                loader: "vue-loader"
            },
            {
                test: /\.jsx$/,     //  处理 jsx文件
                loader: "babel-loader"
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //         'style-loader',   //将css的样式写入到html里面去
            //         'css-loader'      //处理css文件
            //     ]
            // },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,   // 处理图片
                use:[
                    {                           //loader可以配置选项 如options
                        loader:'url-loader',    //url-loader实际依赖file-loader,file-loader处理玩文件可以保存为一个文件供处理
                        options:{
                            limit:1024,     //url-loader的好处可以加一个限制大小，对于小图片在范围内可以直接将图片转换为base64码直接存放在js中减少http请求
                            name:'[name]-aaa.[ext]' //输出文件名字 [name]文件原名 [ext]文件扩展名
                        }
                    }
                ]
            }
        ]
    },
    plugins: [  //主要作用在此处根据isdev配置process.env 一是可以在js代码中获取process.env
                //二是webpack根据process.env如果是development 会给一些特殊的错误提醒 这些特殊提醒是在正式环境不需要的
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env':{
                //'"development"' 添加双引号是 不加报错 process.env.NODE_ENV = development
                NODE_ENV:isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()  //引入HTMLPlugin
    ],
    //webpack4 打包代码
    optimization: {
        splitChunks:{
            cacheGroups: {
                commons:{
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                }
            }
        }
    }
};
//获取到运行标识
if(isDev){
    config.module.rules.push({ //css单独打包
        test:/\.styl/,
            use:[
        'style-loader',         //  css写入html中
        'css-loader',           //  css-loader处理css
        {
            loader:'postcss-loader',
            options: {
                sourceMap:true, // stylus-loader和postcss-loader自己都会生成sourceMap如果前面stylus-loader已经生成了sourceMap postcss-loader直接引用前面的sourceMap
            }
        },
        'stylus-loader'  //处理stylus的css预处理器 转换为css后抛给上一层css-loader
    ]
    });     //测试环境下配置
    config.devtool = '#cheap-module-eval-source-map';   //官方推荐使用 显示代码和我们项目代码会基本相似，不会显示为编译后代码
    config.devServer = {        //devServer的配置实在webpack2后引入
        port:8000,      //  访问的端口号
        host:'0.0.0.0', //   可以设置0,0,0,0    设置后可以通过127,0,0,1 或者localhost去访问
        overlay:{
            errors:true,    //  编译中错误会显示到网页中
        },
        hot:true    //  在单页面应用开发中 我们修改代码后整个页面都刷新 启动hot后只刷新对应组件
        //项目启动时自动打开浏览器
        //open:true
    }
    config.plugins.push(        //添加两个插件用于 hot:true的配置
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}else{
    // 打包配置文件 插件
    config.entry = {
        app: path.join(__dirname, "src/index.js"),
        vendor: ['vue']
    }
    //webpack4

    //此处是chunkhash 因为用hash时app和vendor的hash码是一样的了，这样每次业务更新vendor也会更新，也就没有意义了
    config.output.filename = '[name].[chunkhash:8].js';
    config.module.rules.push(
        {
            test: /\.styl/,
            use: ExtractPlugin.extract({
                fallback: 'style-loader',
                use:[
                    'css-loader',   //css-loader处理css
                    {
                        loader:'postcss-loader',
                        options: {      //stylus-loader和postcss-loader自己都会生成sourceMap如果前面stylus-laoder已经生成了sourceMap那么postcss-loader可以直接引用前面的sourceMap
                            sourceMap:true,
                        }
                    },
                    'stylus-loader' //处理stylus的css预处理器 转换为css后抛给上一层的css-loader
                ]
            })
        },
    )
    config.plugins.push(
        //打包出错 不适配webpack4 安装extract-text-webpack-plugin@next contenthash改为chunkhash
        // new ExtractPlugin('styles.[contenthash  :8].css')
        new ExtractPlugin('styles.[chunkhash:8].css'),  //定义打包分离出的css文件名
        // //放在下一个前面 webpack4.0废除 在上边↑
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor'
        // }),
        // // webpack单独打包 避免打包后加入新模块id导致的变化
        // //理论上只要文件内容没变，chunkhash 就不会变。但是 webpack 会在打包完的 bundle 中插入 runtime 代码
        // //即使文件内容没变，但 runtime 可能会变，导致 chunkhash 改变，所以才要把 runtime 单独拆分出来
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'runtime'
        // })
    )
}

module.exports = config;    //声明一个config的配置 用于对外暴露

//weback 14
// module.exports = {
//     entry:path.join(__dirname, 'src/index.js'),
//     output: {
//         filename: "bundle.js",
//         path: path.join(__dirname, 'dist')
//     },
//     module: {
//         rules: [
//             {
//                 test:/.vue$/,
//                 loader: "vue-loader"
//             }
//         ]
//     }
// };