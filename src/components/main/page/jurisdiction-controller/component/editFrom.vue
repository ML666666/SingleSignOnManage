<template>
    <el-dialog
            title="编辑单元权限"
            :visible.sync="value"
            width="30%">

            <el-form label-width="140px" >

                <el-form-item v-if="obj.type == 1" label="前端接口">
                    <el-input v-model="state.indexAddress"></el-input>
                </el-form-item>

                <el-form-item v-if="obj.type == 2" label="商家ID">
                    <el-input v-model="state.bussinessId"></el-input>
                </el-form-item>

                <el-form-item label="单元权限名">
                    <el-input v-model="state.permissionName"></el-input>
                </el-form-item>
                <el-form-item label="业务权限uri">
                    <el-input v-model="state.permissionUrl"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="state.permissionDesc"></el-input>
                </el-form-item>
                
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="value = false">取 消</el-button>
                <el-button type="primary" @click="setPermission()">确 定</el-button>
            </span>
            </el-dialog>    
</template>
<script>
export default {
    props:['obj','permissionOptions','value'],
    watch:{
        value(val){
            this.$emit('input',val);
        }
    },
    methods:{
        setPermission(){
            let obj = Object.assign({},this.state);
            obj['id'] = 0;
            obj['orderNum'] = 1;
            obj['parentId'] = this.obj.id;
            obj['projectId'] = this.obj.id;
            obj['type'] = this.obj.type+1;
            obj.indexAddress = obj.type != 1?undefined:obj.indexAddress;
            obj.bussinessId = obj.type != 2?undefined:obj.bussinessId;
            this.$gob.post('permission/add',obj).then(res=>{
                if(res.data.code == 10000){
                     this.$emit('input',false);
                    this.$message.info(res.data.msg);
                }else{
                    this.$message.info(res.data.msg)
                }
            })
        }
    },
    data() {
        return {
            state:{
                indexAddress:null,
                type:null,
                bussinessId:null,
                permissionName:null,
                permissionUrl:null,
                permissionDesc:null,
            },
            typeList:[
                {id:1,label:'项目权限'},
                 {id:2,label:'商家权限'},
                  {id:3,label:'模块权限'},
                   {id:4,label:'列表权限'},
                    {id:5,label:'操作权限'},
            ]
        }
    },
}
</script>
<style lang="less">

</style>
