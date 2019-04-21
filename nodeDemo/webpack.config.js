const path = require('path');

//vue-loader 15
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
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
                test: /\.css$/,
                use:[
                    "style-loader",
                    "css-loader"
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
        new VueLoaderPlugin()
    ]
}
//vue-loader 14
// module.exports = {
//     entry: path.join(__dirname,'src/index.js'),
//     output:{
//         filename:'bundle,js',
//         path: path.join(__dirname,'dist')
//     },
//     module:{
//         rules:[
//             {
//                 test:/.vue$/,
//                 loader:'vue-loader'
//             }
//         ]
//     }
// }