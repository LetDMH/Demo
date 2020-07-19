const skyDom = document.getElementsByClassName("sky")[0];
const skyWidth = parseFloat(getComputedStyle(skyDom).width);
const skyHeight = parseFloat(getComputedStyle(skyDom).height);
class Sky extends Father {
    constructor() {
        super(skyWidth, skyHeight, 0, 0, -50, 0, skyDom);
    }
    onMove() {
        if (this.left <= -skyWidth / 2) {
            this.left = 0;
        }
    }
}
