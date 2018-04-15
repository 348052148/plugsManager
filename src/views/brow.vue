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
       <iframe heiget="500"  src="http://www.baidu.com"  />
    </div>
</template>
<script>
    import util from '../libs/util.js';
    import user from '../libs/user.js';
    export default {
        data(){
            return {
                loginForm:{}
            };
        },
        methods: {
            
        }
    }
</script>
