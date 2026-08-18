import { useEffect } from "react";
import pages from "./pages.json";
import "./styles.css";

const routeAliases = {
  "/": "index.html",
  "/index.html": "index.html",
};

function pageFromPath() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (routeAliases[path]) return routeAliases[path];
  const name = path.split("/").pop();
  return pages[name] ? name : "index.html";
}

export default function App() {
  const page = pageFromPath();
  const config = pages[page];

  useEffect(() => {
    document.title = config.title || "FoodShare";
    document.documentElement.lang = "en";

    let cancelled = false;

    const runScripts = async () => {
      for (const script of config.scripts || []) {
        if (cancelled) return;
        try {
          if (script.src) {
            await new Promise((resolve, reject) => {
              const el = document.createElement("script");
              el.src = script.src;
              el.onload = resolve;
              el.onerror = reject;
              document.body.appendChild(el);
            });
          } else if (script.inline) {
            window.eval(script.inline);
          }
        } catch (err) {
          console.error("FoodShare script error:", err);
        }
      }
      if (!cancelled) {
        document.dispatchEvent(new Event("DOMContentLoaded"));
      }
    };

    runScripts();
    return () => { cancelled = true; };
  }, [page]);

  return <div dangerouslySetInnerHTML={{ __html: config.body }} />;   
}
