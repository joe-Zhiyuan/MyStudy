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
    ]
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
        new ExtractPlugin('styles.[chunkhash:8].css')
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