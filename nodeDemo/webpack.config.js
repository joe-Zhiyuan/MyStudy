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
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
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
                test: /\.css$/,
                exclude: /node_modules/,
                use:[
                    // 'style-loader',
                    // 'css-loader'
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
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