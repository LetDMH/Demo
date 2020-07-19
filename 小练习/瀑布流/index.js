var lock = false
function getData(){
    if(lock){
        return
    }
    lock = true;
    ajax({
        type: 'GET',
        url: '/data.json',
        data: '',
        success: function(res){
            var data = res;
            console.log(data)
            renderDom(data);
            lock = false
        },
        async: true
    })
}

getData();

function renderDom(data){
    var oLi = document.getElementsByClassName('col');
    var imgWidth = oLi[0].offsetWidth - 20 - 20;
    data.forEach(function(value,index){
        var oImg = new Image();
        oImg.height = imgWidth * value.height / value.width;
        oImg.src = value.img;
        var oDiv = document.createElement('div');
        oDiv.className = 'item';
        var oP = document.createElement('p');
        oP.innerText = value.desc;
        oDiv.appendChild(oImg);
        oDiv.appendChild(oP);
        var minIndex = getMinLi().minIndex;
        oLi[minIndex].appendChild(oDiv);
    })
}

function getMinLi(){
    var oLi = document.getElementsByClassName('col');
    var minHeight = oLi[0].offsetHeight;
    var minIndex = 0;
    for(var i = 0;i < oLi.length;i++){
        if(minHeight > oLi[i].offsetHeight){
            minHeight = oLi[i].offsetHeight;
            minIndex = i;
        }
    }
    return {
        minIndex: minIndex,
        minHeight: minHeight
    }
}

window.onscroll = function(){
    var scrollTop = document.documentElement.scrollTop;
    // console.log(scrollTop)
    var clientHeight = document.documentElement.clientHeight;
    // console.log(clientHeight)
    var minHeight = getMinLi().minHeight;
    if(minHeight < scrollTop + clientHeight){
        getData()
    }
}