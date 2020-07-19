import $ from "jquery";
import ranColor from "../tools/ranColor";
import { getRandom } from "../tools/ranColor";
var divContainer = $("#divContainer");
var divCenter = $("#divCenter");
export default function (n, isPrime) {
    var span = $("<span>").text(n);
    if (isPrime) {
        var color = ranColor();
        span.css("color", color);
        createCenterPrimeNumber(n, color);
    }
    divContainer.append(span);
    divCenter.text(n);
}
function createCenterPrimeNumber(n, color) {
    var div = $("<div>").addClass("center").css("color", color).text(n);
    $("body").append(div);
    getComputedStyle(div[0]).left;
    div.css(
        "transform",
        `translate(${getRandom(-200, 200)}px,${getRandom(-200, 200)}px)`
    ).css("opacity", 0);
}
