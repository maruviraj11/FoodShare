import React from "react";
import pages from "../pages.json";

export default function About() {
  const html = pages["about.html"]?.body || '<section class="page-shell"><h1>About</h1><p>About page.</p></section>';
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}