/**
 * Created by DELL on 2016/8/21.
 */
/*************地址栏的显现隐藏**************/
$(".addr_box").mouseover(function(){
    $(".address").show();
    $(".addr_box>span>a").addClass("active");
    $(".addr_box>span>a>i").addClass("active");
});
$(".addr_box").mouseout(function(){
    $(".address").hide();
    $(".addr_box>span>a").removeClass("active");
    $(".addr_box>span>a>i").removeClass("active");
});
/*****************我的鲜果到家*************************/
$(".top_container>ul>li:nth-child(4)").mouseover(function(){
    $(".my_xianguo_tabs").show();
    $(".top_container>ul>li:nth-child(4)>a>b").addClass("active");
});
$(".top_container>ul>li:nth-child(4)").mouseout(function(){
    $(".my_xianguo_tabs").hide();
    $(".top_container>ul>li:nth-child(4)>a>b").removeClass("active");
});
/********************手机易果**********************************/
$(".top_container>ul>li:nth-child(3)").mouseover(function(){
    $(".phone_login").show();
    $(".top_container>ul>li:nth-child(3)>a>b").addClass("active");
});
$(".top_container>ul>li:nth-child(3)").mouseout(function(){
    $(".phone_login").hide();
    $(".top_container>ul>li:nth-child(3)>a>b").removeClass("active");
});
/***************************购物框***********************************/
$(".buying_box").mouseover(function(){
    $(".buying_box_container").show();
});
$(".buying_box").mouseout(function(){
    $(".buying_box_container").hide();
});

/*************************商品分类条*************************************/
$(".product_cat>ul>li").mouseover(function(){
   $(this).children("div").show();
    $(this).find("b").show();
    $(this).find("a").addClass("active");
});
$(".product_cat>ul>li").mouseout(function(){
    $(this).children("div").hide();
    $(this).find("b").hide();
    $(this).find("a").removeClass("active");
});
/******************************广告轮播******************************************/
//获取屏幕的宽
slide();
  function slide(){
      var i=1;
    var timer=setInterval(function(){
        $(".slide>ul>li:nth-child("+i+")")
            .addClass("active").siblings().removeClass("active");
        $(".slide>ul>li:nth-child("+i+")").find(".banner_img1").addClass("aa");
        $(".slide>ul>li:nth-child("+i+")").siblings().find(".banner_img1").removeClass("aa");
        i++;
        if(i==6){
            i=1;
        }
    },3500)
}
/**************************************电梯部分*************************************************/
//获取元素到顶部的距离
function getElemTop(elem){
    var sum=elem.offsetTop;
    while(elem.offsetParent!=null){
        sum+=elem.offsetParent.offsetTop;
        elem=elem.offsetParent;
    }
    return sum;
}
window.onload=function(){
    elevator.init();
}
var elevator={
    FHEIGHT:0,//每一层的高度
    UPLEVEL:0,//亮灯的上线
    DOWNLEVEL:0,
    DISTANCE:0,
    DURATION:1000,
    STEPS:100,
    interval:0,
    step:0,
    timer:null,
    moved:0,
    init:function(){
        this.interval=this.DURATION/this.STEPS;
        var style=getComputedStyle($('.floor1')[0]);
        this.FHEIGHT=
            parseFloat(style.height)
            +parseFloat(style.marginBottom)+parseFloat(style.marginTop);
        this.UPLEVEL=
            (innerHeight-this.FHEIGHT)/2;
        this.DOWNLEVEL=
            this.UPLEVEL+this.FHEIGHT;
        window.addEventListener(
            "scroll",this.light.bind(this)
        );
        $("#elevator>li").mouseover(function(){
            $(this).children("a").children("span").show();
        });
        $("#elevator>li").mouseout(function(){
            $(this).children("a").children("span").hide();
        });
        $("#elevator>li").bind(
            "click",this.scrollTo.bind(this)
        );
        $("#service-inline>li:last-child").bind(
            "click",this.scrollToTop.bind(this)
        );
    },
    light:function(){
        var floorElems=$("section>.top>a>b");
        //获得页面滚动的距离，保存在变量scrollTop
        var scrollTop=document.body.scrollTop;
        if(scrollTop>=(getElemTop(floorElems[0])-100)){
            $("#elevator").show();
            $("#service-inline>li:last-child").show();//返回顶部的
            for(var i=0;i<floorElems.length;i++){
                var elemTop=getElemTop(floorElems[i]);
                if(elemTop>=scrollTop+this.UPLEVEL && elemTop<scrollTop+this.DOWNLEVEL){
                    $("#elevator>li:nth-child("+(i+1)+")>a>span").show();
                    $("#elevator>li:nth-child("+(i+1)+")").siblings().find("a>span").hide();
                }
            }
        }else if(scrollTop<=(getElemTop(floorElems[0])-200)){
            $("#elevator").hide();
            $("#service-inline>li:last-child").hide();
        }
    },
    scrollTo:function(e){
        e.preventDefault();
        if(this.timer==null){
        var li=$(e.target).parent().attr("href");
          li=li.substr(1,li.length);//截取#号
          var floorElem=$("."+li)[0];
          var elemTop=getElemTop(floorElem);
          this.DISTANCE= elemTop-this.UPLEVEL -document.body.scrollTop;
          this.step= this.DISTANCE/this.STEPS;
          //启动周期性定时
          this.timer=setInterval(
              this.scrollStep.bind(this),
              this.interval
          );
      }
    },
    scrollToTop:function(){
        var sc=document.body.scrollTop;
        this.DISTANCE=-sc;
        this.step=this.DISTANCE/this.STEPS;
        this.timer=setInterval(
            this.scrollStep.bind(this),this.interval
        )
    },
    scrollStep:function(){//移动一步
    window.scrollBy(0,this.step);
    this.moved++;
    if(this.moved==this.STEPS){
        clearInterval(this.timer);
        this.timer=null;
        this.moved=0;
        }
    }
}