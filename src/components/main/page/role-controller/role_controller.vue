<template>
    <div id="role"> 
            <el-dialog
            title="新建角色"
            :visible.sync="AddUser"
            width="30%">
            <el-form label-width="140px">
                <el-form-item label="选择业务权限">
                    <el-select v-model="permissionId" placeholder="请选择">
                        <el-option
                            v-for="item in permissionOptions"
                            :key="item.id"
                            :label="item.permissionName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色名称">
                     <el-input v-model="roleName"></el-input>
                </el-form-item>     
                <el-form-item label="角色范围">
                     <el-input v-model="roleScope"></el-input>
                </el-form-item>
                 <el-form-item label="角色说明">
                     <el-input v-model="roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="AddUser = false">取 消</el-button>
                <el-button type="primary" @click="makeSureAddUser()">确 定</el-button>
            </span>
            </el-dialog>

            <el-dialog
            title="编辑角色"
            :visible.sync="isChangeUser"
            width="30%">
            <el-form label-width="140px" >
                <el-form-item label="选择业务权限">
                    <el-select  v-model="permissionId" placeholder="请选择">
                        <el-option
                            v-for="item in permissionOptions"
                            :key="item.id"
                            :label="item.permissionName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色名称">
                     <el-input v-model="roleId"></el-input>
                </el-form-item>     
                <el-form-item label="角色名称">
                     <el-input v-model="roleName"></el-input>
                </el-form-item>     
                <el-form-item label="角色范围">
                     <el-input v-model="roleScope"></el-input>
                </el-form-item>
                <el-form-item label="角色说明">
                     <el-input v-model="roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isChangeUser = false">取 消</el-button>
                <el-button type="primary" @click="ChangeUser()">确 定</el-button>
            </span>
            </el-dialog>

            <el-dialog
            title="权限设置"
            :visible.sync="isSetPower"
            width="30%">
            <el-form label-width="140px">
                <el-form-item label="选择业务权限">
                    <el-select disabled="disabled" v-model="permissionId" placeholder="请选择">
                        <el-option
                            v-for="item in permissionOptions"
                            :key="item.id"
                            :label="item.permissionName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="权限列表">
                     <el-checkbox-group v-model="roleIds">
                            <el-checkbox :key="v.id" v-for="v in roleIdsList" :label="v.id" >{{v.permissionName}}</el-checkbox>
                     </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isSetPower = false">取 消</el-button>
                <el-button type="primary" @click="makeSureSetPower()">确 定</el-button>
            </span>
            </el-dialog>


            <div class="wrapper">
                <el-button size="small" type="primary" icon="el-icon-plus" @click="toAddUser()" plain>新建角色</el-button>  
                <div class="select">
                    <el-select  v-model="selectId" placeholder="请选择">
                        <el-option
                            v-for="item in permissionOptions"
                            :key="item.id"
                            :label="item.permissionName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-Input class="selectValue" placeholder="请输入角色名称" type="text" v-model="selectValue"></el-Input> 
                </div>
            </div>

            <el-table
            :data="list"
            style="width: 100%">
            <el-table-column type="expand">
            <template slot-scope="props">
            </template>
            </el-table-column>
            <el-table-column
                label="id"
                prop="id">
            </el-table-column>
            <el-table-column
                label="角色名称"
                prop="roleName">
            </el-table-column>
            <el-table-column
                label="角色描述"
                prop="roleDesc">
            </el-table-column>
            <el-table-column
                label="权限Id">
                 <template slot-scope="scope">
                     <div v-if="scope.row.permissionId">{{scope.row.permissionId}}</div>
                     <div v-else>暂无数据</div>
                 </template>
            </el-table-column>
            <el-table-column
                label="权限数量"
                prop="permissionCount">
            </el-table-column>
            <el-table-column
                width="300px"
                label="用户操作"
                prop="userCnName">
                  <template slot-scope="scope">
                    <el-button @click="toChangeUser(scope.row)" plain  size="small">编辑角色</el-button>
                     <el-button @click="setPowper(scope.row)" plain  size="small">权限设定</el-button>
                  </template>
            </el-table-column>
            </el-table>

            <div class="wrapper">
                <el-pagination
                    v-if="totalLows"
                    :current-page.sync="pageIndex"
                    layout="prev, pager, next"
                    :total="totalLows">
                </el-pagination>
            </div>

    </div>
</template>
<script>
export default {
    mounted:function(){
        this.getList();
        this.$gob.get('permission/getBusinessPermission').then(res=>{
            this.permissionOptions = (res.data.data);
            this.permissionId = this.permissionOptions[0].id;
        })
    },
    data:function(){
        return{
            isSetPower:false,
            list:[],
            pageIndex:1,
            pageCount:10,
            totalLows:null,
            AddUser:false,
            isChangeUser:false,
            permissionId:null,
            permissionOptions:[],
            roleName:null,
            roleScope:null,
            roleDesc:null,
            roleId:null,
            parentId:null,
            roleIdsList:[],
            roleIds:[],
            selectId:null,
            selectValue:null
        }
    },
    watch:{
        selectId:function(){
            this.getList();
        },
        selectValue:function(){
            this.getList();
        },
        pageIndex:function(){
            this.getList();
        }
    },
    methods:{
        setPowper(row){
            this.permissionId = row.permissionId;
            this.roleId = row.id;
            var obj = {
                roleId:row.id,
                parentId:row.permissionId
            }
            this.$gob.get("permission/getUnitRolePermissions",obj).then(res=>{
                this.roleIdsList = (res.data.data);
                console.log(this.roleIdsList)
                this.roleIds = [];
                for(var i = 0;i<this.roleIdsList.length;i++){
                    if(this.roleIdsList[i].selected){
                        this.roleIds.push(this.roleIdsList[i].id);
                    }
                }
            })
            this.isSetPower = true;
        },
        getList(){
            var obj = {
                permissionId:this.selectId?this.selectId:null,
                roleName:this.selectValue?this.selectValue:null,
                pageIndex:this.pageIndex,
                pageCount:this.pageCount
            }
            this.$gob.get('role/getRoles',obj).then(res=>{
                this.list = res.data.data.roles;
                this.totalLows = res.data.data.totalLows;
            })
        },
        makeSureSetPower(){
            var roleIds  = "";
            for(var i=0;i<this.roleIds.length;i++){
                roleIds += this.roleIds[i]+',';
            }
            roleIds = roleIds.substring(0,roleIds.length-1);
            var obj = {
                permissionIds:roleIds,
                roleId:this.roleId,
                parentId:this.permissionId
            }
            this.$gob.post('role/assignRolePermission',obj).then(res=>{
                if(res.data.code==10000){
                    this.$message({
                                message: res.data.msg
                     });
                     this.getList();
                     this.isSetPower = false;
                }else{
                     this.$message({
                                message: res.data.msg
                     });
                }
            })
        },
        toAddUser(){
            this.permissionId = this.permissionOptions[0].id;
            this.roleName = null;
            this.roleScope = null;
            this.roleDesc = null;
            this.AddUser = true;
        },
        toChangeUser(row){
            this.isChangeUser = true;
            this.roleId = row.id;
            this.roleName = row.roleName;
            this.roleScope = row.roleScope;
            this.permissionId = row.permissionId;
        },
        ChangeUser(){
            if(!this.roleName){
                this.$message({message: "角色名称不能为空"});
                return
            }
            if(!this.roleScope){
                this.$message({message: "角色范围不能为空"});
                return
            }
            var obj = {
                permissionId:this.permissionId,
                roleId:this.roleId,
                roleName:this.roleName,
                roleScope:this.roleScope,
                roleDesc:this.roleDesc
            }
            this.$gob.post('role/updateRole',obj).then(res=>{
                if(res.data.code == 10000){
                     this.$message({
                            message: "编辑角色成功"
                     });
                     this.isChangeUser = false;
                     this.roleId = null;
                     this.roleName = null;
                     this.roleScope = null;
                     this.roleDesc = null;
                     this.getList();
                }else{
                     this.$message({
                            message: res.data.msg
                     });
                }   
            })
        },
        makeSureAddUser(){
            if(!this.roleName){
                this.$message({message: "角色名称不能为空"});
                return
            }
            if(!this.roleScope){
                this.$message({message: "角色范围不能为空"});
                return
            }
            var obj = {
                permissionId:this.permissionId,
                roleName:this.roleName,
                roleScope:this.roleScope,
                roleDesc:this.roleDesc
            }
            this.$gob.post('role/newRole',obj).then(res=>{
                if(res.data.code == 10000){
                     this.$message({
                                message: "新增角色成功"
                     });
                     this.getList();
                     this.AddUser = false;
                     this.roleName = null;
                     this.roleScope = null;
                     this.roleDesc = null;
                }else{
                     this.$message({
                            message: res.data.msg
                     });
                }
            })
        }
    }
}
</script>
<style lang="less">
#role{
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
    }
}
</style>
