import axios  from 'axios'
import qs from 'qs'
let gob = {
    router:null,
    getApiUrl:function(){
        if(window.location.href.indexOf("youhuiduo.cn")>0){
            return "https://gate.youhuiduo.cn/usys/authCenter/management/" 
        }else if(window.location.href.indexOf("ujinbi.com")>0){
            return "https://gate.ujinbi.com/usys/authCenter/management/"
        }else{
            return "APi/"
        }
    },
    getWebUrl:function(){
        if(window.location.href.indexOf("youhuiduo.cn")>0){
            return "http://gate.youhuiduo.cn/usys/authCenter/management/" 
        }else if(window.location.href.indexOf("ujinbi.com")>0){ 
            return "https://gate.ujinbi.com/"
        }else{
            return "http://176.166.1.47:11031/"
        }
    },
    post:function(url,data){
        var _this  = this; 
        return new Promise(function(resolve, reject) {
         axios.post(_this.getApiUrl()+url, 
             qs.stringify(data),
             {
                 headers: {
                     'ujinbi-token': _this.getCookie("token"),
                 }
             }
         )
         .then(function(res){
            if(res.data.code == 40000){
                    _this.router.push({name:'login'});
                    return  
            }
            resolve(res);
         })
        })
     },



     get:function(url,data){
        var _this  = this; 
        return new Promise(function(resolve, reject){
         axios.get(_this.getApiUrl()+url, 
             {
                 headers: {
                    'ujinbi-token': _this.getCookie("token"),
                 },
                 params:data
             }
         )
         .then(function(res){
            if(res.data.code == 40000){
                _this.router.push({name:'login'});
                return  
            }
            resolve(res);
         })
        })
     },
     getCookie: function(name) {
         var strcookie = document.cookie;//获取cookie字符串
         var arrcookie = strcookie.split("; ");//分割
         //遍历匹配
         for ( var i = 0; i < arrcookie.length; i++) {
         var arr = arrcookie[i].split("=");
         if (arr[0] == name){
            return arr[1];
         }
         }
         return false;
     },
     setCookie: function(name,value){
        var exp = new Date();
        exp.setTime(exp.getTime() + 3600 * 60 * 24 *10);//过期时间6分钟
        // document.cookie = 'openid=' + openid + ";expires=" + exp.toGMTString();
        document.cookie = `${name}=${value};expires=${exp.toGMTString()}`

     },
     delCookie:function(name) 
     { 
        var exp = new Date(); 
        exp.setTime(exp.getTime() - 1); 
        var cval=this.getCookie(name); 
        if(cval!=null) 
            document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
     } 
}
export default gob
