function getTrackingCookie() {
  let cookieArray = document.cookie.split(";");
  const trackingCookie = cookieArray.find((c) =>
    c.trim().startsWith("tracking=")
  );
  if (trackingCookie === undefined) {
    return undefined;
  }
  return trackingCookie.split("=")[1];
}
function enableAnalytics() {
  document.cookie = "tracking=true; max-age=378432000; path=/";

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());

  gtag("config", "UA-80928743-3");

  const trackingScript = document.createElement("script");
  trackingScript.src = "https://tracking.philenius.de/public/aurora.js";
  trackingScript.setAttribute("async", "");
  trackingScript.setAttribute("defer", "");
  trackingScript.setAttribute("aurora-id", "cdb0c7992879af3eda024496de64f18b");
  document.getElementsByTagName("body")[0].appendChild(trackingScript);
}
document.addEventListener("DOMContentLoaded", () => {
  new SimpleLightbox("a.img", {
    captionsData: "alt",
    captionPosition: "outside",
  });

  hljs.highlightAll();

  const shareButtons = document.querySelectorAll("[data-share]");
  const newsletterForms = document.querySelectorAll("[data-newsletter]");
  const cookieBanner = document.querySelector("[data-cookie-banner]");
  const acceptBtn = document.querySelector("[data-cookie-accept]");
  const rejectBtn = document.querySelector("[data-cookie-reject]");

  if (cookieBanner) {
    const consent = getTrackingCookie();
    if (!consent) {
      cookieBanner.hidden = false;
    }
    acceptBtn?.addEventListener("click", () => {
      enableAnalytics();
      cookieBanner.hidden = true;
    });
    rejectBtn?.addEventListener("click", () => {
      document.cookie = "tracking=false; max-age=86400; path=/";
      cookieBanner.hidden = true;
    });
  }

  shareButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const shareData = {
        title: button.dataset.shareTitle || document.title,
        text:
          button.dataset.shareText ||
          document.querySelector(".hero__subtitle")?.textContent?.trim() ||
          "",
        url: button.dataset.shareUrl || window.location.href,
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
          flashShareState(button, "Shared!");
        } catch (err) {
          if (err?.name !== "AbortError") {
            console.warn("Share canceled", err);
          }
        }
      } else {
        navigator.clipboard
          .writeText(shareData.url)
          .then(() => flashShareState(button, "Link copied"))
          .catch(() => alert("Could not copy link"));
      }
    });
  });

  newsletterForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const emailField = form.querySelector("input[type='email']");
      const email = emailField?.value?.trim() || "there";
      form.reset();
      raiseToast(`Thanks, ${email}! You'll get the next edition.`);

      if (form.action && window.fetch) {
        const formData = new FormData(form);
        fetch(form.action, {
          method: form.method || "POST",
          body: formData,
        }).catch((err) => console.warn("Newsletter endpoint unreachable", err));
      }
    });
  });
});

function raiseToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("toast--visible"));
  setTimeout(() => toast.classList.remove("toast--visible"), 2200);
  setTimeout(() => toast.remove(), 2600);
}

function flashShareState(button, tempText) {
  const original = button.textContent;
  button.textContent = tempText;
  button.disabled = true;
  setTimeout(() => {
    button.textContent = original;
    button.disabled = false;
  }, 1800);
}
