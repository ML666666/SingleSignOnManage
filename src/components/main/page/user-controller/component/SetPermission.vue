<template>
    <el-dialog
            id="SetPermission"
            title="设定权限"
            :visible.sync="value"
            width="50%">

            <el-form label-width="140px">
                <treeMenus :fatherStatus='true' v-model='permissionOptions'></treeMenus>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="value = false">取 消</el-button>
                <el-button type="primary" @click="setPermission()">确 定</el-button>
            </span>
            
    </el-dialog>
</template>
<script>
import bus from './SpComponent/newBus.js'
import treeMenus from './SpComponent/treeMenus'
export default {
    components: {
        treeMenus
    },
    mounted() {
        bus.$on('globalEvent',(val)=>{
            this.permissions = "";
            this.reSetPermissions(this.permissionOptions);
        })
    },
    props:['permissionOptions','value','roleIdsList','permissionUserId','rowObj'],
    watch: {
        value:function(val){
            this.$emit('input',this.value);
        },
        roleIdsList:function(){
            this.reSetPermissionOptions(this.permissionOptions)
        },
    },
    data(){
        return{
            permissions:''
        }
    },
    methods: {
        setPermission(){
            var obj = {
                userId:this.permissionUserId,
                permissions:this.permissions.substring(0,this.permissions.length-1),
            }
            this.$gob.post('user/perSet',obj).then(res=>{
                if(res.data.code == 10000){
                    this.$message.info('修改权限成功!');
                    this.value = false;
                }else{
                    this.$message.info(res.data.msg);
                }
            })
        },

        reSetPermissionOptions(obj,array=this.roleIdsList){
            for(let k in obj){
                console.log(array.indexOf(obj[k].info.id)+'----'+obj[k].info.id)
                array.indexOf(obj[k].info.id)>=0?obj[k].info.recordStatus=true:obj[k].info.recordStatus=false;
                if(obj[k].son){
                    this.reSetPermissionOptions(obj[k].son);
                }
            }
        },

        reSetPermissions(array){
            for(let k in array){
                if(array[k].info.recordStatus){
                    this.permissions += array[k].info.id+',';
                }
                if(array[k].son){
                    this.reSetPermissions(array[k].son);
                }
            }
        }

    }
}   
</script>
<style lang="less">
#SetPermission{
    .el-dialog__body{
        max-height: 50vh !important;
        overflow-y:scroll; 
        overflow-x: hidden;
    }
}
</style>
