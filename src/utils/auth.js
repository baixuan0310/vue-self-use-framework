import { getCookie, setCookie, deleteCookie } from "./utils";
export function getToken() {
    return getCookie('token');
}
export function setToken(token) {
    return setCookie('token', token, 30);
}
export function removeToken() {
    return deleteCookie('token');
}
