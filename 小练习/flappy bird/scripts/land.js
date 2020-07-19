const landDom = document.getElementsByClassName("land")[0];
const landWidth = parseFloat(getComputedStyle(landDom).width);
const landHeight = parseFloat(getComputedStyle(landDom).height);
const landTop = parseFloat(getComputedStyle(landDom).top)
class Land extends Father {
    constructor(speedX) {
        super(landWidth, landHeight, 0, landTop, speedX, 0, landDom);
    }
    onMove() {
        if (this.left <= -landWidth / 2) {
            this.left = 0;
        }
    }
}
