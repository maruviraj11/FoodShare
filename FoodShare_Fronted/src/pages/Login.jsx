import React from "react";
import pages from "../pages.json";

export default function Login() {
  const html = pages["login.html"]?.body || '<section class="page-shell"><h1>Login</h1><p>Login page.</p></section>';
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
