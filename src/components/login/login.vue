<template>
    <div id="LoginBlock">
        <h2>系统登录</h2>
        <el-input
            placeholder="请输入账号"
            v-model="userName"
            clearable>
        </el-input>
        <el-input
            placeholder="请输入密码"
            v-model="password"
            type="password"
            clearable>
        </el-input>
        <div v-if="errorCode" class="errorCodeWrapper">
             <el-input
                placeholder="请输入验证码"
                v-model="validCode"
                clearable>
            </el-input>
            <img :src="errorCode"  @click="Change()" alt="">
        </div>
        <el-button type="primary" @click="Login()">登录</el-button>
    </div>
</template>
<script>
export default {
    data:function(){
        return{
            userName:null,
            password:null,
            validCode:null,
            isError:false,
            errorCode:null,
            code:Math.random().toString().substring(0,16)
        }
    },
    methods:{
        Change(){
            this.code = Math.random().toString().substring(0,16);
            this.$gob.get('auth/getValidCode').then(res=>{
                       this.errorCode = this.$gob.getApiUrl()+"auth/getValidCode?randomKey="+this.code;
            })
        },
        Login(){
            if(!this.userName){
                this.$message('请输入用户名');
                return
            }
            if(!this.password){
                this.$message('请输入密码');
                return
            }
            if(this.isError){
                if(!this.validCode){
                    this.$message('请输入验证码');
                    return
                }
            }
            var obj = null;
            if(this.isError){
                obj = {
                    userName:this.userName,
                    password:this.password,
                    validCode:this.validCode?this.validCode:null,
                    isNeedValidCode:this.isError,
                    randomKey:this.code
                }
            }else{
                obj = {
                    userName:this.userName,
                    password:this.password,
                    isNeedValidCode:this.isError,
                }
            }
            this.$gob.post('auth/login',obj).then(res=>{
               if(res.data.code == 10000){

                   var obj = (res.data.data);
                   this.$gob.setCookie('token',obj.token);
                   this.$gob.setCookie('userCnName',obj.userCnName);
                   this.$gob.setCookie('userId',obj.userId);
                   this.$gob.setCookie('userName',obj.userName);
                   this.$gob.setCookie('superAdminFlag',obj.superAdminFlag);
                   this.$gob.setCookie('systems',JSON.stringify(obj.systems));
                   localStorage.setItem('userInfo',JSON.stringify(obj));
                   this.$router.push({name:'enter'});

                    
               }else{
                   this.code = Math.random().toString().substring(0,16);
                   this.isError = true;
                   this.$message(res.data.msg);
                   this.$gob.get('auth/getValidCode').then(res=>{
                       this.errorCode = this.$gob.getApiUrl()+"auth/getValidCode?randomKey="+this.code;
                   })
               }
            })
        }   
    }
}
</script>
<style lang="less">
#LoginBlock{
    width: 450px;
    margin: 0 auto;
    margin-top: 200px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 80px;
    h2{
        font-size: 26px;
        margin: 0 auto 40px;
        text-align: center;
        font-weight: 700;
    }
    .el-input{
        margin-bottom: 20px;
    }
    .errorCodeWrapper{
        display: flex;
    }
    img{
        height: 40px;
        margin-left: 20px;
    }
}
</style>
