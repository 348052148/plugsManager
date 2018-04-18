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
        <LoaderComponents :socket="socket" :url="furl" />
    </div>
</template>
<script>
    import util from '../libs/util.js';
    import user from '../libs/user.js';
    import Loader from '../libs/loader.js';
    import LoaderComponents from '../components/LoaderComponents/LoaderComponents.vue';
    import socket from '../libs/socket.js';
    export default {
        components:{
            LoaderComponents 
        },
   
        data(){
            return {
                url:'',
                socket:null
            };
        },
        watch: {
            '$route'(to, from) {
                console.log(this.$route.params.components);
                this.url = this.$route.params.components;
            }
        },
        computed:{
            furl(){
                this.url = this.$route.params.components;
                return this.url;
            }
        },
        beforeUpdate(){
            
        },
        mounted(){
           console.log('mounted');
        },
        created(){
            this.socket = socket;
             this.url = this.$route.params.components;
        },
        methods: {
            
        }
    }
</script>
