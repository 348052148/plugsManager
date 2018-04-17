<style scoped lang="less">
    *{
        margin:0;
        padding:0;
        list-style:none;
    }
    .appbox{
        width:100%;
        margin-top:1px;
    }
    .appbox .applist{
        width:100%;
        background:#fff;
        display:inline-block;
    }
    .appbox .applist ul li{
        width:100%;
        height:40px;
        border:1px solid #fff;
        border-bottom:1px solid #eee;
        padding-left:10px;
    }
    .appbox .applist ul li:hover{
        cursor:pointer;
        color:#FFB90F;
        border-bottom:1px solid #FFB90F;
    }
    .appbox .applist ul li .icon{
        width:40px;
        display:inline-block;
        float:left;
        line-height:40px;
        height:100%;
    }
    .appbox .applist ul li .appname{
        height:100%;
        display:inline-block;
        font-size:10px;
        line-height:40px;
        text-align:center;
         float:left;
        color:#666;
    }

    .appbox .state{
        width:100%;
        height:60px;
        background:#fff;
        border-bottom:2px solid #3c78d8;
        line-height:60px;
        padding-left:10px;
    }

    .appbox .applist ul li .edit{
        height:100%;
        display:inline-block;
        line-height:40px;
        float:right;
        cursor:pointer;
    }
    .appbox .applist ul li .edit .delete{
        height:100%;
        text-align:center;
        width:40px;
        display:inline-block;
        line-height:40px;
        background:#d9534f;
        margin:0px;
        color:#fff;

    }

    .appbox .applist ul li .edit .join{
        height:100%;
        text-align:center;
        width:40px;
        display:inline-block;
        line-height:40px;
        background:#2db7f5;
        margin:0px;
        color:#fff;
    }
    .appbox .applist ul li .edit .open{
        height:100%;
        text-align:center;
        width:40px;
        display:inline-block;
        margin:0px;
        line-height:40px;
        background:#47cb89;
        color:#fff;
    }

</style>
<template>
    <div class="appbox">
        <div class="state">
            <Input v-model="searchStr" icon="ios-clock-outline" placeholder="搜索" style="width: 300px"></Input>
             <Button @click="editDis"  type="info">编辑</Button>
        </div>
        <div class="applist">
            <ul>
               
                <li v-for="app in appLst">
                    <Icon size="30" class="icon" :type="app.icon"></Icon><div class="appname" >{{app.name}}</div>
                    <div class="edit">
                        <router-link :to="{name:'brow',params:{components:app.components}}">
                        <Icon size="20" title="打开" class="open" type="outlet"></Icon>
                        </router-link>
                        <block v-if="edit">
                        <Icon size="20" v-if="app.ismenu == false" title="设置菜单" class="join" type="ios-paperplane"></Icon>
                        <Icon  size="20" v-else title="移除菜单" class="join"  type="android-cancel"></Icon>
                        
                        <Icon size="20" title="移除" class="delete" type="ios-trash-outline"></Icon>
                        </block>
                    </div>
                </li>

            </ul>
        </div>
        
    </div>
</template>
<script>
    import socket from '../libs/socket.js';
    export default {
        data(){
            return {
                edit:false,
                searchStr:"",
                appLst: []
            };
        },
        created(){
            socket.request('system.app.list',{},(res)=>{
                console.log(res.data.list);
                this.appLst = res.data.list;
            });
            
        },
        methods: {
            editDis(){
                this.edit = !this.edit;
            }
        }
    }
</script>
