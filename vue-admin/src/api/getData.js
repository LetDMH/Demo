import $http from "./request";
export function login(data) {
    return $http({
        url: "/vue-admin/user/login",
        method: "post",
        data,
    });
}
export function getInfo(token) {
    return $http({
        url: "/vue-admin/user/info",
        method: "get",
        params: { token },
    });
}
export function logout(){
  return $http({
    url:'/vue-admin/user/logout',
    method:'post'
  })
}
