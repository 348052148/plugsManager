<style scoped lang="less">
    .person{
        width: 100%;
        flex-direction: row;
    }

    .person .header{
        text-align:center;
        background:#fff;
        height:200px;
    }

    .person .header .avater {
        width:80px;
        height:80px;
        margin-top:40px;
    }
    a {
        color:#666;
        font-size:14px;
    }
</style>
<template>
    <div class="person">
        <div class="header">
            <router-link :to="url()">
             <Avatar class="avater" src="https://i.loli.net/2017/08/21/599a521472424.jpg" /></br></br> {{this.userInfo.nickname}}
             </router-link>
        </div>
    </div>
</template>
<script>
    import util from '../libs/util.js';
    import user from '../libs/user.js';
    export default {
        data(){
            return {
                userInfo:{nickname:'未登录'}
            };
        },
        created(){
            this.userInfo = user;
        },
        methods: {
            url(){
                return this.userInfo.isLogin()?'/person':'/login';
            }
        }
    }
</script>
