(function () {
    const trackingCookie = getTrackingCookie();
    if (trackingCookie === undefined || trackingCookie === "false") {
        document.cookie = "tracking=false; max-age=378432000; path=/";
        showBanner(true);
        let enableTrackingBtn = document.getElementById("enableTracking");
        let disableTrackingBtn = document.getElementById("disableTracking");

        enableTrackingBtn.onclick = function () { document.cookie = "tracking=true; max-age=378432000; path=/"; showBanner(false); };
        disableTrackingBtn.onclick = function () { window.location = "https://google.com/"; };
    } else if (trackingCookie === "true") {
        showBanner(false);
    }
    enableAnalytics();
})();
function showBanner(enabled) {
    document.querySelector(".modal").style.display = enabled ? "block" : "none";
}
function getTrackingCookie() {
    let cookieArray = document.cookie.split(";");
    const trackingCookie = cookieArray.find(c => c.trim().startsWith("tracking="));
    if (trackingCookie === undefined) {
        return undefined;
    }
    return trackingCookie.split("=")[1];
}
function enableAnalytics() {
    fetch('https://pi.licua.de/page-impression', {
        method: 'POST'
    }).then(res => { }).catch(error => { });

    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    ga('create', '{{ site.google_analytics }}', 'auto');
    ga('send', 'pageview');
}