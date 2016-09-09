/**
 * Created by sa on 16-9-6.
 */
require("../../_scss/product/study.css");
(function () {
        var vm = avalon.define({
            $id:"study",
            name:"study.html",
            content:"",
            watch:"watch",
            array:[111,222,3222,4222,5,2226,7,1,2222,3,"aaa",{name:"liuxin",age:18}],
            arr:[111,222],
            arr_new:[],
            width:200,
            height:200,
            null:undefined,
            html:"<h1>html</h1>",
            class:"active a",
            active:"active",
            hover:"hover",
            path:"https://www.google.com.hk/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
            compare:function (a) {
                if(a<222){
                    vm.arr_new.push(a);
                }
                console.log(vm.$model.arr_new);
                return a<222;
            },
            alert:function () {
                if(!this.content){
                    this.content="11111";
                }else{
                    this.content="";
                }
            }
        });

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
            name: "dragon" //不存在color

        });
        avalon.define({
            $id: "DDD",
            name: "sirenia" //不存在color

        });

        avalon.define({
            $id:"inner",
            name:"我是内嵌的controller,试试访问父级的controller"
        })

        avalon.define({
            $id: 'test',
            aaa: {
                bbb:{
                    ccc:"终于有值了"
                }
            },
            show:function (aaa,bbb,ccc) {
                if(aaa[bbb]){
                    return aaa[bbb][ccc]
                }
                return '';
            }
        })

        avalon.define({
            $id:"visible",
            toggle:true,
            visible:function () {
                this.toggle=!this.toggle;
            },
            json:{
                a:1,
                b:2,
                c:3,
                d:11
            },
            func:function (obj) {
                console.log(obj);
                if(obj=="2"){
                    return true;
                }
            },
            array:[1,2,3,4,5,6,7,8],
            arr:[{name:"liuxin",age:20,sex:"男"},{name:"liuxin1",age:201,sex:"男1"}]
        });

        var count=10;
        var event = avalon.define({
            $id:"event",
            str1:0,
            fn1:function (e) {
                console.log(e.target.innerHTML);
                event.str1=count++;
            },
            str2:0,
            fn2:function (e) {
                console.log(e);
                this.str2 +=count;
            },
            str3:0,
            fn3:function (e) {
                console.log(e);
                this.str3 +=count;
            }
        });


        var event_func = avalon.define({
            $id: "event_func",
            firstName: "liuxin",
            array: ["aaa", "bbb", "ccc"],
            argsClick: function(e, a, b) {
                alert([].slice.call(arguments).join(" "))
            },
            loopClick: function(a, e) {
                alert(a + "  " + e.type)
            },
            status: "",
            callback: function(e) {
                event_func.status = e.type
            },
            field: "",
            check: function(e) {
                event_func.field = e.target.value + "  " + e.type
            },
            submit: function() {
                var data = event_func.$model
                if (window.JSON) {
                    setTimeout(function() {
                        alert(JSON.stringify(data))
                    })
                }
            }
        })

        var form = avalon.define({
            $id:"form_test",
            aaa:"22",
            bbb:['22'],
            number:1,
            ccc:false,
            ddd:true,
            eee:"eee",
            fff:["aaa","eee","ccc"],
            num:function (e) {
                form.eee=e.target.value.replace(/[^0-9.]/g,"");
                e.target.value=form.eee;
                return form.eee;
            },
            date_abc:function (e) {
              form.bbb = avalon.filters.date(e.target.value.replace(/\D/g,""), 'yyyy-MM-dd');
            },
            validation:{
                onError: function (reasons) {
                    reasons.forEach(function (reason) {
                        console.log(reason.getMessage())
                    })
                },
                onValidateAll: function (reasons) {
                    if (reasons.length) {
                        console.log('有表单没有通过')
                    } else {
                        console.log('全部通过')
                    }
                }
            }
        })
        avalon.filters.num=function (str, args, args2) {
            return str;

        }

       avalon.define({
            $id:"checkbox",
            data:[{checked:false},{checked:false},{checked:false}],
            checked:false,
            allChecked:function (e) {
                var checked = e.target.checked;
                this.data.forEach(function (el) {
                    el.checked=checked;
                })
            },
            oneChecked:function (e) {
                var checked=e.target.checked;
                console.log(checked)
                if(!checked){
                    this.checked = checked;
                }else{
                    this.checked = this.data.every(function (el) {
                        return el.checked;
                    })
                }

            }
        })

        avalon.define({
            $id: "fruit",
            options: ["苹果", "香蕉", "桃子", "雪梨", "葡萄",
                "哈蜜瓜", "橙子", "火龙果", "荔技", "黄皮"],
            selected: "桃子"
        })
        var map = {
            "中国": ["江南四大才子", "初唐四杰", "战国四君子"],
            "日本": ["日本武将", "日本城堡", "幕府时代"],
            "欧美": ["三大骑士团", "三大魔幻小说", "七大奇迹"],
            "江南四大才子": ["祝枝山", "文征明", "唐伯虎", "周文宾"],
            "初唐四杰": ["王勃", "杨炯", "卢照邻", "骆宾王"],
            "战国四君子": ["楚国春申君黄歇", "齐国孟尝君田文", "赵国平原君赵胜", "魏国信陵君魏无忌"],
            "日本武将": ["织田信长", "德川家康", "丰臣秀吉"],
            "日本城堡": ["安土城", "熊本城", "大坂城", "姬路城"],
            "幕府时代": ["镰仓", "室町", "丰臣", "江户"],
            "三大骑士团": ["圣殿骑士团", "医院骑士团", "条顿骑士团"],
            "三大魔幻小说": ["冰与火之歌", "时光之轮", "荆刺与白骨之王国"],
            "七大奇迹": ["埃及胡夫金字塔", "奥林匹亚宙斯巨像", "阿尔忒弥斯月神殿", "摩索拉斯陵墓", "亚历山大港灯塔", "巴比伦空中花园", "罗德岛太阳神巨像"]
        }
        var linkage = avalon.define({
            $id:"linkage",
            first: ["中国", "日本", "欧美"],
            second: map['日本'].concat(),
            three: map['日本武将'].concat(),
            firstSelected: "日本",
            secondSelected: "日本武将",
            thirdSelected: "织田信长"
        })

        linkage.$watch("firstSelected",function (firstSelected) {
            linkage.second=map[firstSelected];
            linkage.secondSelected=linkage.second[0];
        });
        linkage.$watch("secondSelected",function () {
            linkage.three=map[linkage.secondSelected];
            vm.thirdSelected = vm.three[0];
        });
        vm.$watch('array.length',function (a,b,name) {
            console.log(a,b,name);//a 新值 b 旧值 name 监听的属性
            console.log(vm.$model.array)
        });

        var validate2 = avalon.define({
            $id: "validate2",
            firstname: '司徒正美',
            lastname: '',
            username: '',
            password: '',
            confirm_password: '',
            email: '',
            agree: false,
            topic: [],
            toggle: false,
            validate: {
                onError: function (reasons) {
                    reasons.forEach(function (reason) {
                        console.log(reason.getMessage())
                    })
                },
                onValidateAll: function (reasons) {
                    if (reasons.length) {
                        console.log('有表单没有通过')
                    } else {
                        console.log('全部通过')
                    }
                }
            }
        })
        avalon.validators.checked = {
            message: '必须扣上',
            get: function (value, field, next) {
                next(value)
                return value
            }
        }
        avalon.validators.selecttwo = {
            message: '至少选择两个',
            get: function (value, field, next) {
                next(!validate2.toggle || value.length >= 2)
                return value
            }
        }


        setTimeout(function () {
            vm.watch="888";
        },3000);

        console.log(vm.$model) //输出纯净的vm属性
})();
