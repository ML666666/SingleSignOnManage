<template>
    <div id="enter">
        <template v-for="v in list">
            <a @click="open(v.indexAddress,v)">
                  <div class="item">
                      <p>{{v.permissionName}}</p>
                      <el-button  type="primary">点击前往</el-button>
                  </div>
            </a>
        </template>
    </div>
</template>
<script>
export default {
    mounted(){
        if(window.location.href.indexOf("ujinbi.com")>0){
            this.list= JSON.parse(this.$gob.getCookie('systems'));
        }else{
            this.$gob.get('permission/upList',{type:1}).then(res=>{
                this.list = (res.data.data);
            })
        } 
    },
    data:function(){
        return{
            list:[]
        }
    },
    methods: {
        open(url,obj){
            
           let domain = window.location.href.includes('youhuiduo.cn')?url.substring(0,url.indexOf('cn')+2):url.substring(0,url.indexOf('com')+3);
           let targetUrlDomain = url.includes('youhuiduo.cn')?url.substring(0,url.indexOf('cn')+2):url.substring(0,url.indexOf('com')+3);
           var popup =  window.open(url);
           localStorage.setItem('projectId',obj.projectId);

           popup.postMessage(JSON.stringify(localStorage.getItem('userInfo')),
                  targetUrlDomain);
           console.log(popup.postMessage.toString());
                
          // postMessage(): 方法允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文档、多窗口、跨域消息传递。

        }
    }
}
</script>
<style lang="less">
#enter{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-content: space-around;
    background: #fff;
    a{
        margin: 50px 60px;
        text-decoration: none;
     .item{
        width: 300px;
        height: 133px;
        background: #999;
        border-radius: 4px;
        border: 1px solid #ebeef5;
        background-color: #fff;
        overflow: hidden;
        color: #303133;
        transition: .3s;
        text-align: center;
        padding-top: 30px;
        display: flex;
        flex-direction: column;
        transition: 0.3s;
        padding-left: 40px;
        padding-right: 40px;
        p{
            margin-bottom: 50px;
        }
    }
    .item:hover{
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
    a{
        text-decoration: none;
    }

    }
    
}
</style>

