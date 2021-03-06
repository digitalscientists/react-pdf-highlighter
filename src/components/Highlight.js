import React, { Component } from "react";

import "../style/Highlight.css";

import type { T_LTWH } from "../types.js";

type Props = {
  position: {
    boundingRect: T_LTWH,
    rects: Array<T_LTWH>
  },
  onClick?: () => void,
  onMouseOver?: () => void,
  onMouseOut?: () => void,
  comment: {
    emoji: string,
    text: string
  },
  isScrolledTo: boolean
};

class Highlight extends Component<Props> {
  render() {
    const {
      position,
      onClick,
      onMouseOver,
      onMouseOut,
      comment,
      isScrolledTo,
      highlightIndex,
      highlightColor
    } = this.props;

    const { rects, boundingRect } = position;

    return (
      <div
        className={`Highlight ${isScrolledTo ? "Highlight--scrolledTo" : ""}`}
      >
        {comment ? (
          <div
            className="Highlight__emoji"
            style={{
              left: 20,
              top: boundingRect.top
            }}
          >
            {comment.emoji}
          </div>
        ) : null}
        <div className="Highlight__parts">
          {rects.map((rect, index) => (
            <div className="Highlight__part-container" style={rect} key={index}>
              {highlightIndex !== null &&
                highlightIndex !== undefined &&
                index == 0 && (
                  <div
                    className={"Highlight__text-container"}
                    key={highlightIndex}
                  >
                    <p className={"Highlight__text-node"}>
                      {(highlightIndex + 1).toString()}
                    </p>
                  </div>
                )}
              <div
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                onClick={onClick}
                style={{
                  ...rect,
                  ...{
                    background: highlightColor
                      ? highlightColor
                      : "rgba(255, 226, 143, 1)"
                  }
                }}
                className={`Highlight__part`}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Highlight;
