
/*********socket*********** */


var socket={
    doFilterChain:[],
    requesFilterChain:[],
    listenFilterChain:[],
    initFilterChain:[],
    socketWs:null
};

socket.socketServer = function(closecall,errcall){
    try{
    var ws = new WebSocket('ws://localhost:3000');

    this.socketWs = ws;

    ws.onmessage = (msg)=> {
        this.doFilterChain.forEach((f)=>{

            f(JSON.parse(msg.data),ws);
        });
        //请求
        let index = null;
        this.requesFilterChain.forEach((f,i)=>{

            let msginfo = JSON.parse(msg.data);
            if(msginfo.action == f.id){
                f.func(msginfo,ws);
                index = i;
            }
        });
        if(index!=null){
            this.requesFilterChain.splice(index,1);
        }
        //监听
        this.listenFilterChain.forEach((f,i)=>{
            let msginfo = JSON.parse(msg.data);
            if(msginfo.action == f.id){
                f.func(msginfo,ws);
                index = i;
            }
        });
    };

    ws.onopen =(e)=>{
        this.initFilterChain.forEach((f)=>{
            f(ws);
        });
        console.log('............................CONNECTION...............................');
    };

    ws.onerror=(e)=>{
        errcall(e);
    }

    ws.onclose=(e)=>{
        closecall(e);
    }
}catch(e){
    alert('无法连接到服务器');
}
}

//获取socket资源
socket.socket = function(){
    return this.socketWs;
}

socket.listenConnect = function(func){
    this.initFilterChain.push(func);
}

//请求
socket.request=function(action,data,func){
    if(this.socketWs!=null){

        this.socketWs.send(JSON.stringify({action:action,data:data}));
        this.requesFilterChain.push({id:action,func:func});
    }
}

socket.listen = function(action,func){
    this.listenFilterChain.push({id:action,func:func});
}

export default socket;