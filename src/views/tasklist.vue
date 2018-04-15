<style scoped lang="less">
    .task{
        width: 100%;
        flex-direction: row;
    }
    .task .header{
        display:inline-block;
        width: 100%;
    }
    .task .body{
        display:inline-block;
        width: 100%;
        margin-top:20px;
    }

    .task .edit{
        display:inline-block;
        width: 85%;
        margin-top:20px;
    }

    .task .body .handle{
        display:inline-block;
        float:left;
        width:49%;
        height:400px;
        background:#fff;
    }
    .task .body .handle ul {
        list-style:none;
    }

    .task .body .handle ul li{
        width:100%;
        height:40px;
        line-height:40px;
        border-bottom:1px solid #eee;
        font-size:12px;
    }
    .task .body .handle ul li .check{
            float:right;
    }
    .task .body .handle ul li:hover{
        background:#eee;
        cursor:pointer;
    }


    .task .body .complate{
        display:inline-block;
        float:right;
        width:49%;
        height:400px;
        background:#fff;
    }
    .task .body .complate ul {
        list-style:none;
    }

    .task .body .complate ul li{
        width:100%;
        height:40px;
        line-height:40px;
        border-bottom:1px solid #eee;
        font-size:12px;
    }
    
    .task .body .complate ul li .clear{
            float:right;
            display:inline-block;
            line-height:40px;
    }
    .task .body .complate ul li:hover{
        background:#eee;
        cursor:pointer;
    }


    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }

</style>
<template>
    <div class="task">

        <div class="header">
        <i-input icon="ios-clock-outline" @on-enter="sAddtask" v-model="search" @on-change="searchTask" placeholder="请输入..." style="width: 350px"></i-input> 
        <i-button @click="routeAdd" type="primary" icon="plus-round">新增</i-button>
        
        </div>
        <div v-if="mode ==2" class="edit">
            <i-form :model="task" :label-width="80">
                <Form-item label="任务名称">
                    <i-input v-model="task.name" placeholder="请输入"></i-input>
                </Form-item>
                <Form-item label="截止时间">
                     <Row>
                        <i-col span="11">
                            <Date-picker type="date" placeholder="选择日期" v-model="task.date"></Date-picker>
                        </i-col>
                        <i-col span="2" style="text-align: center">-</i-col>
                        <i-col span="11">
                            <Time-picker type="time" placeholder="选择时间" v-model="task.time"></Time-picker>
                        </i-col>
                    </Row>
                </Form-item>
                <Form-item label="任务描述">
                    <i-input v-model="task.desc"  type="textarea" :autosize="{minRows: 8,maxRows: 10}" placeholder="请输入..."></i-input>
                </Form-item>
                <Form-item>
                    <i-button @click="Add" type="primary">提交</i-button>
                    <i-button type="ghost" @click="routerBack" style="margin-left: 8px">返回</i-button>
                </Form-item>
            </i-form>
        </div>
        <div v-if="mode == 1" class="body">
            
                <Card  class="handle" :bordered="false">
                    <p slot="title">待办事项</p>
                    <p>
                        <ul>
                            <li v-for="task in taskLst" :style="task.style" ><Icon type="ionic"></Icon>&nbsp;&nbsp;{{task.name}} <Checkbox @on-change="complete(task.id)" class="check" ></Checkbox></li>
                        </ul>
                    </p>
                </Card>
            <Card  class="complate" :bordered="false">
                    <p slot="title">完成事项</p>
                    <p>
                        <ul>
                            <li v-for="task in complateLst" :style="task.style" ><Icon type="android-done"></Icon>&nbsp;&nbsp;{{task.name}} 
                                <Icon size="16" @click.native="clearCompalate(task)"  class="clear" type="trash-a"></Icon>
                            </li>
                        </ul>
                    </p>
            </Card>
        </div>
    </div>
</template>
<script>
    import util from '../libs/util.js';
    import Task from '../libs/task.js';
    export default {
        data(){
            return {
                search:'',
                taskLst:[],
                complateLst:[],
                mode:1,
                task:{name:'',desc:'',style:{}}
            };
        },
        created(){
            //持久化逻辑
            this.taskLst = Task.needLst();
            this.complateLst = Task.complateLst();
        },
        methods: {
            routeAdd(){
                this.task = {};
                this.mode = 2;
            },
            routerBack(){
                this.mode = 1;
            },

            Add(){
                this.task.id = util.uuid();
                this.taskLst.push(this.task);
                this.mode = 1;
                //持久化逻辑
                Task.addTask(this.task);
            },
            sAddtask(){
                let task = {name:'',desc:'',style:{}};
                task.id = util.uuid();
                task.name = this.search;
                task.desc = this.search;
                //this.taskLst.push(task);
                //持久化逻辑
                Task.addTask(task);
                this.search = "";
            },
            clearCompalate(task){
                Task.removeTask(task);
                 this.$Message.info('删除任务:'+task.name);
            },
            complete(id){
                let rid = null;
                let task = null;
                this.taskLst.forEach((v,i)=>{
                    if(id == v.id){
                        rid = i;
                        task = v;
                        return ;
                    }
                });
                //this.taskLst.splice(rid,1);

                task.state = 'complate';
                //this.complateLst.push(task);
                //持久化逻辑
                Task.complate(task);
                this.$Message.info('完成任务:'+task.name);
            },
            searchTask(){
                this.taskLst.forEach((v,i)=>{

                    if( this.search !='' && v.name.search(this.search) >=0 ){
                        this.taskLst[i].style={color:'red'};
                    }else{
                        this.taskLst[i].style={};
                    }
                });
                this.complateLst.forEach((v,i)=>{

                    if( this.search !='' && v.name.search(this.search) >=0 ){
                        this.complateLst[i].style={color:'#FFB90F'};
                    }else{
                        this.complateLst[i].style={};
                    }
                });
            }
        }
    }
</script>
