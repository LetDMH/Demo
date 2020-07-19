(function (Zepto, player) {
    function MusicPlayer(dom) {
        this.wrap = dom;
        this.controlIndex = null;
        this.dataList = [];
        this.timer = null;
        this.list = null;
    }
    MusicPlayer.prototype = {
        init: function () {
            this.getDom();
            this.getData("../mock/data.json");
        },
        getDom: function () {
            this.controlBtns = document.querySelectorAll(".control li");
            this.img = document.querySelector(".songImg img");
        },
        getData: function (url) {
            var self = this;
            Zepto.ajax({
                url: url,
                method: "get",
                success: function (data) {
                    console.log(data);
                    self.dataList = data;
                    self.listChange();
                    self.controlIndex = new player.controlIndex(data.length);
                    self.loadMusic(self.controlIndex.index);
                    self.controlMusic();
                },
                error: function () {
                    console.log("请求数据失败！");
                },
            });
        },
        loadMusic: function (index) {
            player.render(this.dataList[index]);
            player.music.load(this.dataList[index].audioSrc);
            // 判断播放状态
            if (player.music.status == "playing") {
                player.music.play();
                this.controlBtns[2].className = "play";
                this.imgRotate(0);
            }
            this.index = index;
        },
        controlMusic: function () {
            var self = this;
            //上一首
            this.controlBtns[1].addEventListener("touchend", function () {
                player.music.status = "playing";
                self.loadMusic(self.controlIndex.pre());
            });
            //下一首
            this.controlBtns[3].addEventListener("touchend", function () {
                player.music.status = "playing";
                self.loadMusic(self.controlIndex.next());
            });
            //播放暂停
            this.controlBtns[2].addEventListener("touchend", function () {
                if (player.music.status == "playing") {
                    player.music.pause();
                    player.music.status = "pause";
                    this.className = "";
                    self.stopRotate();
                } else {
                    player.music.play();
                    player.music.status = "playing";
                    this.className = "play";
                    self.imgRotate(self.img.dataset.rotate || 0);
                }
            });
        },
        imgRotate: function (deg) {
            var self = this;
            if (this.timer) {
                return;
            }
            this.timer = setInterval(function () {
                deg = +deg + 0.2;
                self.img.style.transform = "rotate(" + deg + "deg)";
                self.img.dataset.rotate = deg;
            }, 1000 / 60);
        },
        stopRotate: function () {
            clearInterval(this.timer);
            this.timer = null;
        },
        listChange: function () {
            var self = this;
            this.list = player.listRender(this.dataList, this.wrap);
            this.controlBtns[4].addEventListener("touchend", function () {
                self.list.slideUp();
            });
            this.list.musicList.forEach(function (item, index) {
                item.addEventListener("touchend", function () {
                    if (self.index == index) {
                        return;
                    }
                    player.music.status = "playing";
                    self.controlIndex.index = index;
                    self.loadMusic(index);
                    self.list.slideDown();
                });
            });
        },
    };
    var musicPlayer = new MusicPlayer(document.getElementById("wrap"));
    musicPlayer.init();
    console.log(player);
})(window.Zepto, window.player);
