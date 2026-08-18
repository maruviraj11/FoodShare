import React from "react";
import pages from "../pages.json";

export default function Home() {
  const html = pages["index.html"]?.body || '<section class="page-shell"><h1>Home</h1><p>Home page.</p></section>';
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
