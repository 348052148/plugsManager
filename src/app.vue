<style scoped>
    @import 'styles/common.css';
</style>
<template>
    <div class="app">

     <Layout class="layer">
        <Sider  ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" >
            <Menu class="menu" width="200" :theme="theme3" active-name="1" @on-select="select" :class="menuitemClasses">
                    <MenuItem v-for="app in appList" :name="app.appid">
                        <Icon :type="app.icon"></Icon>
                        <span>{{app.name}}</span>
                    </MenuItem>
            </Menu>
        </Sider>
        <Layout>
             <Header :style="{padding: 0,background:'none',height:'50px',lineHeight:'50px',verticalAlign:'middle'}"  class="layout-header-bar">
                    <span @click="collapsedSider" :style="{margin:'10px 10px'}">首页</span>
            </Header>
            <Content :style="{padding:'10px'}" >
            
                <router-view></router-view>

            </Content>
           
        </Layout>
        
    </Layout>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                theme3:'light',
                isCollapsed: false,
                appList:[

                ]
            }
        },
        created(){
            this.appList = [
                {appid:'1',icon:'home',name:'首页',path:'/'},
                {appid:'2',icon:'android-compass',name:'翻译',path:'/ts'},
                {appid:'3',icon:'ios-chatbubble',name:'消息',path:'/msg'},
                {appid:"4",icon:'ios-list',name:'任务清单',path:'/task'},
                {appid:'5',icon:'person',name:'个人中心',path:'/person'}
            ];
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

                if(App)
                this.$router.push({ path: App.path });

            },
             collapsedSider () {
                this.$refs.side1.toggleCollapse();
            }
        }
    }
</script>
