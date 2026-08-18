import React from "react";
import pages from "../pages.json";

export default function Signup() {
  const html = pages["signup.html"]?.body || '<section class="page-shell"><h1>Signup</h1><p>Signup page.</p></section>';
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
