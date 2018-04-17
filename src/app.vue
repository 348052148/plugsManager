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
                                 <Badge dot>
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
    import socket from './libs/socket.js';
    export default {
        data () {
            return {
                active:'1',
                theme3:'light',
                isCollapsed: false,
                isnetwork:true,
                title:'首页',
                appList:[
                    {appid:'1',icon:'home',name:'首页',path:'/'}
                ]
            }
        },
        created(){
            this.isnetwork = G.isnetwork;
            //首页图标
            socket.listenConnect((ws)=>{
                socket.listen('system.app.menu',(res)=>{
                    console.log(res.data.list);
                    res.data.list.forEach((v)=>{
                        this.appList.push(v);
                        
                    });
                });

                socket.request('system.app.menu',{},(res)=>{
                    //this.appList = res.data.list;
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
                    this.$router.push({name:'brow',params:{components:App.components}});
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
