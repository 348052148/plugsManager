<style scoped lang="less">
    .brow{
        width: 100%;
        flex-direction: row;
        heiget:100%;
    }

    .brow iframe{
        width:100%;
        height:500px;
        border:none;
    }

 
</style>
<template>
    <div class="brow">
        <!--
       <iframe heiget="500"  src="http://www.baidu.com"  />
       -->
        <LoaderComponents :url="url" />
    </div>
</template>
<script>
    import util from '../libs/util.js';
    import user from '../libs/user.js';
    import Loader from '../libs/loader.js';
    import LoaderComponents from '../libs/LoaderComponents.min.js';
    export default {
        components:{
            LoaderComponents 
        },
   
        data(){
            return {
                url:''
            };
        },
        watch: {
            '$route'(to, from) {
                console.log(this.$route.params.components);
                this.url = this.$route.params.components;
            }
        },
        beforeUpdate(){
            
        },
        mounted(){
           
        },
        created(){
             this.url = this.$route.params.components;
        },
        methods: {
            
        }
    }
</script>
