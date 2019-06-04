<<template>
     <el-dialog
            title="编辑业务"
            :visible.sync="isChange"
            width="30%">
            <el-form label-width="140px">
                <el-form-item label="接口地址">
                    <el-input v-model="Trecord.indexAddress"></el-input>
                </el-form-item>
                <el-form-item label="业务权限名称">
                    <el-input v-model="Trecord.permissionName"></el-input>
                </el-form-item>
                <el-form-item label="业务权限uri">
                    <el-input v-model="Trecord.permissionUri"></el-input>
                </el-form-item>
                <el-form-item label="业务权限描述">
                    <el-input v-model="Trecord.permissionDesc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isChange = false">取 消</el-button>
                <el-button type="primary" @click="toMakeSureChange()">确 定</el-button>
            </span>
        </el-dialog>
</template>
<script>
export default {
    props:['value','record'],
    mounted() {
        this.Trecord = this.record;
    },
    data () {
        return {
            isChange:false,
            Trecord:{}
        }
    },
    methods: {
        toMakeSureChange(){
            if(!this.Trecord.indexAddress){
                this.$message({message: '接口地址不能为空'});
                return
            }
            if(!this.Trecord.permissionUri){
                this.$message({message: '业务权限url不能为空'});
                return
            }
            if(!this.Trecord.permissionName){
                this.$message({message: '业务权限名称不能为空'});
                return
            }
            var obj = {
                permissionId:this.Trecord.permissionId,
                indexAddress:this.Trecord.indexAddress,
                permissionUri:this.Trecord.permissionUri,
                permissionName:this.Trecord.permissionName,
                permissionDesc:this.Trecord.permissionDesc
            }
            this.$gob.post('permission/updateBusinessPermission',obj).then(res=>{
                if(res.data.code == 10000){
                    this.$emit('reLoad')
                    this.$message({message: res.data.msg});
                    this.isChange = false;
                }else{
                    this.$message({message: res.data.msg});
                }
            })
        },
    },
    watch: {
        isChange(val){
            this.$emit('input',this.isChange);
        },
        value(val){
            this.isChange = this.value;
        }
    }
}
</script>
<style lang="less">

</style>
