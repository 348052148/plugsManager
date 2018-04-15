
var user = {
    id:'',
    username:'',
    nickname:'',
    _isLogin:false,
    accessToken:'',
    friendLst:[],
    record:[]
};

user.addRecord = function(key,val){
    this.record[key] = val;
}

user.isLogin =function(){
    return this._isLogin;
}

user.setLogin = function(s){
    this._isLogin = s;
}
//登录
user.login = function(username,passwd){
    localStorage.setItem('user',JSON.stringify({username:username,passwd:passwd}));
    this.setLogin(true);
}
//退出登录
user.logout = function(){
    this.setLogin(false);
}

//自动登录
user.autoLogin = function(callback){
    
    try{
        let user = JSON.parse(localStorage.getItem('user'));

        if(!user.username) return false;
        if(!user.passwd) return false;

        if(user){
            callback(user);
            return true;
        }
    }catch(e){
        return false;
    }

    return false;
}

export default user;