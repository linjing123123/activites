jQuery.fn.extend({
    //全选
    allCheck : function(){
        return this.each(function(){
            this.checked = true;
        })
    },
    //全不选
    allNotCheck : function(){
        return this.each(function(){
            this.checked = false;
        })
    },
    //反选
    reCheck : function(){
        return this.each(function(){
            this.checked = !this.checked;
        })
    },
    //最小
    min:function(a,b){
        return a < b ? a : b;
    },
    //最大
    max: function(a, b) {
        return a > b ? a : b;
    },
    //数组中最小
    minArry: function(arry){
        return Math.min.apply(null,arry);
    },
    //数组中最大
    maxArry: function(arry){
        return Math.max.apply(null,arry);
    },

});

//返回链接中的某个参数值
function getQuerySrting(name) {
    var search = location.search.substring(1).split('&');
    var value = false;
    for (var i = 0;i < search.length;i++) {
        var keyValue = search[i].split('=');
        if (keyValue[0] == name) {
            value = keyValue[1];
        }
    }
    return value;
}

/***
功能：format：格式化时间。
用法：
yourdate.format("你的日期格式");
例子:
    obj0 = new Date("Sun May 04 2008").format("yyyy-MM-dd");
    obj1 = new Date().format("yyyy-MM-dd hh:mm:ss");
    obj2 = new Date().format("yyyy-MM-dd");
    obj3 = new Date().format("yyyy/MM/dd");
    obj4 = new Date().format("MM/dd/yyyy");
*****/
Date.prototype.format = function(format){
   var o = {
     "M+" : this.getMonth()+1, //month
     "d+" : this.getDate(),    //day
     "h+" : this.getHours(),   //hour
     "m+" : this.getMinutes(), //minute
     "s+" : this.getSeconds(), //second
     "q+" : Math.floor((this.getMonth()+3)/3), //quarter
     "S" : this.getMilliseconds() //millisecond
   }
    if(/(y+)/.test(format)){
        format=format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(format)){
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
}

//JS判断两个日期大小 适合 2012-09-09 与2012-9-9 两种格式的对比
//得到日期值并转化成日期格式，replace(/\-/g, "\/")是根据验证表达式把日期转化成长日期格式，这样再进行判断就好判断了
function ValidateDate(beginDate,endDate) {
    if (beginDate.length > 0 && endDate.length>0) {
        var sDate = new Date(beginDate.replace(/\-/g, "\/"));
        var eDate= new Date(endDate.replace(/\-/g, "\/"));
        if (sDate > eDate) {
            return false;
        }else{
            return true;
        }
    }
}

//return 字符串长度
function returnLength(val){
    var val = $.trim(val);
    return len = val.length;
}
//根据身份证判断性别 都以18位第二代身份证
function matchSex(cardnum){
    var sexnum = cardnum.substr(16,1);
    return (sexnum%2)==1?1:2;   //1:男   2：女
}
//根据身份证匹配生日 都以18位第二代身份证
function matchBirthday(cardnum){
    var year = cardnum.substr(6,4);
    var month = cardnum.substr(10,2);
    var day = cardnum.substr(12,2);
    var birthday = year+'-'+month+'-'+day;
    return birthday;
}
//根据年月日获取得到年龄
function ages(str) {
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null)
        return   false;
    var d = new Date(r[1], r[3] - 1, r[4]);
    if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4])
    {
        d = new Date();
        var nowMonth = d.getMonth() + 1;
        var nowDay = d.getDate();
        //console.log(nowMonth, r[3], nowDay, r[4]);
        var Y = new Date().getFullYear();
        if (nowMonth < r[3]) {
            return (Y - r[1]) - 1;
        } else if (nowMonth == r[3] && nowDay < r[4]) {
            return (Y - r[1]) - 1;
        }
        return Y - r[1];
    }
    return("输入的日期格式错误！");
}
function isFlight(flight){
	var pattern=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{1,7}$/;;
    return pattern.test( $.trim(flight) );
}

//通用的导航栏切换
$(".js-mt .js-child").on("click",function() {
	if($(this).hasClass("active")){
		return;
	}
	var obj = $(this);
	var i = $(this).index();
	obj.addClass("active").siblings().removeClass("active");
	obj.parents(".js-mt").siblings(".js-mc").find(".js-child").hide().eq(i).show();
});

//正则表达式校验
$.extend({
    isName:function(name){
//      return true;
        
        var pattern=/[^\d]+/;
        var nameFlag=true;
        name=name.trim();
        if(name.length==0){
        	nameFlag=false;
        }
        for(var i=0;i<name.length;i++){
            if(!pattern.test(name.charAt(i))){
             nameFlag=false;
            }
        }
        return nameFlag;
    },
    isNameTwo:function(name){
        name=name.replace(/\.|。/g,"·")//英文点和句号点替换成中间点
        var pattern=/^([\u4e00-\u9fa5]+·{0,1}[\u4e00-\u9fa5]+)$/; 
        if(pattern.length > 14) return false;
        // var pattern=/^([\u4e00-\u9fa5]){2,7}$/;
        return pattern.test( $.trim(name) );
    },
    isID:function(id){
        if(id.length!=18){
            return false;
        }
        var idCard_base=id.substr(0,17);
        var verify_code=id.substr(17,1);
        var factor=[7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var verify_code_list=['1', '0', 'X','9', '8', '7', '6', '5', '4', '3', '2','x'];
        var total=0;
        for(var i=0;i<17;i++){
            var index=i;
            total+=idCard_base.substr(index,1)*factor[index];
        }
        var mod=total%11;
        if(verify_code==verify_code_list[mod]){
           
            return true;
            
        }else {
           
            return false;
        }
    },
    isSex:function(id){
        if(id.length!=16&&id.length!=18){
            return 0;
        }
        var sexNum=id.substr(16,1);
        return sexNum%2==1?1:2;
    },
    isPhone:function(phone){
        var pattern = /^1[34578]\d{9}$/;
        if(pattern.test(phone)){
            return true;
        }else {
            return false;
        }
    },
    isEmail:function(email){
        var pattern=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-z]{2,4})+$/;
        if(pattern.test(email)){
            return true;
        }else {
            return false;
        }
    },
    isFlight:function(flight){
    	var pattern=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{1,7}$/;
        if(pattern.test(flight)){
            return true;
        }else {
            return false;
        }
    },
    isMoney:function(money){
    	var pattern= /^([1-9][\d]{1,}|0)(\.[\d]{1,})?$/;
        if(pattern.test(money)){
            return true;
        }else {
            return false;
        }
    }
    
});

//验证 汉字姓名
function isUserName(username){      
    var pattern = /[\u4e00-\u9fa5]{2,14}/;
    return pattern.test( $.trim(username) );
//	var pattern =  /^\D\D{0,}$/;
//	return pattern.test( $.trim(username) );
}
//验证手机号码
function isPhoneNo(phonenum){       
    var pattern = /^1[34578]\d{9}$/;
    return pattern.test( $.trim(phonenum) ); 
}
//验证身份证 
function isCardNo(card) {           
//  var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
//  return pattern.test( $.trim(card) ); 
	var idCard_base=card.substr(0,17);
    var verify_code=card.substr(17,1);
    var factor=[7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var verify_code_list=['1', '0', 'X','9', '8', '7', '6', '5', '4', '3', '2','x'];
    var total=0;
    for(var i=0;i<17;i++){
        var index=i;
        total+=idCard_base.substr(index,1)*factor[index];
    }
    var mod=total%11;
    if(verify_code==verify_code_list[mod]){
       
        return true;
        
    }else {
       
        return false;
    }
} 
//密码 匹配6到14位的字母和数字组成
function isPassword(pass){          
    var pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/;
    return pattern.test( $.trim(pass) );
}
//邮箱 
function isEmail(email){             
    var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-z]{2,4})+$/;
    return pattern.test( $.trim(email) );
}

//弹窗 有确定与取消
(function ($, window, document, undefined) {
    $.extend({
        /* 提示框插件 */
        myAlert: function (opts) {
            this.defaults = {
            	type: 4, //弹出模式  1 定时关闭 2 确定取消  3 确定  4 无背景 5 加载中 
                title: "",  //标题
                text:"加载中···",    //内容
                width: 'auto',
                height: 'auto',
                time: 2000,     //显示持续时间  
                isLock:false,   //是否锁屏  遮罩层                  
                sureFn: function(){     //确定回调
                   
                },   
                cancelFn: function(){   //取消回调
                    
                }
            };
            this.options = $.extend({}, this.defaults, opts);
            var _this = this;            
            var cssTxt = '';
            if(_this.options.type==4){
                cssTxt = 'width:'+ _this.options.width +';height:'+_this.options.height+';background-color:rgba(0,0,0,0);';
            }else{
                cssTxt = 'width:'+ _this.options.width +';height:'+_this.options.height;
            }
            var strHtml = '';
                strHtml = '<div id="alertBox" class="alertBox" style="'+ cssTxt +'">';
            if(_this.options.title != ''){
                strHtml += '<div class="alertTitle">'+ _this.options.title +'</div>';
            }
                strHtml += '<div class="alertHtml">'+ _this.options.text +'</div>';
                strHtml += '<div class="alertBtn">';
            if( _this.options.type==2 ){
                strHtml += '<input id="alertBtn2" type="button" value="取消">';
                strHtml += '<input id="alertBtn1" type="button" value="确定">';
            }
            if( _this.options.type==3 ){
                strHtml += '<input id="alertBtn1" type="button" value="确定" style="margin-left:0">';
            }
            if( _this.options.type==6 ){
            	strHtml += '<span id="alertBtn2" class="aclose-btn">x</span>';
                strHtml += '<input id="alertBtn1" type="button" value="去购买">';
            }
            strHtml += '</div></div>';
            if(_this.options.isLock){
                strHtml += '<div id="fixed" class="fixed"></div>';
            }  
            if($('#alertBox')||$('#fixed')){    //如果页面已经存在alert
                $('#alertBox').remove();
                $('#fixed').remove();
            }  
            if(_this.options.type==1){    
                $('body').append(strHtml);
                $('#alertBox').delay(_this.options.time).fadeOut(function(){
                    closeFn();
                });  
                $('#fixed').show();
            }else{
                $('body').append(strHtml);
                $('#alertBox').fadeIn();
                $('#fixed').show();
            }
            $('#alertBtn1').on('click',function(){
                _this.options.sureFn();
                closeFn();
            })
            $('#alertBtn2').on('click',function(){
                _this.options.cancelFn();
                closeFn();
            })
            function closeFn(){
                $('#alertBox').remove();
                $('#fixed').delay(100).fadeOut(function(){
                    $(this).remove();
                })
            }
            $("#fixed").on('touchstart',function(){
				closeFn();
			})
        }
    });
}(jQuery, window, document));



