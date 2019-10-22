$(function(){

    let phoneInput = $(".bk_default").eq(0);
    let passwordAInput = $(".bk_default").eq(1);
    let passwordBInput = $(".bk_default").eq(2);
    let imageCodeInput = $(".bk_default").eq(3);
    let imageBtn = $("#imgBtn").eq(0);
    let btn = $(".btn-ljzc").eq(0);

    let passwordVal = "";
    let imageCodeVal = "";
    let phonewordVal = "";
    let num="";
    let flagA = false;
    let flagB = false;

    let phoneReg = /^1[3-9]\d{9}$/; 

    (new Captcha({ lineNum: 10, dotNum: 20, length: 4, fontSize: 16 })).draw(document.querySelector('#captcha'), r => {
        console.log(r, '验证++++');
        imageCodeVal = r;
    });
    // 验证手机号码
    phoneInput.blur(function () {
        var val = $(this).val().trim();
        
        if(val.length==0){
            $(this).next().html('<em class="ico"></em>手机号码不能为空！')
            $(this).css("border","1px solid #c40000");
        }else{
            if(!phoneReg.test(val)){
                $(this).next().html('<em class="ico"></em>手机号码格式不正确！')
                $(this).css("border","1px solid #c40000");
            }else{
                $(this).next().next().addClass("correct")
            }
        }
        phonewordVal = val;
      })
    phoneInput.focus(function () { 
        $(this).next().html('');
        $(this).css("border","none");
        $(this).next().next().removeClass("correct")
        
    })
    // 验证密码
    passwordAInput.blur(function () {
        var val = $(this).val().trim();
        if(val.length==0){
            $(this).next().next().html('<em class="ico"></em>密码不能为空！')
            $(this).css("border","1px solid #c40000");
        }else if(val.length < 6 || val.length > 20 ){
            $(this).next().next().html('<em class="ico"></em>6-20个大小写英文字母，符号或数字！')
            $(this).css("border","1px solid #c40000");
        }else{
            $(this).next().next().next().addClass("correct")
            flagA = true;
             passwordVal = val;
             
        }
        
    })
    passwordAInput.focus(function () { 
        $(this).next().next().html('');
        $(this).css("border","none");
        $(this).next().next().next().removeClass("correct")
        
    })
    passwordAInput.on('input', function(){
       
        checkCode($(this).val().trim());
    })
  
    function checkCode(text) {
        let hasNumber = false;
        let hasCharA = false;
        let hasCharB = false;
        let hasUchar = false;
        for (var i = 0, len = text.length; i < len; i++) {
            var code = text.charCodeAt(i);
            if (code >= 48 && code <= 57) {
                /* 数字 */
                hasNumber = true;
                continue;
            }else if (code >= 97 && code <= 122) {
                /* 小写字母 */
                hasCharA = true;
                continue;
            }else if (code >= 65 && code <= 90) {
                /* 大写字母 */
                hasCharB = true;
                continue;
            }else{
                hasUchar = true;
                continue;
            }
        }
        if(text.length >5 ){
            if(hasUchar&&hasNumber && hasCharA && hasCharB){
                $("#aqStyle")[0].className = "cd-03";
            }else if(hasUchar&&hasNumber && hasCharA ||hasNumber && hasCharA && hasCharB||hasUchar&& hasCharA && hasCharB||hasUchar&&hasNumber &&hasCharB){
                $("#aqStyle")[0].className = "cd-02";
            }else{
                $("#aqStyle")[0].className = "cd-01";
            }

        }
    }
    // 确认密码
    passwordBInput.blur(function(){
        var val = $(this).val().trim();
 
        
        if (val.length == 0) {
            $(this).next().html('<em class="ico"></em>请再次输入密码！')
            $(this).css("border","1px solid #c40000");
        } else {
            if (passwordVal != val) {
                $(this).next().html('<em class="ico"></em>两次密码输入不一致，请重新输入！')
                $(this).css("border","1px solid #c40000");
            } else {
                $(this).next().next().addClass("correct");
                flagB = true;
            }
        }
    })
    passwordBInput.focus(function () { 
        $(this).next()  .html('');
        $(this).css("border","none");
        $(this).next().next().removeClass("correct");
        
    })
    // 图片验证码
    imageBtn.click(function(ele) {
        ele.preventDefault();
        // $(".content_l input").trigger("blur");
        var val = imageCodeInput.val().trim();
        if($(this).hasClass("btn1")){
            console.log(phonewordVal.length);
            
            if(phonewordVal.length < 11){
                $(this).next().html('<em class="ico"></em>请输入正确的手机号！') 
                $(this).prev().prev().css("border","1px solid #c40000");
                phoneInput.next().html('<em class="ico"></em>手机号码格式不正确！')
                phoneInput.css("border","1px solid #c40000");
            }else{
                if(val.length==0){
                    $(this).next().html('<em class="ico"></em>请输入验证码') 
                    $(this).prev().prev().css("border","1px solid #c40000");
                }else if(val==imageCodeVal){
                    $(this).prev().css("display","none");
                    $(this).prev().prev().val("");
                    $(this).css("left","100px")
                    $(this).text("获取短信验证码");
                    this.className = "btn2"
                }else{
                    $(this).next().html('<em class="ico"></em>验证码错误！') 
                    $(this).prev().prev().css("border","1px solid #c40000");
                }
            }
        }else if($(this).hasClass("btn2")){
            let timeOut = 10;
             let timer = setInterval(function(){
                timeOut--;
                imageBtn.text(`${timeOut}秒后可重发`);
                if (timeOut == 0) {
                    imageBtn.text(`重新获取短信验证码`);
                    imageBtn[0].className = "btn3"
                    console.log(this);
                    
                    clearInterval(timer);
                    
                }
            },1000)
            function getRandom(min, max) {
                return parseInt(Math.random() * (max - min + 1)) + min
            }

            function formatterDateTime() {
                var date = new Date()
                var month = date.getMonth() + 1
                var datetime = date.getFullYear() +
                    "" // "年"
                    +
                    (month >= 10 ? month : "0" + month) +
                    "" // "月"
                    +
                    (date.getDate() < 10 ? "0" + date.getDate() : date
                        .getDate()) +
                    "" +
                    (date.getHours() < 10 ? "0" + date.getHours() : date
                        .getHours()) +
                    "" +
                    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                        .getMinutes()) +
                    "" +
                    (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                        .getSeconds());
                return datetime;
            }

            num = getRandom(1000, 9999);
            console.log(num);
            // num = 999;
            $.ajax({
                type: 'post',
                url: 'http://route.showapi.com/28-1',
                dataType: 'json',
                data: {
                    "showapi_timestamp": formatterDateTime(),
                    "showapi_appid": '107342', //这里需要改成自己的appid
                    "showapi_sign": '4a3e0090dd004bc3b86bcd37a0bb61e1', //这里需要改成自己的应用的密钥secret
                    "mobile": phoneInput.val().trim(),
                    "content": `{\"name\":\"牛二\",\"code\":\"${num}\",\"minute\":\"3\",\"comName\":\"健一网\"}`,
                    "tNum": "T150606060601",
                    "big_msg": ""
                },
                error: function(XmlHttpRequest, textStatus, errorThrown) {
                    alert("操作失败!");
                },
                success: function(result) {
                    console.log(result) //console变量在ie低版本下不能用
                    // alert(result.showapi_res_code)
                }
            });

        }else if($(this).hasClass("btn3")){
            $(this).prev().css("display","inline-block");
            $(this).css("left","180px");
            $(this).text("确认验证码");
            this.className = "btn1"
        }
        
        
          
    })
    imageCodeInput.focus(function(){
        $(this).next().next().next().html('');
        $(this).css("border","1px solid #e2e2e2");
    })
    // 注册
    btn.click(function(ev){
        ev.preventDefault();
        // let getNum = imageCodeInput.val().trim();
        let isChecked = $(".checkbox").is(":checked");
        let getNum = num;   
        if(getNum != num){
            $("#checkCode").html('<em class="ico"></em>验证码不正确');
            $("#checkCode").prev().prev().prev().css("border","1px solid #c40000");
        }else{
            if(!isChecked){
                alert("请阅读并同意用户协议");
                return;
            }else{
                if(!(flagA&&flagB)){
                    alert("请完善信息");
                    return;
                }else{
                    console.log("--------OK---------------");
                    $.ajax({
                        type: "post",
                        url: "./server/register.php",
                        data: `phone=${phonewordVal}&password=${passwordVal}`,
                        dataType: "json",
                        success: function(response) {
                            // console.log(response);
                            if (response.status == "success") {
                                alert(response.data.msg);
                                 window.location.href = "http://127.0.0.1/code/second_test/home/home.html";
                            } else {
                                alert(response.data.msg);
                            }
                        }
                    });
                }
            }
        } 
    })

})