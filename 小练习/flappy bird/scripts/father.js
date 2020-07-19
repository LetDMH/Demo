class Father {
    //物体宽度，物体高度，物体横坐标，物体纵坐标，横向速度，纵向速度,对应的dom
    constructor(width, height, left, top, speedX, speedY, dom) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.speedX = speedX;
        this.speedY = speedY;
        this.dom = dom;
        this.render();
    }
    render() {
        this.dom.style.width = this.width + "px";
        this.dom.style.height = this.height + "px";
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
    }
    move(duration) {
        const moveX = this.speedX * duration;
        const moveY = this.speedY * duration;
        this.left += moveX;
        this.top += moveY;
        //每次渲染前都检测一下背景图片位置
        if(this.onMove){
            this.onMove();
        }
        this.render();
    }
}
