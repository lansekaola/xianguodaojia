//表单验证
$("#register_message").validate({
    rules: {
        phoneNum:{
            required : true,
            maxlength : 11,
            rangelength:[11,11],
            number : true
        },
        password:{
            required : true,
            minlength:6,
            maxlength:9
        },
        repassword:{
            equalTo: "#password"
        }
    },
    messages: {
        phoneNum:{
            required : "请输入您的手机号",
            maxlength : "手机号码应为11位数字",
            rangelength:"移动电话必须是11位数字",
            number : "移动电话必须是数字"
        },
        password:{
            required : "密码不能为空",
            minlength: "密码最小6位",
            maxlength:"密码最长9位"
        },
        repassword:{
            equalTo: "两次密码输入不一致"
        }
    },
    success:function(label){
        label.text("").addClass("checked"); //正确的时候输出的样式为checked
    },
    submitHandler: function(form) {
        location.href="login.html";
    }
});

$(function(){
    (function init(){
        //进入前先全部清空
        $(':input','#register_message').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        setLister();
    })()
    function setLister(){
        $("#ljzc").on("click",function(){
            $("#register_message").submit();
        });
        //s 表示整个表单对象
        //var s = $("#register_message").validate();












    }
});