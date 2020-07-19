const axios = require("axios");
const cheerio = require("cheerio");
const { get } = require("http");

async function getHtml() {
    const resp = await axios.get("https://movie.douban.com/chart");
    return resp.data;
}

async function getHtmlData() {
    const result = await getHtml();
    const $ = cheerio.load(result);
    const content = $("tr.item");
    const movies = [];
    for (let i = 0; i < content.length; i++) {
        const tr = content[i];
        const returnInfo = parseData($(tr));
        movies.push(returnInfo);
    }
    return movies
}

function parseData(tr) {
    var name = tr.find(".pl2 a").text();
    name = name.replace(/\s/g, "");
    name = name.split("/")[0];
    const releaseInfo = tr.find(".pl2 .pl").text();
    const img = tr.find("a.nbg img").attr("src");
    return {
        name: name,
        releaseInfo: releaseInfo,
        img: img,
    };
}

module.exports = getHtmlData;