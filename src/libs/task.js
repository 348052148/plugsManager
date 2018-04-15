
var task={
    NeedLst:[],
    ComplateLst:[]
}

task.needLst = function(){
    try{
        if(this.NeedLst.length == 0){
            this.NeedLst = JSON.parse(localStorage.getItem('task.NeedLst'));
        }
        this.NeedLst = (this.NeedLst)?this.NeedLst:[];
    }catch(e){
        return [];
    }
    return this.NeedLst;
}

task.complateLst = function(){
    try{
        if(this.ComplateLst.length==0){
            this.ComplateLst = JSON.parse(localStorage.getItem('task.ComplateLst'));
        }
        this.ComplateLst = (this.ComplateLst)?this.ComplateLst:[];
    }catch(e){
        return [];
    }
    return this.ComplateLst;
}

task.addTask = function(task){
    console.log(task);
    this.NeedLst.push(task);

    this.save();
}

task.removeTask = function(task){
    let ri = null;
    this.ComplateLst.forEach((v,i)=>{
        if(v.id == task.id) ri = i;
    });
    if(ri!= null) this.ComplateLst.splice(ri,1);

    this.save();
}

task.complate = function(task){
    let rid =null;
    this.NeedLst.forEach((v,i)=>{
        if(task.id == v.id){
            rid = i;
            task = v;
            return ;
        }
    });
    if(rid!=null) this.NeedLst.splice(rid,1);
    this.ComplateLst.push(task);

    this.save();
}

task.save = function(){
    localStorage.setItem('task.NeedLst',JSON.stringify(this.NeedLst));
    localStorage.setItem('task.ComplateLst',JSON.stringify(this.ComplateLst));
}

export default task;