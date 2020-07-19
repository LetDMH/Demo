class Game {
    constructor() {
        this.sky = new Sky();
        this.land = new Land(-100);
        this.bird = new Bird();
        this.pipeProducer = new PipePairProducer(-100);
        this.timer = null;
        this.interval = 30;
        this.gameOver = false;
    }
    start() {
        if (this.timer) {
            return;
        }
        if (this.gameOver) {
            window.location.reload();
        }
        this.bird.startSwing();
        this.pipeProducer.startProduce();
        this.timer = setInterval(() => {
            const duration = this.interval / 1000;
            this.sky.move(duration);
            this.land.move(duration);
            this.bird.move(duration);
            this.pipeProducer.pairs.forEach((pair) => {
                pair.move(duration);
            });
            if (this.isGameOver()) {
                this.stop();
                this.gameOver = true;
            }
        }, this.interval);
    }
    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.bird.stopSwing();
        this.pipeProducer.stopProduce();
    }
    isGameOver() {
        if (this.bird.top == 462 || this.bird.top == 0) {
            return true;
        }
        for (let i = 0; i < this.pipeProducer.pairs.length; i++) {
            const pair = this.pipeProducer.pairs[i];
            if (
                this.isHit(this.bird, pair.upPipe) ||
                this.isHit(this.bird, pair.downPipe)
            ) {
                return true;
            }
        }
        return false;
    }
    isHit(obj1, obj2) {
        const midX1 = obj1.left + obj1.width / 2;
        const midY1 = obj1.top + obj1.height / 2;
        const midX2 = obj2.left + obj2.width / 2;
        const midY2 = obj2.top + obj2.height / 2;
        const disX = Math.abs(midX1 - midX2);
        const disY = Math.abs(midY1 - midY2);
        if (
            disX < (obj1.width + obj2.width) / 2 &&
            disY < (obj1.height + obj2.height) / 2
        ) {
            return true;
        }
        return false;
    }
    regEvent() {
        window.onkeydown = (e) => {
            if (e.key == "Enter") {
                if (this.timer) {
                    this.stop();
                } else {
                    this.start();
                }
            } else if (e.key == " ") {
                this.bird.jump();
            }
        };
    }
}
var g = new Game();
g.regEvent();
