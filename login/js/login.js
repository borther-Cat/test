$(function(){
   let lis = $("input[type='radio']");
   let sigin =$(".signin-main").children();
   let loginAinput =  $("._login_name_inf");
   let loginApwd = $("._password_inf");
   let loginBtn = $("#a_checkImgCode");
   let loginBinput = $("#input_quickLogin");
   let loginBerr = $("#label_quick_login_phone");
   let loginBpwd = $(".w60");
   let rememberpwd = $("#rememberPwd2");

   let loginA = $("#ptLogin");
   let loginB = $("#loginB");
   let errMsg = $("#errMsgName");
   let errMsgPwd = $("#errMsgPwd");
   let info = $("#login_error_info");
   let num = "";

   let imageCodeVal = "";
   let valUsername = Cookie.get("username");
   let valPassword = Cookie.get("password");
   if (valUsername && valPassword) {
      $.ajax({
         type: "post",
         url: "./server/login.php",
         data: `username=${valUsername}&password=${valPassword}`,
         dataType: "json",
         success: function(response) {
             if (response.status == "success") {
               //   alert(response.data.msg);
                 window.location.href = "http://127.0.0.1/code/second_test/home/home.html";
             }
         }
      });
   }

   (new Captcha({ lineNum: 10, dotNum: 20, length: 4, fontSize: 16 })).draw(document.querySelector('#captcha'), r => {
    console.log(r, '验证++++');
    imageCodeVal = r;
   })
   lis.click(function(){
        let index =lis.index(this);
        console.log(index);
        sigin.eq(index).css("display","block").siblings().css("display","none");
   });
   loginA.click(function () {
      let isChecked = rememberpwd.is(":checked");
      let usernameLen = $("._login_name_inf").val().length;
      if(usernameLen==0){
         errMsg.text("请输入用户名");
         loginAinput.addClass("bian-02");
         errMsg.addClass("focus error");
      }else{
         let pwdLen = loginApwd.val().length;
         if(pwdLen==0){
            errMsgPwd.text("请输入密码");
            loginApwd.addClass("bian-02");
            errMsgPwd.addClass("focus error");
         }else{

            
            let phone = loginAinput.val();
            let passwordID = loginApwd.val();
            $.ajax({
               type: "post",
               url: "./server/login.php",
               data: `username=${phone}&password=${passwordID}`,
               dataType: "json",
               success: function(response) {
                   if (response.status == "success") {
                     //   alert(response.data.msg);
                        if(isChecked){
                           Cookie.set("username", phone,'/', 7);
                           Cookie.set("password", passwordID,'/', 7);
                        }
                     
                        window.location.href = "http://127.0.0.1/code/second_test/home/home.html";
                   } else {
                     if(response.data.msg == 2){
                        
                        errMsgPwd.text("密码与用户名不匹配，请重新输入！");
                        loginApwd.addClass("bian-02");
                        errMsgPwd.addClass("focus error");
                     }else if(response.data.msg == 3){
                        errMsg.text("您输入的账户名不存在，请核对后重新输入");
                        loginAinput.addClass("bian-02");
                        errMsg.addClass("focus error");
                     }
                   }
               }
           });
         }
      }
   })
   loginAinput.focus(function(){
      errMsg.text("");
      loginAinput.removeClass("bian-02");
      errMsg.removeClass("focus error");
   })
   loginApwd.focus(function(){
      errMsgPwd.text("");
      loginApwd.removeClass("bian-02");
      errMsgPwd.removeClass("focus error");
   })

   loginBtn.click(function(){
      let phoneReg = /^1[3-9]\d{9}$/; 
      
     let phoneflag = phoneReg.test(loginBinput.val().trim());
     if(!phoneflag){
         loginBerr.css("display","block");
     }else{
         if(loginBpwd.eq(0).val()!=imageCodeVal){

            $("#label_img_code").css("display","block");
         }else{
            $("#label_img_code").css("display","none");        
            $("#input_mobile_code").css("display","inline-block");
            $("#input_img_code").css("display","none");
            $("#captcha").css("display","none");
            let timeOut = 10;
            let timer = setInterval(function(){
               timeOut--;
               $("#a_checkImgCode").text(`${timeOut}秒后可重发`);
               if (timeOut == 0) {
                   $("#a_checkImgCode").css("display","none");
                   $("#a_checkImgCode").text(`确认验证码`)
                   $("#a_resendMobileCode").css("display","inline-block");
                   clearInterval(timer); 
               }
           },1000)
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
        function getRandom(min, max) {
         return parseInt(Math.random() * (max - min + 1)) + min
         }

        num = getRandom(1000, 9999);
        console.log(num);
      //   num = 999;
        $.ajax({
            type: 'post',
            url: 'http://route.showapi.com/28-1',
            dataType: 'json',
            data: {
                "showapi_timestamp": formatterDateTime(),
                "showapi_appid": '105009', //这里需要改成自己的appid
                "showapi_sign": '51084e3ee1f34d5c86af6e0e3506a8fa', //这里需要改成自己的应用的密钥secret
                "mobile": loginBinput.val().trim(),
                "content": `{\"name\":\"牛二\",\"code\":\"${num}\",\"minute\":\"3\",\"comName\":\"健一网\"}`,
                "tNum": "T150606060601",
                "big_msg": ""
            },
            error: function(XmlHttpRequest, textStatus, errorThrown) {
                alert("操作失败!");
            },
            success: function(result) {
                console.log(result) //console变量在ie低版本下不能用
               //  alert(result.showapi_res_code)
            }
        });

         }
     }
   })
   $("#a_resendMobileCode").click(function(){
      loginBpwd.eq(0).val("");
      loginBpwd.eq(1).val("") 
      $("#a_resendMobileCode").css("display","none");
      $("#input_mobile_code").css("display","none");
      $("#input_img_code").css("display","inline-block");
      $("#captcha").css("display","inline-block");
      $("#a_checkImgCode").css("display","inline");
   })
   loginB.click(function(){
      let isChecked = $("#readme2").is(":checked");
      if(!isChecked){
         info.text('请接收健一网用户协议');
      }else{
         if(loginBinput.val().length ==0){
            loginBerr.text("手机号不能为空");
            loginBerr.css("display","block");

         }else{
            if(loginBpwd.eq(1).val() == num){
               alert("登录成功！")
               window.location.href = "http://127.0.0.1/code/second_test/home/home.html";
            }else{
               $("#label_img_code").css("display","block");
            }
         }
      }
      
   })
   loginBinput.focus(function(){
      loginBerr.text("输入正确的手机号");
      loginBerr.css("display","none");
      
      
   })
   
})