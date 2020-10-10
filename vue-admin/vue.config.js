"use strict";
const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    publicPath: "/",
    outputDir: "dist",
    assetsDir: "static",
    productionSourceMap: false,
    devServer: {
        port: 12306,
        open: true,
        overlay: {
            warnings: false,
            errors: true,
        },
    //     proxy: {  
    //         '/api': {
    //           target: 'http://localhost:12306', //路径指向本地主机地址及端口号
    //           ws: true, 
    //           changeOrigin: true,
    //           pathRewrite:{
    //               '^/api': '/mock' //路径转发代理
    //           }
    //         }
    },
    configureWebpack: {
        resolve: {
            alias: {
                "@": resolve("src"),
            },
        },
    },
    chainWebpack(config) {
        config.plugin("preload").tap(() => [
            {
                rel: "preload",
                fileBlacklist: [
                    /\.map$/,
                    /hot-update\.js$/,
                    /runtime\..*\.js$/,
                ],
                include: "initial",
            },
        ]);
        config.plugins.delete("prefetch");
        config.module
            .rule("svg")
            .exclude.add(resolve("src/icons"))
            .end();
        config.module
            .rule("icons")
            .test(/\.svg$/)
            .include.add(resolve("src/icons"))
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]",
            })
            .end();
    },
};
