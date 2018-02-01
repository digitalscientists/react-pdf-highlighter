import React from "react";

import type { T_Highlight } from "../../src/types";
type T_ManuscriptHighlight = T_Highlight;

type Props = {
  highlights: Array<T_ManuscriptHighlight>,
  resetHighlights: () => void
};

const updateHash = highlight => {
  window.location.hash = `highlight-${highlight.id}`;
};

function Sidebar({ highlights, resetHighlights }: Props) {
  return (
    <div className="sidebar" style={{ width: "30vw" }}>
      <div className="sidebar-description">
        <p style={{ fontSize: "0.7rem" }}>
          <a href="https://github.com/digitalscientists/react-pdf-annotator">
            Open in GitHub
          </a>
        </p>
        <p className="sidebar-instructions">
          <small>
            To create area highlight hold ⌥ Option key (Alt), then click and
            drag.
          </small>
        </p>
      </div>

      <ul className="sidebar__highlights">
        {highlights.map((highlight, index) => (
          <li
            key={index}
            className="sidebar__highlight"
            onClick={() => {
              updateHash(highlight);
            }}
          >
            <div className="sidebar-highlight-inner-content-container">
              <h1>{index + 1}</h1>
              <div>
                <p>{highlight.comment.text}</p>
                {/* {highlight.content.text ? (
                  <blockquote style={{ marginTop: "0.5rem" }}>
                    {`${highlight.content.text.slice(0, 90).trim()}…`}
                  </blockquote>
                ) : null} */}
                {highlight.content.image ? (
                  <div
                    className="highlight__image"
                    style={{ marginTop: "0.5rem" }}
                  >
                    <img src={highlight.content.image} alt={"Screenshot"} />
                  </div>
                ) : null}
              </div>
              <div className="highlight__location">
                Page {highlight.position.pageNumber}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {highlights.length > 0 ? (
        <div style={{ padding: "1rem" }}>
          <a href="#" onClick={resetHighlights}>
            Reset highlights
          </a>
        </div>
      ) : null}
    </div>
  );
}

export default Sidebar;
