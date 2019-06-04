<template>
    <div id="jurisdiction-controller">

            <div class="wrapper">
                <el-button size="small" type="primary" icon="el-icon-plus" plain @click="toNewUnitPermission()">新增项目</el-button>  
                <div class="select">
                    <el-select  v-model="selectId" placeholder="请选择">
                        <el-option
                            v-for="item in permissionOptions"
                            :key="item.id"
                            :label="item.permissionName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-Input class="selectValue" type="text" placeholder="请输入单元权限名称"  v-model="selectValue"></el-Input> 
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
                label="单元权限名称"
                prop="permissionName">
            </el-table-column>
            <el-table-column
                label="业务权限URL">
                <template slot-scope="scope">
                     <div v-if="scope.row.permissionUrl"><a :href="scope.row.permissionUrl">{{scope.row.permissionUrl}}</a></div>
                     <div v-else>暂无数据</div>
                </template>
            </el-table-column>
            <el-table-column
                label="业务地址">
                 <template slot-scope="scope">
                     <div v-if="scope.row.indexAddress"><a :href="scope.row.indexAddress">{{scope.row.indexAddress}}</a></div>
                     <div v-else>暂无数据</div>
                 </template>
            </el-table-column>
            <el-table-column
                label="权限说明">
                 <template slot-scope="scope">
                     <div v-if="scope.row.permissionDesc">{{scope.row.permissionDesc}}</div>
                     <div v-else>暂无数据</div>
                 </template>
            </el-table-column>
            <el-table-column
                label="创建时间"
                prop="createTime">
            </el-table-column>
            <el-table-column
                width="300px"
                label="用户操作"
                prop="userCnName">
                  <template slot-scope="scope">
                    <el-button v-if="scope.row.type != 2 && scope.row.type != 5" @click="toChangeUserFun(scope.row)" plain  size="small">添加子项</el-button>
                  </template>
            </el-table-column>
            </el-table>

            <div class="wrapper">
                <el-pagination
                    v-if="total"
                    :current-page.sync="pageIndex"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>

            <addFrom
                @getList='getList' 
                :permissionOptions='permissionOptions'
                v-model="newUnitPermission"></addFrom>
            
            <editFrom 
                :obj='obj' 
                :permissionOptions='permissionOptions'
                v-model="toChangeUser">
                </editFrom>
    </div>
</template>
<script>
import addFrom from './component/addFrom';
import editFrom from './component/editFrom';
export default {
    components: {
        addFrom,
        editFrom
    },
    mounted(){
        this.getList();
        this.$gob.get('permission/getBusinessPermission').then(res=>{
            this.permissionOptions = res.data.data;
            this.permissionOptions[0].id = 0;
            this.permissionOptions[0].permissionName = '全部';
        })
    },
    methods:{
        getList(){
            var obj = {
                parentId:this.selectId?this.selectId:null,
                permissionName:this.selectValue?this.selectValue:null,
                pageIndex:this.pageIndex,
                pageCount:10
            }
            this.$gob.get('permission/getPermissions',obj).then(res=>{
                this.list = res.data.data.permissions;
                this.total = res.data.data.total;
            })
        },
        toNewUnitPermission(){
            this.newUnitPermission = true;
        },
        toChangeUserFun(row){
            for(let k in row){
                this.obj[k] = row[k]
            }
            this.toChangeUser = true;
        },
    },
    watch:{
        pageIndex:function(){
            this.getList();
        },
        selectId:function(){
            this.getList();
        },
        selectValue:function(){
            this.getList();
        }
    },
    data:function(){
        return{
            permissionOptions:[],
            list:[],
            total:null,
            pageIndex:1,
            pageCount:10,
            toChangeUser:false,
            newUnitPermission:false,
            selectId:null,
            selectValue:null,
            obj:{},
        }
    }
}
</script>
<style lang="less">
#jurisdiction-controller{
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
                width: 170px;
            }
            .selectValue{
                width: 200px;
                margin-left: 6px;
            }
        }
    }
}
</style>
