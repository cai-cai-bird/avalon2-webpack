var merge = require('webpack-merge')
var webpack= require('webpack');
'use strict';

var webpack_config = require('./webpack.config.base')
// console.log(webpack_config({debug:true}))
console.log( merge(webpack_config({debug:true}), {
    devtool : "source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}));
module.exports = merge(webpack_config({debug:true}), {
    devtool : "source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})