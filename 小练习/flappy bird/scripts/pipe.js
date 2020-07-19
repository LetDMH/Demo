const gameDom = document.getElementsByClassName("game")[0];
const gameWidth = gameDom.offsetWidth;
class Pipe extends Father {
    constructor(height, top, speedX, dom) {
        super(52, height, gameWidth, top, speedX, 0, dom);
    }
    onMove() {
        if (this.left < -52) {
            this.dom.remove();
        }
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

class PipePair {
    constructor(speedX) {
        this.spaceHeight = 150;
        this.minHeight = 80;
        this.maxHeight = landTop - this.spaceHeight - this.minHeight;
        this.upHeight = getRandom(this.minHeight, this.maxHeight);
        this.downHeight = landTop - this.spaceHeight - this.upHeight;
        this.downTop = landTop - this.downHeight;
        const upDom = document.createElement("div");
        upDom.className = "pipe up";
        const downDom = document.createElement("div");
        downDom.className = "pipe down";
        this.upPipe = new Pipe(this.upHeight, 0, speedX, upDom);
        this.downPipe = new Pipe(this.downHeight, this.downTop, speedX, downDom);
        gameDom.appendChild(upDom);
        gameDom.appendChild(downDom);
    }
    get useLess() {
        return this.upPipe.left < -52;
    }
    move(duration) {
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }
}

class PipePairProducer {
    constructor(speedX) {
        this.interval = 1500;
        this.timer = null;
        this.pairs = [];
        this.speedX = speedX;
    }
    startProduce() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.pairs.push(new PipePair(this.speedX));
            for (let i = 0; i < this.pairs.length; i++) {
                if (this.pairs[i].useLess) {
                    this.pairs.splice(i, 1);
                    i--;
                }
            }
        }, this.interval);
    }
    stopProduce() {
        clearInterval(this.timer);
        this.timer = null;
    }
}

