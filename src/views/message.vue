<style scoped lang="less">
    .message{
        width: 100%;
        flex-direction: row;
    }

    .msg-window{
        width:68%;
        height:100%;
        float:right;
        display:inline-block;
    }

    .msg-list-swrip {
        width:30%;
        height:450px;
        float:left;
        display:inline-block;
        list-style:none;
        background:#fff;
        border:1px solid #eee;
         position: relative;
        overflow: hidden;
         
    }

    .message .chat{
        width:100%;
        padding:10px;

        
    }

   .message .chat::-webkit-scrollbar {
        display: none;
    }

    .msg-mode {
        width:100%;
        padding:5px;
        border:1px solid #eee;
    }
    .msg-mode .user-info{
        display:inline-block;
        width:100%;
        margin-bottom:5px;
    }
    .msg-mode .msg-content{
        width:100%;
        flex-direction:column;
        display:flex;
        padding-left:30px;
        font-size:14px;
    }

    .slef-mode{
        width:100%;
        padding:5px;
        border:1px solid #eee;
    }
    .slef-mode .user-info {
         padding-right:10px;
         text-align:right;
         line-height:32px;
         display:inline-block;
        width:100%;
        margin-bottom:5px;
    }
    .slef-mode .user-info img{
        float:right;
        margin-left:10px;
    }
    .slef-mode .user-info span{
        float:right;
    }
    .slef-mode .user-info{
        flex-direction:column-reverse;
    }
    .slef-mode .msg-content{
        text-align:right;
        padding-right:30px;
        width:100%;
        font-size:14px;
    }
    


    .msg-list-swrip {
        width:30%;
        height:450px;
        float:left;
        display:inline-block;
        list-style:none;
        background:#fff;
        border:1px solid #eee;
         position: relative;
        overflow: hidden;
         
    }
    .msg-list::-webkit-scrollbar {
        display: none;
    }
    .msg-list {
        width:100%;
        height:100%;
         position: absolute; left: 0;
        overflow-x: hidden;
         overflow-y: scroll;
    }

    .msg-list .ul{
        display:inline-block;
        height:100%;
        
    }

     .msg-list ul li{
        display:inline-block;
        height:40px;
        width:100%;
        line-height:40px;
        padding-left:10px;
         border-bottom:1px solid #eee;
        
    }
     .msg-list ul li:hover{
         background:#eee;
         cursor:pointer;
         border-bottom:3px solid #54234;
     }
      .msg-list ul .search{
          padding-left:3px;
          padding-right:3px;
     }

     .demo-badge-alone{
         margin-left:20px;
         display:inline-block;
         float:right;
         margin-top:10px;
         margin-right:10px;
    }
</style>
<template>
    <div class="message">
        <div class="msg-list-swrip">
        <div class="msg-list">
            <ul>
                <li class="search"><i-input icon="search" placeholder="搜索" ></i-input></li>
                <li v-for="user in userLst"  :style="currentUserStyle(user.id)" @click="selectUser(user)"  >
                    <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                    &nbsp;&nbsp;{{user.nickname}}
                    <Badge class="demo-badge-alone" :count="unreadMsgCount(user)">
                    </Badge>
                </li>
            </ul>
        </div>
        </div>

        <div class="msg-window">
        <Scroll :style="{background:'#fff',marginBottom:'10px'}" :height="400" class="chat" >
            <ul>
                <li v-for="msg in getUserMsg" :class="msg.ismster?'slef-mode':'msg-mode'">
                    <div class="user-info"><Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />&nbsp;&nbsp;{{msg.user.nickname}}&nbsp;&nbsp;</div>
                    <div class="msg-content" :data="msg.read=true" >
                        {{msg.content.text}} 
                        <img v-for="img in msg.content.imgs" width="300" :src="img"/>
                    </div>
                </li>
            </ul>
        </Scroll>
     
        <Input @on-enter="inputMessage" v-model="inputMsg" placeholder="输入发送内容" clearable style="width: 300px"></Input>

        <i-button type="primary" shape="circle">发送</i-button>
        </div>

    </div>
</template>
<script>
    import util from '../libs/util.js';
    import user from '../libs/user.js';
    export default {
        data(){
            return {
                ws:{},
                userInfo:{},
                userLst:[],
                currentId:0,
                currentIndex:0,
                inputMsg:''
            }
        },
        created(){
            //页面关闭时释放消息连接
            window.onbeforeunload = ()=> {

                  util.request('user.logout',{
                      uid:this.userInfo.id
                  },(msg)=>{
                    
                  });
            };
           
            // 好友信息处理 包括聊天记录
            this.userInfo = user;

            let uLst = [];
            if(user.friendLst.length >1){
                user.friendLst.forEach((v)=>{
                    //排除自己
                    if(v.id!=user.id){
                        uLst.push({
                            id:v.id,nickname:v.nickname,msgLst:[]
                        });
                    }
                });
                this.userLst = uLst;
                this.currentId = this.userLst[0].id;
            }

            //监听消息
            util.listen('message.recv',(msg)=>{
                 console.log(msg);
                    let index = null;
                    this.userLst.forEach((v,i)=>{
                        if(v.id == msg.data.from){
                            index = i;
                        }
                    });
                    if(index!=null)
                    this.userLst[index].msgLst.push({
                        ismster:false,user:this.userLst[index],
                        content:{
                            text:msg.data.content
                        }
                    });
            });

           
        },
        computed: {
            getUserMsg(){
                let i =0;
                this.userLst.forEach((v,index)=>{
                    
                    if(v.id == this.currentId){
                        i = index;
                        this.currentIndex = index;
                    }
                });
                if(!this.userLst[i]){
                    return [];
                }
                return this.userLst[i].msgLst;
            }
        },
        methods: {

            //获取未读消息
            unreadMsgCount(user){
                let unread = 0; 

                if(this.currentId == user.id) return 0;

                user.msgLst.forEach((v)=>{
                    if(!v.read){
                        unread++;
                    }
                });
                
                return unread;
            },
            //标准当前用户
            currentUserStyle(id){
                if(this.currentId == id){
                    return {color:'red'};
                }
                return {};
            },
            //发送消息
            inputMessage () {

                util.request('message.send',{
                    from:this.userInfo.id,
                    to:this.userLst[this.currentIndex].id,
                    content:this.inputMsg
                },(msg)=>{
                   
                });

                this.userLst[this.currentIndex].msgLst.push(
                    {
                        ismster:true,user:this.userInfo,
                        content:{
                            text:this.inputMsg
                        }
                    }
                );
                this.inputMsg = '';
            },
            //选择用户
            selectUser(user){
                this.currentId = user.id;
                console.log(this.currentId);
            }
        }
    }
</script>
