/*www.fucking-ie.com*/
fckIE = {
    text: {
        line1: "THIS WEBSITE",
        line2: "IS TOO GOOD",
        line3: "IS TOO GOOD"
    },
    color: {
        bg: "222",
        line1: "eee",
        line2: "faa732",
        line3: "eee",
        download: "666",
        links: "faa732"
    },
    font: {
        text: 60,
        download: 14
    },
    browser: {
        chrome: true,
        firefox: true,
        opera: false
    },
    link: {
        chrome: "http://www.google.fr/intl/com/chrome/browser/",
        firefox: "http://www.mozilla.org/en-US/firefox/new/",
        opera: "http://www.opera.com/computer/"
    },
    target: {
        version: 9
    },
    body: document.getElementsByTagName("body")[0],
    init: function() {
        var e = -1;
        if (navigator.appName == "Microsoft Internet Explorer") {
            var t = navigator.userAgent;
            var n = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
            if (n.exec(t) != null) e = parseFloat(RegExp.$1)
        }
        if (e > fckIE.target.version || e == -1) {
            return false
        }
        var r = '<div style="font-size:' + fckIE.font.text + "px; line-height:" + fckIE.font.text + 'px;"><span style="color:#' + fckIE.color.line1 + '">' + fckIE.text.line1 + '</span><br/><span style="color:#' + fckIE.color.line2 + '">' + fckIE.text.line2 + '</span><br/><span style="color:#' + fckIE.color.line3 + '">' + fckIE.text.line3 + "</span></div>",
            i;
        if (fckIE.browser.chrome || fckIE.browser.firefox || fckIE.browser.opera) {
            i = "Download ";
            if (fckIE.browser.chrome) {
                i = i + '<a style="color:#' + fckIE.color.links + '" href="' + fckIE.link.chrome + '">Chrome</a>'
            }
            if (fckIE.browser.firefox) {
                if (fckIE.browser.chrome) {
                    i = fckIE.browser.opera ? i + ", " : i + " or "
                }
                i = i + '<a style="color:#' + fckIE.color.links + '" href="' + fckIE.link.firefox + '">Firefox</a> '
            }
            if (fckIE.browser.opera) {
                if (fckIE.browser.chrome || fckIE.browser.firefox) {
                    i = i + " or "
                }
                i = i + '<a style="color:#' + fckIE.color.links + '" href="' + fckIE.link.opera + '">Opera</a> '
            }
        } else {
            i = ""
        }
        var s = '<p style="font-size:' + fckIE.font.download + "px; line-height:" + fckIE.font.download + "px; color:#" + fckIE.color.download + '">' + i + "</p>";
        fckIE.body.style.cssText = "background:#" + fckIE.color.bg;
        fckIE.body.innerHTML = '<div style="text-align:center; width:70%; margin-left:15%; margin-top:10%; font-family:Helvetica, Arial; font-weight:300">' + r + s + "</div>"
    }
};
if (window.addEventListener) window.addEventListener("load", fckIE.init(), false);
else if (window.attachEvent) window.attachEvent("onload", fckIE.init());
else window.onload = fckIE.init()