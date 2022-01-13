(function () {
    const trackingCookie = getTrackingCookie();
    if (trackingCookie === 'true') {
        showBanner(false);
        enableAnalytics();
    } else if (trackingCookie === undefined) {
        showBanner(true);
        let enableTrackingBtn = document.getElementById('enableTracking');
        let disableTrackingBtn = document.getElementById('disableTracking');
        enableTrackingBtn.onclick = () => { enableAnalytics(); };
        disableTrackingBtn.onclick = () => { showBanner(false); document.cookie = 'tracking=false; max-age=86400; path=/'; };
    }

    new SimpleLightbox('a.img', { captionsData: 'alt', captionPosition: 'outside' });
})();
function showBanner(enabled) {
    document.querySelector('.modal').style.display = enabled ? 'block' : 'none';
}
function getTrackingCookie() {
    let cookieArray = document.cookie.split(';');
    const trackingCookie = cookieArray.find(c => c.trim().startsWith('tracking='));
    if (trackingCookie === undefined) {
        return undefined;
    }
    return trackingCookie.split('=')[1];
}
function enableAnalytics() {
    document.cookie = 'tracking=true; max-age=378432000; path=/';
    showBanner(false);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'UA-80928743-3');

    const trackingScript = document.createElement("script");
    trackingScript.src = "https://tracking.philenius.de/public/aurora.js";
    trackingScript.setAttribute("async", "");
    trackingScript.setAttribute("defer", "");
    trackingScript.setAttribute("aurora-id", "cdb0c7992879af3eda024496de64f18b");
    document.getElementsByTagName("body")[0].appendChild(trackingScript);
}