require('../_lib/base.scss')
require("../_scss/avalon2-demo.scss");

/*ms-controller*/
avalon.define({
    $id: "AAA",
    name: "liger",
    color: "green"
});
avalon.define({
    $id: "BBB",
    name: "sphinx",
    color: "red"
});
avalon.define({
    $id: "CCC",
    name: "dragon", //不存在color
    color: "blue"

});
avalon.define({
    $id: "DDD",
    name: "sirenia" //不存在color

});

/*ms-important*/
avalon.define({
    $id: "aaa",
    name: "liger",
    color: "green"
});
avalon.define({
    $id: "bbb",
    name: "sphinx",
    color: "red"
});
avalon.define({
    $id: "ccc",
    name: "dragon" //不存在color

});
avalon.define({
    $id: "ddd",
    name: "sirenia" //不存在color

});
/*ms-attr*/
// var s=["1","2","sss"];
var at=avalon.define({
    $id:'attr',
    toggle:true,
    dataWidth:"true",
    dataHeight:"3px",
    obj1:{
        obj1o:"obj1o"
    },
    obj2:{
        obj2o:"obj2o"
    },
    obj3:{
        obj3o:"obj3o"
    },
    obj4:{
        obj4o:"obj4o"
    },
    array:[{aa:1,bb:2}],
    obj:{
        title: 'title',
        algin: 'left'
    }
});

console.log(at.array.length)
setTimeout(function () {
    // at.obj={
    //     title: 'title11111111111'
    // };
    at.obj.title = "title2222222";
    at.obj.algin = "left111111111111";
    at.array=[{aa:3,bb:4}];

    // at.array[0].aa="9999";
    console.log($("#pka").attr("title"))
},3000);

/*ms-css*/


/*bug*/
var vm = avalon.define({
    $id: "tests",
    test1: "点击测试按钮没反应 绑定失败"
});


// vm.one = function () { //不能再追加此方法
//     vm.test1 = "绑定成功"
//     console.log(vm.test1)
// };
// console.log(vm)