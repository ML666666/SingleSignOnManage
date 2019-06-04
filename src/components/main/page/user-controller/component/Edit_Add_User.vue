<template>
    <el-dialog
            :title="type==1?'添加用户':'编辑用户'"
            :visible.sync="value"
            width="40%">
            <el-form label-width="140px" >
                <el-form-item label="账户名">
                    <el-input v-model="obj.userName"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名">
                    <el-input v-model="obj.name"></el-input>
                </el-form-item>
                <el-form-item label="生成随机密码">
                    <el-button @click="setRandowPassword">生成随机密码</el-button>
                    <span style="margin-left:10px;"  class="randomPassWord">{{randomPassWord}}</span>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="obj.password"></el-input>
                </el-form-item>
                <el-form-item label="重复密码">
                    <el-input v-model="obj.repeatPassword"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="obj.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="obj.email"></el-input>
                </el-form-item>
                <el-form-item label="部门ID">
                    <el-select v-model="obj.deptId" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.deptName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="value = false">取 消</el-button>
                <el-button type="primary" @click="addUserFun()">确 定</el-button>
            </span>
    </el-dialog>
</template>
<script>
export default {
    props:['type','value','options','rowObj'],
    data () {
        return {
            obj:{
                userName:null,
                name:null,
                setRandowPassword:null,
                password:null,
                repeatPassword:null,
                phone:null,
                email:null,
                deptId:null,
                userId:null
            },
            randomPassWord:null
        }
    },
    watch: {
        value:function(val){
            this.$emit('input',val);
        },
        rowObj(val){
            if(this.type == 2){
                for(let k in this.obj){
                    this.obj[k] = null;
                    if(this.rowObj[k]){
                        this.obj[k] = this.rowObj[k];
                        console.log(this.rowObj[k]);
                    }
                }
                this.obj['name'] = this.rowObj['userCnName'];
                this.randomPassWord = null;
                this.obj.userId = this.rowObj.id;
            }
        },
        type(val){
            console.log(val);
            if(val == 1){
                for(let k in this.obj){
                    this.obj[k] = null;
                }
            }
        }  
    },
    methods: {
        setRandowPassword(){
            this.$gob.get('auth/getRondomPassword').then(res=>{
                if(res.data.code == 10000){
                    this.randomPassWord = res.data.data;
                    this.obj.password = res.data.data;
                    this.obj.repeatPassword = res.data.data;
                }   
            })
        },
        addUserFun(){

            if(!this.obj.userName){
                this.$message({message: "账户名不能为空"});
                return
            }
            if(!this.obj.name){
                this.$message({message: "用户姓名不能为空"});
                return
            }
            if(!this.obj.password){
                this.$message({message: "密码不能为空"});
                return
            }
            if(!this.obj.repeatPassword){
                this.$message({message: "确认密码不能为空"});
                return
            }
            if(this.obj.repeatPassword != this.obj.password){;
                this.$message({message: "确认密码与密码不一致"});
                return
            }

            this.obj['type'] = this.type;
            this.$gob.post('user/newOrEditUser',this.obj).then(res=>{
                if(res.data.code == 10000){
                    this.addUser = false;
                    this.$emit('reLoad')
                    this.$message({
                           message: res.data.msg
                    });
                    this.randomPassWord = null;
                }else{
                    this.$message({
                           message: res.data.msg
                    });
                }
            })
        },
    },
}
</script>
<style lang="less">

</style>
