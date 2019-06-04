<template>
    <div id="user-ctrol">


        <Edit_Add_User 
            v-model="addUser" 
            :type='type' 
            :options='options'
            @reLoad='getList'
            :rowObj='rowObj'
            ></Edit_Add_User>

        <SetPermission 
            :rowObj='rowObj'
            :roleIdsList='roleIdsList'
            :permissionUserId='permissionUserId' 
            :permissionOptions='permissionOptions' 
            v-model="isSetPermission"></SetPermission>


        <div class="wrapper">
            <el-button size="small" @click="toAddUser()"  type="primary" icon="el-icon-plus" plain>添加用户</el-button> 
            <div class="select">
               <el-select v-model="selectDeptId" placeholder="请选择">
                        <el-option :key='0' :label="'全部'" :value="0"></el-option>
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.deptName"
                            :value="item.id">
                        </el-option>
                </el-select>
                <el-Input class="selectValue" placeholder="请输入用户名称" type="text" @keyup="selectUser()" v-model="selectValue"></el-Input> 
            </div> 
        </div>

        <el-table
            :data="list"
            style="width:100%">
            <el-table-column type="expand">
            <template slot-scope="props">
            </template>
            </el-table-column>
            <el-table-column
                label="用户id"
                prop="id">
            </el-table-column>
            <el-table-column
                label="用户名"
                prop="userCnName">
            </el-table-column>
            <el-table-column
                label="部门"
                prop="deptName">
            </el-table-column>
            <el-table-column
                label="邮箱">
                <template slot-scope="scope">  
                        {{scope.row.email?scope.row.email:'暂无数据'}}
                </template>
            </el-table-column>
            <el-table-column
                label="手机">
                <template slot-scope="scope">
                        {{scope.row.phone?scope.row.phone:'暂无数据'}}
                </template>
            </el-table-column>
            <el-table-column
                width="400px"
                label="用户操作"
                prop="userCnName">
                  <template slot-scope="scope" >
                    <el-button @click="unLock(scope.row)" size="small">解锁状态</el-button>
                    <template v-if="scope.row.superAdminFlag != 2">
                        <el-button size="small" @click="toSetPermission(scope.row)" plain>设定权限</el-button>  
                        <el-button @click="changeUser(scope.row)" plain  size="small">编辑用户</el-button>  
                        <el-button @click="delUser(scope.row)" type="danger" size="small">删除</el-button>
                    </template>  
                  </template>
            </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div v-if="total" class="wrapper">
                <el-pagination
                    :current-page.sync="pageIndex"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
    </div>
</template>
<script>
import SetPermission from './component/SetPermission'
import Edit_Add_User from './component/Edit_Add_User'
export default {
    components: {
        Edit_Add_User,
        SetPermission
    },
    watch:{
        selectDeptId:function(val){
            this.getList();
        },
        selectValue:function(val){
            this.getList();
        },
        pageIndex:function(){
               this.getList();
        },
    },
    data(){
        return{
            
            list:[],//用户列表
            pageIndex:1,//分页数
            pageCount:10,//分页数量
            total:null,//分页总数
            addUser:false,//增加用户模态框
            options:false,

            //设定权限
            isSetPermission:false,
            permissionOptions:[],
            roleIds:[],
            roleIdsList:[],
            permissionUserId:null,

            selectDeptId:null,
            selectValue:null,

            rowObj:null
        }
    },
    mounted(){

        this.getList();
        this.$gob.get('user/getDept').then(res=>{
            this.options = res.data.data;
        })

        this.$gob.get('permission/systemPs').then(res=>{
            this.permissionOptions = (res.data.data);
        })

    },
    methods:{

        toSetPermission:function(row){
            this.rowObj = row;
            // permissionOptions
            this.permissionUserId = row.id;
            this.$gob.get('permission/upNumListByUserId',{userId:row.id}).then(res=>{
                if(res.data.code == 10000){
                    this.roleIdsList = res.data.data;
                    this.isSetPermission = true;
                }
            })
            
        },

        unLock(row){
             this.$confirm('是否解锁用户状态?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
             }).then(() => {
                  var obj = {
                    userId:row.id
                  }
                  this.$gob.post('user/unlock',obj).then(res=>{
                        if(res.data.code == 10000){
                             this.$message({
                                message: '解锁用户状态成功'
                             });
                             this.getList();
                        }else{
                             this.$message({
                                message: res.data.msg
                             });
                        }
                  })
             })
        },

        delUser:function(row){
             this.$confirm('是否删除用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
             }).then(() => {
                  var obj = {
                    userId:row.id
                  }
                  this.$gob.post('user/delUser',obj).then(res=>{
                        if(res.data.code == 10000){
                             this.$message({
                                message: '删除用户成功'
                             });
                             this.getList();
                        }else{
                             this.$message({
                                message: res.data.msg
                             });
                        }
                  })
             })
        },

        changeUser:function(row){
            this.rowObj = row;  
            this.type = 2;
            this.addUser = true;
        },

        toAddUser(){
             this.addUser = true;
             this.type = 1;
        },

        getList(){
            var obj = {
                deptId:this.selectDeptId?this.selectDeptId:null,
                name:this.selectValue?this.selectValue:null,
                pageIndex:this.pageIndex,
                pageCount:this.pageCount
            }
            this.$gob.get("user/getUsers",obj).then(res=>{
                this.list = res.data.data.user;
                this.total = res.data.data.totalLows;
            })
        }
    }
}

</script>
<style lang="less">
#user-ctrol{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    background: #fff;
    .wrapper{
        padding: 20px;
        display: flex;
        justify-content: flex-start;
        .select{
            margin-left: 6px;
            display: flex;
            .el-input{
                width: 130px;
            }
            .selectValue{
                width: 200px;
                margin-left: 6px;
            }
        }
        .el-form-item__content{
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        .randowPassWord{
                padding-left: 40px;
        }
    }
}
</style>
