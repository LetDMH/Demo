var btn = document.getElementsByTagName("button")[0];
var inpText = document.getElementsByClassName("input-text")[0];
var content = document.getElementsByClassName("content")[0];
btn.onclick = function () {
    if (inpText.value) {
        console.log(inpText.value)
        renderDom("mine", inpText.value);
        inpText.value = "";
        ajax({
            type: "GET",
            url: "http://localhost:3000/chat",
            data: {
                text: inpText.value
            },
            success: function (res) {
                renderDom("robot", res.text);
            },
        });
    }
};
inpText.onkeyup = function (e) {
    if (e.key == "Enter") {
        btn.onclick();
    }
};
function renderDom(who, text) {
    var oDiv = document.createElement("div");
    oDiv.className = who;
    oDiv.innerHTML = `<img src="${
        who == "robot" ? "/images/zyl.jpg" : "/images/mine.jpg"
    }"></img>
                      <div class="text"> ${text}</div>`;
    content.appendChild(oDiv);
    content.scrollTop = content.scrollHeight;
}
