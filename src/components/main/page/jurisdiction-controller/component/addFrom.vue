<template>
    <el-dialog
            title="新建单元权限"
            :visible.sync="value"
            width="30%">

            <el-form label-width="140px">
                <el-form-item label="选择业务权限">
                    <el-select v-model="state.parentId" placeholder="请选择">
                        <el-option
                            v-for="item in permissionOptions"
                            :key="item.id"
                            :label="item.permissionName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单元权限名">
                    <el-input v-model="state.permissionName"></el-input>
                </el-form-item>
                <el-form-item label="业务权限uri">
                    <el-input v-model="state.permissionUri"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="state.permissionDesc"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="value  = false">取 消</el-button>
                <el-button type="primary" @click="makeSureNewUnitPermission()">确 定</el-button>
            </span>

            </el-dialog>   
</template>
<script>
export default {
    props:['permissionOptions','value'],
    watch:{
        value(val){
            this.$emit('input',val);
        }
    },
    data() {
        return {
            state:{
                parentId:null,
                permissionName:null,
                permissionUri:null,
                permissionDesc:null,
            }
        }
    },
    methods:{
        makeSureNewUnitPermission(){

            if(!this.state.permissionName){
                this.$message({message: "单元权限名不能为空"});
                return
            }
            
            if(!this.state.permissionUri){
                this.$message({message: "业务权限uri不能为空"});
                return
            }

            this.$gob.post('permission/newUnitPermission',this.state).then(res=>{
                  this.$message({message: res.data.msg});
                  if(res.data.code){
                      this.newUnitPermission = false;
                      this.$emit('getList');
                      this.$emit('input',false);
                  }
            })
        }
    },
}
</script>
<style lang="less">

</style>
