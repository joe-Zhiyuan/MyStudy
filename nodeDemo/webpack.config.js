const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');//打包插件

//webpack 15
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//判断是不是开发环境
const isDev = process.env.NODE_ENV === 'development';

const config = {
    target:'web',//前端项目
    entry: path.join(__dirname, "src/index.js"),
    output: {
        filename: "bundle.[hash:8].js",
        path: path.join(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.jsx$/,
                loader: "babel-loader"
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'[name]-aaa.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env':{
                //'"development"' 添加双引号是 不加报错 process.env.NODE_ENV = development
                NODE_ENV:isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
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
        'style-loader',
        'css-loader',
        {
            loader:'postcss-loader',
            options: {
                sourceMap:true,
            }
        },
        'stylus-loader'
    ]
    });
    config.devtool = '#cheap-module-eval-source-map';
    config.devServer = {
        port:8000,
        host:'0.0.0.0',
        overlay:{
            errors:true,
        },
        hot:true
        //自动打开浏览器
        //open:true
    }
    config.plugins.push(
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

    config.output.filename = '[name].[chunkhash:8].js';
    config.module.rules.push(
        {
            test: /\.styl/,
            use: ExtractPlugin.extract({
                fallback: 'style-loader',
                use:[
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options: {
                            sourceMap:true,
                        }
                    },
                    'stylus-loader'
                ]
            })
        },
    )
    config.plugins.push(
        //打包出错 不适配webpack4 安装extract-text-webpack-plugin@next contenthash改为chunkhash
        // new ExtractPlugin('styles.[contenthash  :8].css')
        new ExtractPlugin('styles.[chunkhash:8].css'),
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

module.exports = config;

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