import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';

import user from './libs/user';
import socket from './libs/socket';
import G from './libs/globa.js';

//开启socket 连接
socket.listenConnect((ws)=>{

    if(!user.isLogin()){
        //自动登录逻辑
        let isAuto = user.autoLogin((userInfo)=>{

            socket.request('login',{username:userInfo.username,pass:userInfo.passwd,id:userInfo.id},(msg)=>{
                console.log(msg);
                user.friendLst = msg.data.friendLst;
                user.id = msg.data.id;
                user.nickname = msg.data.nickname;
                user.accessToken = msg.data.accessToken;
                user.login(userInfo.username,userInfo.passwd,user.id);

                iView.Message.success('自动登录成功！');
            });

        });

        if(!isAuto) router.push({ path: '/login' });

    }
    
    //监听好友列表
    socket.listen('user.friend.list',(msg)=>{
        console.log(msg);
        let uLst = [];
        msg.data.list.forEach((v)=>{
                uLst.push({
                    id:v.id,nickname:v.nickname,msgLst:[]
                });
            });
        user.friendLst = uLst;
    });

    //监听系统推送通知
    socket.listen('system.push.notify',(msg)=>{
        this.$Notice.open({
            title: '系统通知',
            desc: '系统可能出现了异常'
        });
    });

});
try{
    socket.socketServer((e)=>{
        G.isnetwork = false;
    },(err)=>{
        iView.Message.error('无法连接到服务器');
        G.isnetwork = false;
    });
}catch(e){
    alert('无法连接到服务器');
    G.isnetwork = false;
}


Vue.use(VueRouter);
Vue.use(iView);

// 路由配置
const RouterConfig = {
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
