require('../_lib/base.scss')
require('../_scss/index.scss')

// var avalon = require("avalon2");
avalon.define({
    $id: "root-index",
    name: "Hello Avalon! -  首页11sda2"
});
// console.log($)
$("<div>首页</div>").appendTo("#index");
$("#index").css({color:"red"});

//倒计时操作
var tim=avalon.define({
    $id:"Countdown",
    state:{
        start:"2016-07-20 10:00:00",
        end:"2016-07-20 16:00:00"
    },
    // time:{h:0, m:0,s:0},
    time:[0,0,0],
    GetRTime:function (a) {
        console.log(this)
        var EndTime= new Date(a);
        var NowTime = new Date();
        var t =EndTime.getTime() - NowTime.getTime();
        var h=Math.floor(t/1000/60/60%24);
        var m=Math.floor(t/1000/60%60);
        var s=Math.floor(t/1000%60);
        // console.log(this)
      // this.time.set(0,h)
      // this.time.set(1,m)
      // this.time.set(2,s)
      //   console.log(h)
      //   console.log(m)
      //   console.log(s)
      //   this.time=[h,m,s];
        return [h,m,s];

        //  this.time.h=h;
        // this.time.m=m;
        // this.time.s=s;

    }

});

setInterval(function () {
    var t=tim.GetRTime(tim.state.end);
    // tim.time.h=t[0];
    // tim.time.m=t[1];
    // tim.time.s=t[2];
    // console.log(t)
    // tim.time.set(2,t[2]);
    tim.time=t
    // console.log(tim.$model)
    // tim.GetRTime.call(tim);
},500);


