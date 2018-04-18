<style scoped>
    @import 'styles/common.css';
</style>
<template>
    <div class="app">

     <Layout class="layer">
        <Sider  ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" >
            <Menu class="menu" width="200" :theme="theme3" :active-name="active" @on-select="select" :class="menuitemClasses">
                    <MenuItem v-for="app in appList" :name="app.appid">
                        <Icon :type="app.icon"></Icon>
                        <span>{{app.name}}</span>
                    </MenuItem>
            </Menu>
        </Sider>
        <Layout>
             <Header :style="{padding: 0,background:'none',height:'50px',lineHeight:'50px',verticalAlign:'middle'}"  class="layout-header-bar">
                    <span @click="collapsedSider" :style="{margin:'10px 10px'}">{{title}}</span>
                    <div class="rnotify">
                        <ul>
                            <li>
                                <Icon :type="isnetwork?'social-rss':'social-rss-outline'" size="16" style="margin-right:5px;"></Icon>
                            </li>
                            <li>
                                 <Badge v-if="msgcount == 0" dot>
                                    <Icon type="ios-bell-outline" size="20"></Icon>
                                </Badge>
                                <Badge v-else :count="msgcount">
                                    <Icon type="ios-bell-outline" size="20"></Icon>
                                </Badge>
                            </li>
                        </ul>
                    </div>
            </Header>
            <Content :style="{padding:'10px'}" >
            
                <router-view></router-view>

            </Content>
           
        </Layout>
        
    </Layout>
    </div>
</template>
<script>
    import G from './libs/globa.js';
    import user from './libs/user';
    import socket from './libs/socket.js';
    export default {
        data () {
            return {
                active:'1',
                theme3:'light',
                msgcount:0,
                isCollapsed: false,
                isnetwork:true,
                title:'首页',
                appList:[
                    {appid:'1',icon:'home',name:'首页',path:'/'}
                ]
            }
        },
        created(){
            //连接服务器
            try{
                socket.socketServer((e)=>{
                   this.isnetwork = false;
                },(err)=>{
                    this.$Message.error('无法连接到服务器');
                    this.isnetwork = false;
                });
            }catch(e){
                alert('无法连接到服务器');
                this.isnetwork = false;
            }finally{
                
                
            }
            //连接监听
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

                            this.$Message.success('自动登录成功！');
                        });

                    });

                    if(!isAuto) router.push({ path: '/login' });

                }
                //菜单请求
                socket.request('system.app.menu',{},(res)=>{
                    //this.appList = res.data.list;
                });
    
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

                socket.listen('message.recv.count',(msg)=>{

                    this.$Notice.open({
                        title: '你有新的消息',
                        desc: msg.data.content
                    });
                });

                //app菜单监听
                socket.listen('system.app.menu',(res)=>{
                    console.log(res.data.list);
                    res.data.list.forEach((v)=>{
                        this.appList.push(v);
                        
                    });
                });


            });
           
          
        },
        mounted () {

        },
        beforeDestroy () {

        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {
            select(appid){
                let App = null;
                this.appList.forEach((v)=>{
                    if(v.appid ==appid){
                        App = v;
                    }
                });
                this.title = App.name;
                if(App)
                if(App.components){
                    console.log(App.components);
                    this.$router.replace({path:'/brow/'+encodeURIComponent(App.components),params:{components:App.components}});
                }else{
                     this.$router.push({ path: App.path});
                }
               

            },
             collapsedSider () {
                this.$refs.side1.toggleCollapse();
            }
        }
    }
</script>
