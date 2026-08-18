import React from "react";
import pages from "../pages.json";

export default function Contact() {
  const html = pages["contact.html"]?.body || '<section class="page-shell"><h1>Contact</h1><p>Contact page.</p></section>';
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
