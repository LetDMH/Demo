(function (root) {
    function listRender(data, dom) {
        var list = document.createElement("div"),
            dl = document.createElement("dl"),
            dt = document.createElement("dt"),
            close = document.createElement("div"),
            musicList = [];
        dt.innerText = "播放列表";
        list.className = "list";
        list.appendChild(dl);
        dl.appendChild(dt);
        close.innerText = "关闭";
        close.className = "close";
        list.appendChild(close);
        data.forEach(function (item, index) {
            var dd = document.createElement("dd");
            dd.innerText = item.name;
            dd.addEventListener("touchend", function () {
                changeSelected(index);
            });
            dl.appendChild(dd);
            musicList.push(dd);
        });
        dom.appendChild(list);
        var disY = list.offsetHeight;
        list.style.transform = "translateY(" + disY + "px)";
        changeSelected(0);
        //关闭按钮的点击事件
        close.addEventListener("touchend", function () {
            slideDown();
        });
        //列表滑动显示
        function slideUp() {
            list.style.transition = ".2s";
            list.style.transform = "translateY(0px)";
        }
        //列表滑动隐藏
        function slideDown() {
            list.style.transition = ".2s";
            list.style.transform = "translateY(" + disY + "px)";
        }
        //切换选中元素
        function changeSelected(index) {
            for (var i = 0; i < musicList.length; i++) {
                musicList[i].className = "";
            }
            musicList[index].className = "active";
        }
        return {
            dom: list,
            musicList: musicList,
            slideUp: slideUp,
            slideDown: slideDown,
            changeSelected: changeSelected,
        };
    }
    root.listRender = listRender;
})(window.player || (window.player = {}));
