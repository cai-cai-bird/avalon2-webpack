var path = require('path');
var glob = require('glob');
var util = require('util');

var webpack= require('webpack');
var pkg=require("./package.json");

var ExtractTextPlugin = require('extract-text-webpack-plugin'); //提取文本
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成 html 模板
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin; //丑化
//引入路径
var node_modules = path.resolve(__dirname, 'node_modules');

//webpack/hot/only-dev-server 如果你喜欢手动更新
var webpackHot='webpack/hot/dev-server';
var webpackClient='webpack-dev-server/client?http://'+pkg.config.devHost+':'+pkg.config.devPort;

//配置模式 如果为 true 表示开发模式
var DEBUG = process.env.NODE_ENV === 'development';
var TEST = process.env.NODE_ENV === 'test';

//生成路径字符串
var jsBundle = path.join('_js', util.format('[name].%s.js', pkg.version));
var cssBundle = path.join('_css', util.format('[name].%s.css', pkg.version));

var _path = pkg.config.buildDir;

/*
   【目录设计模式】
    ./_js ,./_scss ,./_views
    模块文件
    文件名
    必须保持一致
 */
// 获取js
var entries = getEntry('app/_js/**/*.js', 'app/_js/');

//用entries 获取 html 多模块入口文件
var pages = Object.keys(entries);

if(DEBUG || TEST){

    pages.forEach(function (e) {
        entries[e].unshift(webpackClient,webpackHot)
    });

    //修改输出路径
    _path = pkg.config.buildDirTests
}

// console.log(entries);
var config = {
    // devtool : "source-map", //调试
    entry: Object.assign(entries, {
        // 用到什么公共lib（例如jquery.js），就把它加进common去，目的是将公用库单独提取打包
        'common': ['jquery','avalon2']
    }),
    resolve: {
        extensions: ['', '.js', '.json'],
        alias: {
            'jquery': path.resolve(__dirname, 'app/_lib/jQuery-3.0.0.js'),
            'avalon2':path.resolve(node_modules,'avalon2/dist/avalon.js')
        }
    },
    output: {
        path: path.join(__dirname, _path),
        publicPath: '/', //这里需要更具具体情况来配置调整 公共路径
        // publicPath: '/webpack-avalon2-seed/dist/',
        filename: jsBundle
    },
    module: {
        loaders: [
            {   test: /\.js$/,
                exclude: /node_modules/, //排除文件夹
                loader: 'babel', //解析 es6
                query:{
                    presets:['es2015']
                }
            },{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            },{
                test:/\.scss$/,
                // loaders: ['style', 'css', 'sass']
                loader: ExtractTextPlugin.extract("css!sass")
            },{
                test: /\.html$/,
                loader: "html?-minimize" //避免压缩html,https://github.com/webpack/html-loader/issues/50
            },{
                test: /\.(woff|woff2|ttf|eot|svg)(\?t=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=_fonts/[name].[ext]' //这里前缀路径 publicPath 参数为基础
            },{
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader?limit=8192&name=_images/[name]-[hash].[ext]' //这里前缀路路径 publicPath 参数为基础
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin(cssBundle, {
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            $: 'jquery', //加载$全局
            'window.avalon':'avalon2' //加载 avalon 全局 [******这里必须强制 window.avalon]
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', // 将公共模块提取，生成名为`common`的chunk
            chunks: pages, //提取哪些模块共有的部分
            minChunks: pages.length 
        }),
        (DEBUG || TEST) ? function() {} : new UglifyJsPlugin({ //压缩代码
            compress: {
                warnings: false
            },
            except: [ '$', 'exports', 'require'] //排除关键字
        })
    ],
    //使用webpack-dev-server，提高开发效率
    //启用热服务有两种 如果是 api 启动方式, 这里只是一个配置目录,不会被webpack读取,
    //只有命令行才会读取这个参数
    devServer: {
        contentBase: path.resolve( (DEBUG || TEST) ?pkg.config.buildDirTests :pkg.config.buildDir),
        host:pkg.config.devHost,
        port: pkg.config.devPort,
        hot: true,
        noInfo: false,
        inline: true,
        stats: { colors: true }
    }
};

//html 模板插件
pages.forEach(function(pathname) {

    var conf = {
        title:"呵呵",
        filename: './_views/' + pathname + '.html', //生成的html存放路径，相对于path
        template: path.resolve(__dirname, './app/_views/' + pathname + '.html'), //html模板路径
        hash: true
        /*
         * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
         * 如在html标签属性上使用{{...}}表达式，很多情况下并不需要在此配置压缩项，
         * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
         * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
         */
        /* minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }*/
    };

    if (pathname in config.entry) {
        //inject: false, //js插入的位置，true/'head'/'body'/false
        conf.inject = 'body';
        conf.chunks = ['common', pathname];
    }
    // console.log(conf)
    config.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = config;

/**
 * 获得路径
 * @param globPath: str
 * @param pathDir: str 对比路径
 * @returns {{}}
 */
function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.normalize(path.join(dirname,  basename));
        pathDir = path.normalize(pathDir);
        if(pathname.startsWith(pathDir)){
            pathname = pathname.substring(pathDir.length)
        }
        entries[pathname] = ['./' + entry];
    }
    return entries;
}


