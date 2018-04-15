import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import user from './libs/user';

Vue.use(VueRouter);
Vue.use(iView);

// 路由配置
const RouterConfig = {
    routes: Routers
};
const router = new VueRouter(RouterConfig);

//开启socket 连接
Util.listenConnect((ws)=>{

    if(!user.isLogin()){
        //自动登录逻辑
        let isAuto = user.autoLogin((userInfo)=>{

            Util.request('login',{username:userInfo.username,pass:userInfo.passwd},(msg)=>{
                console.log(msg);
                user.friendLst = msg.data.friendLst;
                user.id = msg.data.id;
                user.nickname = msg.data.nickname;
                user.accessToken = msg.data.accessToken;
                user.login(userInfo.username,userInfo.passwd);

                iView.Message.success('自动登录成功！');
            });

        });

        if(!isAuto) router.push({ path: '/login' });

    }

    //监听好友列表
    Util.listen('user.friend.list',(msg)=>{
        console.log(msg);
        let uLst = [];
        msg.data.list.forEach((v)=>{
                uLst.push({
                    id:v.id,nickname:v.nickname,msgLst:[]
                });
            });
        user.friendLst = uLst;
    });
});
try{
    Util.socketServer((e)=>{

    },(err)=>{
        iView.Message.error('无法连接到服务器');
    });
}catch(e){
    alert('无法连接到服务器');
}


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
