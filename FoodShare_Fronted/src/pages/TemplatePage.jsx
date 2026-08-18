import { useEffect, useRef } from "react";
import pages from "../pages.json";

const pagePathMap = {
  "index.html": "/",
  "about.html": "/about",
  "contact.html": "/contact",
  "login.html": "/login",
  "signup.html": "/signup",
  "donor-dashboard.html": "/donor-dashboard",
  "ngo-dashboard.html": "/ngo-dashboard",
  "volunteer-dashboard.html": "/volunteer-dashboard",
  "admin-dashboard.html": "/admin-dashboard",
  "admin-login.html": "/admin-login",
  "admin-signup.html": "/admin-signup",
  "forgot-password.html": "/forgot-password",
  "reset-password.html": "/reset-password",
  "volunteer-login.html": "/volunteer-login",
  "volunteer-signup.html": "/volunteer-signup",
};

function normalizeLegacyLink(href) {
  if (!href) return href;
  const [path, hash = ""] = href.split("#");
  const key = path.replace(/^\/+/, "");
  const target = pagePathMap[key] || href;
  return hash ? `${target}#${hash}` : target;
}

export default function TemplatePage({ pageKey }) {
  const wrapperRef = useRef(null);
  const config = pages[pageKey];
  const html = config?.body || `<section class="page-shell"><h1>${pageKey}</h1><p>Page content is unavailable.</p></section>`;

  useEffect(() => {
    if (!config) {
      document.title = "FoodShare";
      return;
    }

    document.title = config.title || "FoodShare";
    document.documentElement.lang = "en";

    const scriptElements = [];
    let cancelled = false;

    const runScripts = async () => {
      for (const script of config.scripts || []) {
        if (cancelled) return;
        try {
          if (script.src) {
            const el = document.createElement("script");
            el.src = script.src;
            el.async = false;
            document.body.appendChild(el);
            scriptElements.push(el);
            await new Promise((resolve, reject) => {
              el.onload = resolve;
              el.onerror = reject;
            });
          } else if (script.inline) {
            window.eval(script.inline);
          }
        } catch (err) {
          console.error("FoodShare page script error:", err);
        }
      }
      if (!cancelled) {
        document.dispatchEvent(new Event("DOMContentLoaded"));
      }
    };

    runScripts();

    if (wrapperRef.current) {
      const anchors = wrapperRef.current.querySelectorAll("a[href]");
      anchors.forEach((link) => {
        const normalized = normalizeLegacyLink(link.getAttribute("href"));
        if (normalized !== link.getAttribute("href")) {
          link.setAttribute("href", normalized);
        }
      });
    }

    return () => {
      cancelled = true;
      scriptElements.forEach((el) => el.remove());
    };
  }, [config]);

  return <div ref={wrapperRef} dangerouslySetInnerHTML={{ __html: html }} />;
}
