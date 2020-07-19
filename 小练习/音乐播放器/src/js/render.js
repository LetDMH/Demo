
//渲染图片，音乐信息，是否喜欢
;(function (root) {
    function renderImg(src) {
        // root.blurImg(src);
        var img = document.querySelector(".songImg img");
        img.src = src;
    }
    function renderInfo(data) {
        var info = document.querySelector(".songInfo").children;
        info[0].innerText = data.name;
        info[1].innerText = data.singer;
        info[2].innerText = data.album;
    }
    function renderIsLike(data) {
        var li = document.querySelectorAll(".control li")[0];
        li.className = data ? "like" : "";
    }
    root.render = function (data) {
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    };
})(window.player || (window.player = {}));
