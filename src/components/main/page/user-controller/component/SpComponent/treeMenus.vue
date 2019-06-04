<template>
    <!-- 迭代组件(组件内调用自己,详情百度) -->    
    <ul class="treeMenus">
        <li v-for="(item,index) in value " :key="index">
            <p>
                <el-checkbox v-if="fatherStatus" @change="change(item.info.id,item.info.recordStatus)" 
                             v-model="item.info.recordStatus">权限{{item.info.id}}</el-checkbox>
                <el-checkbox v-else v-model="item.info.recordStatus" :disabled="true" >权限{{item.info.id}}</el-checkbox>
                &nbsp&nbsp权限名称-{{item.info.permissionName}}
            </p>
            <tree-menus v-if="item.son" :fatherStatus='item.info.recordStatus' v-model="item.son"></tree-menus>

        </li>
    </ul>

</template>
<script>
import bus from './newBus.js';
import treeMenus from './treeMenus'
export default {
    components:{
        treeMenus
    },
    props:['value','fatherStatus'],
    watch: {
        fatherStatus(val){
            if(!val){
                for(let v in this.value){
                    this.value[v].info.recordStatus = this.fatherStatus;
                    bus.$emit('globalEvent',{
                        id:this.value[v].info.id,
                        Status:false
                    });
                }

            }
        }
    },
    name:'treeMenus',
    methods:{
        change(id,Status){
             var obj = {
                 Status,
                 id
             }
             if(this.fatherStatus){
                 bus.$emit('globalEvent',obj);
             }else{
                 this.$message.info('请先选择父级权限!');
             }           
             
        }
    }
}
</script>
<style lang="less">
.treeMenus{
    ul{
       list-style: none;
       margin-bottom: 8px;
       li{
          list-style: none;
          transform: translateX(40px);
          margin-bottom: 8px;
       } 
    }
    li{
          list-style: none;
    } 
}
</style>
