import React from "react";
import { Link } from "react-router-dom";
import { pageRegistry } from "./pageRegistry";

export default function AllPages() {
  return (
    <section className="all-pages-page">
      <h1>FoodShare — All Pages</h1>
      <p>Open any FoodShare page:</p>
      <div className="all-pages-grid">
        {pageRegistry.map(({ name, path }) => (
          <Link className="all-page-card" to={path} key={path}>
            <strong>{name}</strong>
            <span>{path}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
