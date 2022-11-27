function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value) {
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
}

function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}

(function () {
    if (getCookie("userId") === undefined) {
        setCookie("userId", "user-id-" + Math.floor(Math.random() * 3));
    }
})();