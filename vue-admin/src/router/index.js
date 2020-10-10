import Vue from "vue";
import Router from "vue-router";
import home from "@/layout";
import defaultPage from "@/layout/components/mainContent";
Vue.use(Router);
const routes = [
    {
        path: "/login",
        component: () => import("@/layout/components/login"),
    },
    {
        path: "/home",
        alias:"/",
        component: home,
        children: [
            {
                path: "/home",
                component: defaultPage,
                meta: [],
            },
            {
                path: "/userList",
                component: () => import("@/components/userList"),
                meta: ["数据管理", "用户列表"],
            },
            {
                path: "/shopList",
                component: () => import("@/components/shopList"),
                meta: ["数据管理", "商家列表"],
            },
            {
                path: "/adminList",
                component: () => import("@/components/adminList"),
                meta: ["数据管理", "管理员列表"],
            },
            {
                path: "/visitor",
                component: () => import("@/layout/components/mainContent"),
                meta: ["图表", "用户分布"],
            },
            {
                path: "/newMember",
                component: () => import("@/components/editor"),
                meta: ["图表", "富文本编辑器"],
            },
            {
                path: "/adminSet",
                component: () => import("@/components/adminSet"),
                meta: ["设置", "管理员设置"],
            },
            {
                path: "/sendMessage",
                component: () => import("@/components/sendMessage"),
                meta: ["设置", "发送通知"],
            },
            {
                path: "/explain",
                component: () => import("@/components/explain"),
                meta: ["说明", "说明"],
            },
            {
                path: "/duty",
                component: () => import("@/components/duty"),
                meta: ["绩效管理", "工作职责"],
            },
            {
                path: "/performance",
                component: () => import("@/components/performance"),
                meta: ["绩效管理", "我的绩效"],
            },
            {
                path: "/assessment",
                component: () => import("@/components/assessment"),
                meta: ["绩效管理", "考核总览"],
            },
        ],
    },
];
const createRouter = ()=> new Router({
    routes,
    strict: process.env.NODE_ENV !== "production",
})
const router = createRouter()
export function resetRouter(){
    const newRouter = createRouter();
    router.matcher = newRouter.matcher
}
export default router;
