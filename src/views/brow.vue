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

    </div>
</template>
<script>
    import util from '../libs/util.js';
    import user from '../libs/user.js';
    import Loader from '../libs/loader.js';
    export default {
        data(){
            return {
                loginForm:{}
            };
        },
        created(){
            let $ = require('jquery');
            let loader = new Loader();
            loader.urlLoad('https://api.ismbao.com.cn/dist/index.html#/',(text)=>{
                console.log(text);
                $('.brow').html(text);
            });
        },
        methods: {
            
        }
    }
</script>
