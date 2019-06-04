<template>
    <div>
        <div  :class="fileUpload">
            <input @change="upLoadData" type='file'/>>
        <div>
        <div>{{picfullpath}}</div>
        </div>
        </div>
     </div>
</template>


<script>
import axios from 'axios';
import qs from 'qs';
    export default{
        data() {
            return {
                 picfullpath:  '',
                 fileUpload:'fileUpload'
            }
        },
        methods:{
            upLoadData(e){
                let file = e.target.files[0];           
                let param = new FormData(); 
                param.append('file',file,file.name);
                axios.defaults.headers['Content-Type'] = 'multipart/form-data'; 
                axios.post('https://cms.youhuiduo.cn/management/CMS/File/Upload', param).then((res)=> {
                    if(res.data.Code=='10000'){
                        this.picfullpath = res.data.Data.dic.picfullpath;
                        this.$message({message: "上传成功"});
                    }
                }).catch(function (error) {
                　　    this.$message({message: "上传失败"});
                });
                

            }
        }
    }

</script>

<style lang="">
.fileUpload{
    margin:40px;
    padding:40px; 
}
    
</style>