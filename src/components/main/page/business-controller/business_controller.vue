<template>
    <div id="business_controller">
        <div class="wrapper">
             <el-button size="small" @click="toAdd()" plain>添加业务单元</el-button>  
        </div>

        <el-dialog
            title="新增业务"
            :visible.sync="isAdd"
            width="30%">
            <el-form label-width="140px" >
                 <el-form-item label="业务权限名称">
                    <el-input v-model="permissionName"></el-input>
                </el-form-item>
                <el-form-item label="接口地址">
                    <el-input v-model="indexAddress"></el-input>
                </el-form-item>
                <el-form-item label="业务权限uri">
                    <el-input v-model="permissionUri"></el-input>
                </el-form-item>
                <el-form-item label="业务权限描述">
                    <el-input v-model="permissionDesc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isAdd = false">取 消</el-button>
                <el-button type="primary" @click="makeSureAdd()">确 定</el-button>
            </span>
        </el-dialog>


        <editFrom
        @reLoad='getList' 
        v-model="isChange" 
        :record="changeObj"></editFrom>

        <el-table
            :data="list"
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                </template>
            </el-table-column>
            <el-table-column
                prop="id"
                label="id"
                >
            </el-table-column>
            <el-table-column
                prop="permissionName"
                label="业务单元"
                >
            </el-table-column>
            <el-table-column
                prop="indexAddress"
                label="入口地址"
                >
            </el-table-column>
           <el-table-column
                label="权限描述"
                >
                <template slot-scope="scope">
                        {{scope.row.permissionDesc?scope.row.permissionDesc:'暂无数据'}}
                </template>
            </el-table-column> 
            <el-table-column
                label="权限URI"
                >
                <template slot-scope="scope">
                        {{scope.row.permissionUrl}}
                </template>
            </el-table-column>    
            <el-table-column
                prop="date"
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button @click="toChange(scope.row)" plain  size="small">编辑</el-button>
                 </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>

import editFrom from './component/editFrom'
export default {
    components:{
        editFrom
    },
    mounted(){
        this.$gob.get('permission/getBusinessPermission').then(res=>{
            this.permissionOptions = (res.data.data);
            this.permissionId = this.permissionOptions[0].id;
        })
        this.getList();
    },
    data(){
        return{
            isChange:false,
            isAdd:false,
            list:[],
            permissionId:null,
            indexAddress:null,
            permissionUri:null,
            permissionName:null,
            permissionDesc:null,
            changeObj:{}
        }
    },
    methods:{
        makeSureAdd(){
             if(!this.indexAddress){
                this.$message({message: '接口地址不能为空'});
                return
            }
            if(!this.permissionUri){
                this.$message({message: '业务权限url不能为空'});
                return
            }
            if(!this.permissionName){
                this.$message({message: '业务权限名称不能为空'});
                return
            }
            var obj = {
                permissionName:this.permissionName,
                indexAddress:this.indexAddress,
                permissionDesc:this.permissionDesc,
                permissionUri:this.permissionUri
            }
            this.$gob.post('permission/newBusinessPermission',obj).then(res=>{
                if(res.data.code == 10000){
                    this.getList();
                    this.$message({message: res.data.msg});
                    this.isAdd = false;
                }else{
                    this.$message({message: res.data.msg});
                }
            })

           
        },
        getList(){
            this.$gob.get('permission/getBusinessPermission').then(res=>{
                    this.list = res.data.data;
            })
        },
        
       
        toAdd(){
            this.permissionName = null;
            this.indexAddress = null;
            this.permissionDesc = null;
            this.permissionUri = null;
            this.isAdd = true;
        },
        toChange(row){
            this.changeObj.permissionId = row.id;
            this.changeObj.permissionName = row.permissionName;
            this.changeObj.indexAddress = row.indexAddress;
            this.changeObj.permissionDesc = row.permissionDesc;
            this.changeObj.permissionUri = row.permissionUrl;
            this.isChange = true;
        }
    }
}
</script>
<style lang="less">
#business_controller{
    position:absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    background: #fff;
    .wrapper{
        padding: 20px;
        display: flex;
    }
}
</style>
