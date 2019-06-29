

// webpack 配置文件 

console.log("webpack");



// 文件打包 和 模块化开发 
// js 处理ES6 ES7 jsx语法
// png jpg gif  iconfont 
// less css scss
// string 

var path = require("path");  // 无需安装 node 内置模块 
var htmlWebpackPlugin = require("html-webpack-plugin");  // 处理 html 文件 
var openBrowserWebpackPlugin = require("open-browser-webpack-plugin");  // 自动打开浏览器 
var extractTextPlugin = require("extract-text-webpack-plugin");  // 抽离样式
var webpack = require("webpack");

module.exports = {
    entry:["./src/main.js"],  // 入口
    output:{       // 出口 
        path:path.resolve(__dirname,"dist"),
        filename:"js/[name].[hash:8].js", // hash:8 加密得到 长度 8的字符串 阻止文件缓存 
        publicPath:"",  // 文件的公共路径
    },

    devtool:"source-map", // 方便在线调试 

    resolve:{
        alias:{   // 别名    @ ==> src 
            "@":path.resolve("src"), 
            "~":path.resolve("src/scripts")
        }
    },

    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use:["babel-loader"]
            },
            {
                test:/\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/,
                // use:["url-loader?limit=8192&name=imgs/[name].[hash:8].[ext]"]
                use:[{
                    loader:"url-loader",
                    options:{
                        limit:8192,
                        name:"imgs/[name].[hash:8].[ext]"
                    }
                }]
            },
            {
                test:/\.(css|scss)/,
                use:extractTextPlugin.extract({
                    fallback:"style-loader",   //  把 node字符串代码转为 style 节点 
                    use:[
                        "css-loader" ,   // 转换为 commonJS 规范的模块 
                        {
                            loader:"postcss-loader",  // css 代码转化 
                            options:{
                                plugins:function(){
                                    return [
                                        require("cssgrace"),  // 代码美化 
                                        require("autoprefixer"), // 自动补全 
                                    ]
                                }
                            }
                        },
                        "sass-loader"
                    ]
                })
            },
            {
                test:/\.(css|less)/,
                use:extractTextPlugin.extract({
                    fallback:"style-loader",   //  把 node字符串代码转为 style 节点 
                    use:[
                        "css-loader" ,   // 转换为 commonJS 规范的模块 
                        {
                            loader:"postcss-loader",  // css 代码转化 
                            options:{
                                plugins:function(){
                                    return [
                                        require("cssgrace"),  // 代码美化 
                                        require("autoprefixer"), // 自动补全 
                                        require("postcss-px2rem-exclude")(
                                            {
                                                // remUnit:100,   // 200px / 100  = 2rem
                                                exclude:/antd-mobile/i    // 排除UI库适配 
                                            }
                                        )
                                    ]
                                }
                            }
                        },
                        "less-loader"
                    ]
                })
            }
        ]
    },

    devServer:{   // 配置 服务器 webpack-dev-server 开发使用 
        contentBase:path.join(__dirname,"dist"),  // 服务器 作用于 dist 
        host:"0.0.0.0",
        port:8000,
        compress:true,
        hot:true,
        inline:true,
        // open:true,
        publicPath:"",
        proxy:{   // 代理
            '/react':{
                target:'http://localhost:3000',
                changeOrigin:true
            },
            '/train':{
                target:'https://api.jisuapi.com',
                changeOrigin:true
            }
        }
    },

    plugins:[   // 声明使用的插件  
        new openBrowserWebpackPlugin({url:"http://localhost:8000"}),

        new htmlWebpackPlugin({
            template:"./public/index.html",
            inject:true     // 自动注入  打包的 css 和 js 
        }),

        new extractTextPlugin({
            filename:"css/app.[hash:8].css",
            allChunks:true ,  // 打包所有样式数据
            disable:false  // 才样式抽离  
        }),

        // 自动引入  全局引入 
        new webpack.ProvidePlugin({
            React:"React",
            Component:['react','Component']
        })
    ]


    
}