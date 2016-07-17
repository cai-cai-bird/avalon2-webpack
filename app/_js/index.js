require('../_lib/base.scss')
require('../_scss/index.scss')

// var avalon = require("avalon2");
avalon.define({
    $id: "root-index",
    name: "Hello Avalon! -  首页11sda2"
});
console.log($)
$("<div>首页</div>").appendTo("#index");
$("#index").css({color:"red"})