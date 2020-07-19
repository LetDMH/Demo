function myAjax(type,url,data,success,error,async){
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                success(JSON.parse(xhr.responseText));
            }else{
                error(JSON.parse(xhr.responseText));
            }
        }
    }
    if(type == 'GET'){
        xhr.open(type,url + '?' + data,async);
        xhr.send();
    }else if(type == 'POST'){
        xhr.open(type,url,async);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
}