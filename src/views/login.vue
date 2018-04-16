<style scoped lang="less">
    .login{
        width: 100%;
        flex-direction: row;
    }

    .login .header{
        text-align:center;
        background:#fff;
        height:200px;
    }

    .login .header .from{
        width:300px;
        display:inline-block;
        margin-top:50px;
    }
 
</style>
<template>
    <div class="login">
        <div class="header">

            <div class="from">

                    <Input type="text" size="large" v-model="loginForm.username" placeholder="用户名">
                            <Icon type="ios-person-outline"  slot="prepend"></Icon>
                        </Input>
                        <br>
                        <Input type="password"  size="large" v-model="loginForm.passwd"  placeholder="密码">
                            <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        </Input>
                        <br>
                         <Button type="primary" @click="handleSubmit()">Signin</Button>
            </div>
        </div>
        
    </div>
</template>
<script>
    import util from '../libs/util.js';
    import user from '../libs/user.js';
    import socket from '../libs/socket.js';
    export default {
        data(){
            return {
                loginForm:{}
            };
        },
        methods: {
            handleSubmit(){
                let id = util.MD5(this.loginForm.username+this.loginForm.passwd);
                //登录
                socket.request('login',{
                    username:this.loginForm.username,
                    pass:this.loginForm.passwd,
                    id:id
                },(msg)=>{
                    console.log(msg);
                    user.friendLst = msg.data.friendLst;
                    user.id = msg.data.id;
                    user.nickname = msg.data.nickname;
                    user.accessToken = msg.data.accessToken;

                    user.login(this.loginForm.username,this.loginForm.passwd,user.id);

                    this.$router.go(-1);
                    this.$Message.success('登录成功');
                });
            }
        }
    }
</script>
