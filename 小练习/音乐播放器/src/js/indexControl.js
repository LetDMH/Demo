(function (root) {
    function SetIndex(len) {
        this.index = 0;
        this.len = len;
    }
    SetIndex.prototype = {
        //上一首
        pre: function () {
            return this.jugIndex(-1);
        },
        //下一首
        next: function () {
            return this.jugIndex(1);
        },
        //返回索引
        jugIndex: function (val) {
            this.index = (this.index + val + this.len) % this.len;
            return this.index;
        },
    };
    root.controlIndex = SetIndex;
})(window.player || (window.player = {}));
