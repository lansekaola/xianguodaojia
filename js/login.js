$("#login_form").validate({
    rules: {
        username:{
            required : true,
            rangelength:[11,11],

        },
        password:{
            required : true,
            minlength:6,
            maxlength:9
        }
    },
    messages: {
        username:{
            required : "用户名不能为空!",
            rangelength:"移动电话必须为11位"
        },
        password:{
            required : "密码不能为空",
            minlength: "密码最小6位",
            maxlength:"密码最长9位"
        }
    },
    errorPlacement: function(error, element) {
        error.appendTo(element.next().css("color","#f00").css('fontSize','16px'));
    },
    //页面验证后的回调，可以执行ajax请求，页面跳转等操作
    submitHandler: function(form) {
        location.href="index.html";
    }
});

$(function(){
    (function init(){
        //页面初始化的东西放在init方法中
        //进入前表单先全部清空
        // $("#login_form").reset();
        $(':input','#login_form').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        //页面监听动作
        setLister();
    })();

    function setLister(){
        $("#loginBtn").on("click",function () {
            $("#login_form").submit();
        });
    }
});