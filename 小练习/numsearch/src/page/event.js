import appendNum from "./appendNum";
import NumberCreator from "../tools/number";
var n = new NumberCreator(100);
n.onNumberCreated = function (num, isPrime) {
    appendNum(num, isPrime);
};
var lock = false;
window.onclick = function () {
    if (lock) {
        n.stop();
        lock = false;
    } else {
        n.start();
        lock = true;
    }
};
