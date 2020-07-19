function ajax(option){
    option.type = option.type.toUpperCase() || 'GET';
    option.url = option.url || '';
    var dataStr = '';
    if(typeof option.data == 'object'){
        for(var prop in option.data){
            if(option.data.hasOwnProperty(prop)){
                dataStr += prop + '=' + option.data[prop] + '&';
            }
        }
    }else if(typeof option.data == 'string'){
        dataStr = option.data;
    }else{
        dataStr = '';
    }
    option.success = option.success || function(){};
    option.error = option.error || function(){};
    option.dataType = option.dataType || 'json';
    option.async = option.async || true;
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
            option.success(JSON.parse(xhr.responseText))
        }
    }
    if(option.type == 'GET'){
        xhr.open('GET',option.url + '?' + dataStr,option.async);
        xhr.send();
    }else if(option.type == 'POST'){
        xhr.open('POST',option.url,option.async);
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        xhr.send(dataStr);
    }
}