

/* lq******上拉滑动加载 封装*****************/
(function(){
    console.log('commonssss')
  var scrollLoad = function(options){ 	
    this.options = $.extend({
      container:'wrapper',// 滚动外城容器  id属性， 容器里面一级子集只能是一个div   isRequired
      pullUpLabel:'.pullup', // 滚动时候 显示的loading标致  class 属性    必须,  isRequired
      scrollBool:true, // 是否要滚动  如果第一页的数目已经》= 总的数据条数，则不需要滚动加载 
      ajaxUrl:'',  //ajax 请求地址
      ajaxType:'Get', //ajax 请求方式
      ajaxPageName:'', //ajax 请求除了主要的page的key名  isRequired
      ajaxPageCount:'2', // ajax 初始页数
      ajaxElseData:{}, //ajax 请求除了主要的page需要的其他 参数
      ajaxModel:['data','list'], // ajax 请求的数据 是res 的结构
      callBack:function(){
      	
      }
      
    },options);
    
    this.init();
  };
  scrollLoad.prototype.init = function(){
  	var _this = this;
  	if(this.options.scrollBool){
  		$(this.options.pullUpLabel).attr("id","pullUp").css("display","none").append('<div class="flexbox flexbox-center cl-66"><span class="pullUpIcon"></span><span class="pullUpLabel">正在加载中</span></div>')
  	}
  	var  myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 0,
    ajaxflag = true,
    page;
    
    function pullUpAction() {
    	//console.log(_this.options.callBack())
    	_this.options.ajaxElseData[_this.options.ajaxPageName]=_this.options.ajaxPageCount;
    	//console.log(_this.options.ajaxElseData);
    	if(ajaxflag){
            ajaxflag = false;
            $.ajax({
                type: _this.options.ajaxType,
                url: _this.options.ajaxUrl,
                data:_this.options.ajaxElseData,
                success: function (rst) {
                    /*if(rst.status != 1000){
                        ajaxflag = true;
                        alert(rst.data);
                        return ;
                    }*/
                   var len = _this.options.ajaxModel.length;
                   var list
                   if(len==1){
                   		 list = rst[_this.options.ajaxModel[0]]
                   }else if(len==2){   
                   		list = rst[_this.options.ajaxModel[0]][[_this.options.ajaxModel[1]]]
                   }else if(len==3){
                   		list = rst[_this.options.ajaxModel[0]][[_this.options.ajaxModel[1]]][[_this.options.ajaxModel[2]]]
                   }

                    //console.log(_this.options.ajaxModel[0])
                    if (list.length == 0) {
                        if($("#pullUp").length > 0){
                            $("#pullUp .pullUpIcon").remove();
                            $("#pullUp .pullUpLabel").text("只有这么多了");
                        }
                        ajaxflag =false;
                        _this.options.callBack([],{data:[]});
                        return;
                    }
                    _this.options.ajaxPageCount++
                    ajaxflag = true;
                    
                    // 调用回调函数
                    _this.options.callBack(list,rst);

										$("#pullUp").hide();
                    myScroll.refresh();     // 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
                    
                },
                error: function (xhr, type) {
                    alert('网络错误，请刷新!');
                    // 即使加载出错，也得重置
                    ajaxflag = true; 
                    myScroll.refresh();
                }
            });
        }
    }
    
    function loaded() {
        pullUpEl = document.getElementById('pullUp');
        console.log(pullUpEl)
        if(pullUpEl){
        	pullUpOffset = pullUpEl.offsetHeight;      
	        myScroll = new iScroll(_this.options.container, {
            scrollbarClass: 'myScrollbar', /* 重要样式 */
            useTransition: false, /* 此属性不知用意，本人从true改为false */
            topOffset: 0,
            onRefresh: function () {
                if (pullUpEl.className.match('loading')) {
                    pullUpEl.className = '';
                }
            },
            onScrollMove: function () {
            	//console.log(this.maxScrollY);
            	//console.log(this.y)
                if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'flip';
                    this.maxScrollY = this.y;
                    //console.log(this.maxScrollY)
                   
                } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                    pullUpEl.className = '';
                    this.maxScrollY = pullUpOffset;
                    
                }
                if(this.maxScrollY>this.y+5){ //滑到底部
                	$("#pullUp").show()
                }
            },
            onScrollEnd: function () {
                if (pullUpEl.className.match('flip')) {
                	//$("#pullUp").show();
                	myScroll.refresh();
                    pullUpEl.className = 'loading';
                    pullUpAction();	// Execute custom function (ajax call?)
                }

            }
        });
		}
        /*setTimeout(function () {
            document.getElementById('wrapper').style.left = '0';
        }, 800);*/
    }
 
		//初始化绑定iScroll控件
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		document.addEventListener('DOMContentLoaded', loaded, false);
  };
  window.scrollLoad = scrollLoad;
}());


/* lq******上拉滑动加载 封装*****************/

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
//验证 汉字姓名
function isUserName(username){
    return $.isName(username);
//     name=name.replace(/\.|。/g,"·")//英文点和句号点替换成中间点
//     var pattern=/^([\u4e00-\u9fa5]+·{0,1}[\u4e00-\u9fa5]+)$/; 
//    if(pattern.length > 14) return false;

//    // var pattern = /[\u4e00-\u9fa5]{2,14}$/;
//     return pattern.test( $.trim(username) );
    
}
//验证手机号码
function isPhoneNo(phonenum){ 
    var pattern = /^1[3456789]\d{9}$/;
    return pattern.test( $.trim(phonenum) ); 
}
//验证身份证 
function isCardNo(card) {           
    var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
    return pattern.test( $.trim(card) ); 
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
// 验证车牌号
function isVehicleNumber(vehicleNumber) {
      var result = false;
      if (vehicleNumber.length == 7){
        var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
        result = express.test(vehicleNumber);
      }
      return result;
}
// 验证车牌号，包含新能源汽车
function isVehicleNumberNew(vehicleNumber) {
    var xreg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    var creg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if(vehicleNumber.length == 7){
     		return creg.test(vehicleNumber);
   	}else if(vehicleNumber.length == 8){
     		return xreg.test(vehicleNumber);
   	}else{
     		return false;
   	}
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
//验证护照是否正确
function checkPassport(str){
   var objExp =/^[a-zA-Z0-9]{5,17}$/;
    return objExp.test(str);
  // var re =new RegExp("(^([PSE]{1}\\d{7}|[GS]{1}\\d{8})$)");//E字打头的后面不知道要跟几位
    //return re.test(str);
}


//保险详情添加版本平台号
var u = navigator.userAgent; 
if (u.indexOf("pop=1") < 0) {
		 $("#platform").val(3)
   } else {
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
           $("#platform").val(2)
        } else {
           $("#platform").val(1)
    }
}
//护照验证

// 提示的方法
function MyAlert(txt) {
	$.myAlert({
        type: 4,
        text: txt,
        width: '100%',
        textAlign: 'center',
        time: 2000,
    })
}

// 验证银行卡
function isBankcard(bankcard){
    var pattern= /^(\d{16}|\d{19})$/;
    if(pattern.test(bankcard)){
        return true;
    }else {
        return false;
    }
}

function is_weixn(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}
function formatNum(num){
		if(num < 10){
			return "0"+num
		}else{
			return num
		}
}
//埋点公用方法
var enterTime = new Date().getTime();//页面进入时间
function maiDian(operate,url,events,sn,content){  // operate: 类型    url:跳转的地址   ifArticle: 是否是文章    evet: 事件名称
				var dateTime = new Date(),
						platform,
						params = {},
						u = navigator.userAgent,
						tokenStr = "bgbweb#bgbweb123#"+dateTime.getFullYear()+"-"+formatNum(dateTime.getMonth()+1)+"-"+formatNum(dateTime.getDate())+" "+formatNum(dateTime.getHours())+":00:00",
						token = hex_md5(tokenStr);
						
				if (u.indexOf("pop=1") < 0) {
					 platform = is_weixn() ? 4 : 3;
	      }else{
	      	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	        if (isAndroid) {
	            platform = 2
	        } else {
	             platform = 1
	        }
	      }
				
				// var content = parseInt((new Date().getTime()-enterTime)/1000);
				
				if(operate == 'click'){
						params= {
								appid:'bgbweb',
								token:token,
								operate:operate,
								event:events,
								platform:platform,
								content:content ? content : '',
								sn:sn ? sn : ''
						}
						
				}else if (operate == 'exposure'){
					params= {
							appid:'bgbweb',
							token:token,
							operate:operate,
							event:events,
							platform:platform,
							content:parseInt((new Date().getTime()-enterTime)/1000),
							sn:sn ? sn : ''
					}
				}
					
				$.ajax({
					url:'/Portrait/maidian',
					type:'POST',
					data:params,
					async:false,
					success:function(res){
						
					},error:function(err){
						console.log(err);
					}
				})
			
			if(url && operate == 'click'){
				window.location.href = url;
			}
			
}

// 新版微信ios表单bug处理
if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
    $(document).delegate('input, textarea, select', 'blur', function(){
        setTimeout(function(){
            $('html').css({height: '100.1vh'});
            setTimeout(function(){
                $('html').scrollTop($('html').scrollTop()-1)
                $('html').css({height: '100vh'});
            }, 10);
        },100);
    });
}

$.extend({
        isName:function(name){
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
            var pattern = /^1[3456789]\d{9}$/;
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
        isHeight:function(height){
          var pattern = /^[0-9]*[1-9][0-9]*$/;
          if(pattern.test(height)){
                return true;
            }else {
                return false;
            }
        },
        isBankcard:function(bankcard){
        var pattern= /^[0-9]*$/;
          if(pattern.test(bankcard)){
              return true;
          }else {
              return false;
          }
      }
    });
// 判断在微信浏览器是否隐藏头部
// (function() {
//     if (is_weixn()) {
//         if($('header').hasClass('wx_hide_head')) {
//             $("header").hide();
//             $(".content, .content1").css('padding-top','0');
//             $('title').text($('header h1').text());
//         } else if($('header').hasClass('wx_hide_title')) {
//             $('title').text($('header h1').text());
//             $('header h1').text("");
//         }
//     }
// })();

function isHiddentop(header,content){
    var length=$(".header").children().length;
    if(length>2){
        if (!is_weixn()) {
            $(".header").children('h1').show();
        }
    }else{
        if (is_weixn()) {
            $(".header").hide();
            $(".content").css('padding-top','0');
        }
    }
}

//页面统计
var _mtac = {"senseQuery":1};
    (function() {
        var mta = document.createElement("script");
        mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.4";
        mta.setAttribute("name", "MTAH5");
        mta.setAttribute("sid", "500658429");
        mta.setAttribute("cid", "500658430");
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(mta, s);
    })();
