<template>
    <div  id="main">
        <div v-show="showCollapse" @click="showCollapse = !showCollapse" class="mask"></div>
        <div  class="_top">
           
            <h2>优识科技管理系统</h2>
            
            <div  class="container hidden-sm-and-down">
                <div class="name item">{{userCnName}}</div>
                <el-badge is-dot class="item">通知</el-badge>
                <div class="time item">
                    {{time}}
                </div>
                <div class="item" @click="changePassword()"><a href="javascript:void(0)">修改密码</a></div>
                <div class="item" @click="LoginOut()"><a href="javascript:void(0)">退出登录</a></div>
            </div>
            <div @click="showCollapse = !showCollapse" class="hidden-md-and-up  container"><i class="el-icon-menu"></i></div>
            <el-collapse-transition>
                <div v-show="showCollapse" class="collapse hidden-md-and-up">
                    <div class="item">
                        {{userCnName}}
                    </div>
                    <div @click="changePassword()" class="item">
                        修改密码
                    </div>
                    <div @click="LoginOut()" class="item">
                        退出登录
                    </div>
                </div>
            </el-collapse-transition>

        </div>
        
        <el-dialog
    
            title="修改密码"
            :visible.sync="isChangePassword"
            width="30%">
            <el-form label-width="140px" >

                <el-form-item label="旧密码">
                    <el-input type="password" v-model="oldPassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input type="password" v-model="newPassword"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input type="password" v-model="confirmPassword"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isChangePassword = false">取 消</el-button>
                <el-button type="primary" @click="makeSureChangePassWord()">确 定</el-button>
            </span>
        </el-dialog>


        <div class="wrapper">
            <div class="leftBar">
              <el-menu
                background-color="#2f333e"
                text-color="#fff"
                active-text-color="#ffd04b"
                class="el-menu-vertical-demo">
                <router-link  tag="a" :to="{'name':'enter'}"> 
                    <el-menu-item  index="1">
                        <span slot="title">首页</span>
                    </el-menu-item>
                 </router-link>
                  <router-link tag="a" :to="{'name':'uploadFile_controller'}"> 
                    <el-menu-item index="6">
                        <span slot="title">文件上传</span>
                    </el-menu-item>
                </router-link>


                <template v-if="superAdminFlag>1">
                <router-link tag="a" :to="{'name':'user_controller'}"> 
                    <el-menu-item index="2">
                        <span slot="title">用户管理</span>
                    </el-menu-item>
                </router-link>

                <router-link tag="a" :to="{'name':'business_controller'}"> 
                    <el-menu-item index="3">
                        <span slot="title">业务管理</span>
                    </el-menu-item>
                </router-link>

                <router-link tag="a" :to="{'name':'jurisdiction_controller'}"> 
                    <el-menu-item index="4">
                        <span slot="title">权限管理</span>
                    </el-menu-item>
                </router-link>

                <router-link tag="a" :to="{'name':'role_controller'}"> 
                    <el-menu-item index="5">
                        <span slot="title">角色管理</span>
                    </el-menu-item>
                </router-link>
                </template>


                
               </el-menu>
            </div>
            
            <div class="mianContainer">
                 <transition :name="type">
                    <router-view></router-view>
                 </transition>
            </div>
        </div>
        

    </div>    
</template>
<script>
export default {
    mounted(){
        var _this = this;
        setInterval(function(){
            _this.time = _this.getTime();
        },10)
        this.userCnName = this.$gob.getCookie('userCnName');
    },
    data(){
        return{
            time:null,
            type:'vux-pop-nor',
            superAdminFlag:this.$gob.getCookie('superAdminFlag'),
            userCnName:null,
            isChangePassword:false,
            userId:null,
            oldPassword:null,
            newPassword:null,
            confirmPassword:null,
            showCollapse:false
        }
    },
    methods:{
        getTime(){
            var timer = new Date();
            var year = timer.getFullYear();
            var month = timer.getMonth();
            var day = timer.getDate();
            var hours = timer.getHours();
            var minuter = timer.getMinutes();
            var seconds = timer.getSeconds();
            return `${year}-${month+1}-${day}-${hours}:${minuter<10?"0"+minuter:minuter}:${seconds<10?"0"+seconds:seconds}`
        },
        changePassword(){
            this.isChangePassword = true;
        },
        makeSureChangePassWord(){
            if(!this.oldPassword){
                 this.$message({message: '旧密码不能为空'});
            }
            if(!this.newPassword){
                 this.$message({message: '新密码不能为空'});
            }
            if(!this.confirmPassword){
                 this.$message({message: '确认密码不能为空'});
            }
            if(this.confirmPassword != this.newPassword){
                 this.$message({message: '确认密码与新密码不一致'});
            }

            var obj = {
                userId:this.$gob.getCookie('userId'),
                oldPassword:this.oldPassword,
                newPassword:this.newPassword,
                confirmPassword:this.confirmPassword
            }

            this.$gob.post('auth/alertPassword',obj).then(res=>{
                if(res.data.code == 10000){
                     this.$message({message: '修改密码成功'});
                     this.isChangePassword = false;
                }else{
                    this.$message({message: res.data.msg});
                }
            })
        },
        LoginOut(){
             this.$confirm('是否退出登录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
             }).then(() => {
                var obj = {
                    token:this.$gob.getCookie('token')
                }
                this.$gob.post('auth/logout',obj).then(res=>{
                    if(res.data.code == 10000){
                         this.$gob.delCookie('token');
                         this.$gob.delCookie('userCnName');
                         this.$gob.delCookie('userId');
                         this.$gob.delCookie('userName');
                         this.$gob.delCookie('superAdminFlag');
                         this.$gob.delCookie('systems');
                         this.$router.push({name:'login'});
                         this.$message({
                           type: 'success',
                           message: '退出登录成功!'
                         })
                    }else{
                        this.$message({
                           message: res.data.msg
                        });
                    }
                })
             }).catch(() => {
          
             });
        }
    }
}
</script>
<style lang="less">
#main{
     .mask{
            position: fixed;
            top:0px;
            left: 0px;
            bottom: 0px;
            right: 0px;
     }
    ._top{
        background: #fff;
        position: fixed;
        display: flex;
        align-items: center;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
        width: 100%;
        height: 60px;
        padding-left: 50px;
        padding-right: 50px;
        justify-content: space-between;
        z-index: 1000;
        box-sizing: border-box;
        h2{
            font-size: 24px;
        }
        .el-icon-menu{
            cursor: pointer;
            font-size: 28px;
            transition: 0.45s;
        }
        .el-icon-menu:hover{
            transform: translateY(-10%);
            box-shadow: 2px 2px 2px rgba(0,0,0,0.2)
        }
        .collapse{
            position: absolute;
            top: 61px;
            left: 0px;
            width: 100%;
            background: #fff;
            box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
            .item{
                cursor: pointer;
                padding: 15px;
                font-size: 14px;
                padding-left: 50px;
            }
        }   
        .container{
            display: flex;
            // transform: translateX(-50%);
            align-items: baseline;
            justify-content: flex-start;
            .item{
                margin-right: 50px;
                a{
                    color: #333;
                }
            }
        }
    }
    .wrapper{
        padding-top: 90px;
        padding-left: 40px;
        padding-right: 40px;
        display: flex;
        justify-content: space-between;
        .leftBar{
            width: 250px;
            margin-right: 60px;
        }
        .mianContainer{
            position: relative;
            width: 1750px;
            background: #fff;
            border-radius: 4px;
        }
    }
}
</style>
