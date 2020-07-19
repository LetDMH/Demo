var getData = require("./getData");
var fs = require("fs");
getData().then((movies) => {
    fs.writeFile("movies.json", JSON.stringify(movies), function () {
        console.log("爬取成功！");
    });
});
