function getCookie () {
    let value = '';
    document.cookie.split('; ').forEach((val, key) => {
        let item = val.split('=');
        if (item[0] === 'token') {
            value = item[1];
        }
    });
    return value;
};
function setCookie (obj) {
    document.cookie = obj.token + '=' + obj.val;
};
function delCookie (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie();
    if (cval !== null) {
        document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
    }
}
export {getCookie, setCookie, delCookie};
