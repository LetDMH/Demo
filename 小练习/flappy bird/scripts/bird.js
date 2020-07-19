const birdDom = document.getElementsByClassName("bird")[0];
const birdWidth = parseFloat(getComputedStyle(birdDom).width);
const birdHeight = parseFloat(getComputedStyle(birdDom).height);
const birdTop = parseFloat(getComputedStyle(birdDom).top);
const birdLeft = parseFloat(getComputedStyle(birdDom).left);
class Bird extends Father {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
        this.g = 1500;
        this.birdSwing = 1;
        this.timer = null;
    }
    move(duration) {
        super.move(duration);
        this.speedY += this.g * duration;
    }
    startSwing() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.birdSwing++;
            if (this.birdSwing == 4) {
                this.birdSwing = 1;
            }
            this.dom.className = `bird swing${this.birdSwing}`;
        }, 200);
    }
    stopSwing() {
        clearInterval(this.timer);
        this.timer = null;
    }
    jump() {
        this.speedY = -450;
    }
    onMove() {
        if (this.top < 0) {
            this.top = 0;
        } else if (this.top > 462) {
            this.top = 462;
        }
    }
}
