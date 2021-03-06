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

    new SimpleLightbox('a.img', {});
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

    fetch('https://pi.licua.de/page-impression', {
        method: 'POST'
    }).then(_ => { }).catch(_ => { });

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'UA-80928743-3');
}