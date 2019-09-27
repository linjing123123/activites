//return 字符串长度
function returnLength(val){         
    var val = $.trim(val);
    return len = val.length;
}
//验证 汉字姓名
function isUserName(username){      
//  var pattern = /[\u4e00-\u9fa5]{2,14}/;
    var pattern =  /^\D\D{0,}$/;
    return pattern.test( $.trim(username) );
}
//验证手机号码
function isPhoneNo(phonenum){       
    var pattern = /^1[34578]\d{9}$/;
    return pattern.test( $.trim(phonenum) ); 
}
//验证身份证
function cardIdVerify(id) {
    if (id.length != 18) {
        return false;
    }
    var idCard_base = id.substr(0, 17);
    var verify_code = id.substr(17, 1);
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var verify_code_list = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2', 'x'];
    var total = 0;
    for (var i = 0; i < 17; i++) {
        var index = i;
        total += idCard_base.substr(index, 1) * factor[index];
    }
    var mod = total % 11;
    if (verify_code == verify_code_list[mod]) {

        return true;

    } else {
        return false;
    }
}
//邮箱 
function isEmail(email){             
    var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-z]{2,4})+$/;
    return pattern.test( $.trim(email) );
}
