class Loader{
    constructor(){

    }
    // 远程加载
    urlLoad(url,func){
        let xmlHttp = null;
        //根据window.XMLHttpRequest对象是否存在使用不同的创建方式 
        if (window.XMLHttpRequest) { 
            xmlHttp = new XMLHttpRequest(); //FireFox、Opera等浏览器支持的创建方式 
        } else { 
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");//IE浏览器支持的创建方式 
        } 
        
        xmlHttp.onreadystatechange = ()=>{
            if (xmlHttp.readyState == 4) { 
                func(xmlHttp.responseText);
            }     
        }; //设置回调函数 
        xmlHttp.open("GET", url, true); 
        xmlHttp.send(null);
       
    }

    locaLoad(file,func){
        var selectedFile = file;// document.getElementById('files').files[0];
        var name = selectedFile.name;//读取选中文件的文件名
            var size = selectedFile.size;//读取选中文件的大小
            console.log("文件名:"+name+"大小:"+size);

            var reader = new FileReader();//这是核心,读取操作就是由它完成.
            reader.readAsText(selectedFile);//读取文件的内容,也可以读取文件的URL
            reader.onload = function () {
                //当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
                console.log(this.result);
				func(this.result);
            }
    }
}

export default Loader;