function ajax(options) {
    options.type = options.type.toUpperCase() || "GET";
    options.url = options.url || "";
    var dataStr = "";
    if (typeof options.data == "object") {
        for (var prop in options.data) {
            if (options.data.hasOwnProperty(prop)) {
                dataStr += prop + "=" + options.data[prop] + "&";
            }
        }
    } else if (typeof options.data == "string") {
        dataStr = options.data;
    } else {
        dataStr = "";
    }
    options.success = options.success || function () {};
    options.error = options.error || function () {};
    options.dataType = options.dataType || "json";
    options.async = options.async || true;
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                options.success(JSON.parse(xhr.responseText));
            }
        }
    };
    if (options.type == "GET") {
        xhr.open(options.type, options.url + "?" + dataStr, options.async);
        xhr.send();
    } else if (options.type == "POST") {
        xhr.open("POST", options.url, options, async);
        xhr.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
        );
        xhr.send(dataStr);
    }
}
