import React, { Component } from "react";

// $FlowFixMe
import Rnd from "react-rnd";

import "../style/AreaHighlight.css";

import type { T_ViewportHighlight, T_LTWH } from "../types";

type Props = {
  highlight: T_ViewportHighlight,
  onChange: (rect: T_LTWH) => void
};

class AreaHighlight extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      x: props.highlight.position.boundingRect.left,
      y: props.highlight.position.boundingRect.top,
      width: props.highlight.position.boundingRect.width,
      height: props.highlight.position.boundingRect.height,
      showIndex: true
    };
  }

  render() {
    const {
      highlight,
      onChange,
      highlightIndex,
      highlightColor,
      ...otherProps
    } = this.props;

    return (
      <div className={"AreaHighlight-container"}>
        {this.state.showIndex && (
          <div
            className={"Highlight__text-container"}
            style={{
              position: "absolute",
              transform: `translate(${this.state.x}px, ${this.state.y}px)`
            }}
          >
            {highlightIndex !== null &&
              highlightIndex !== undefined && (
                <p className={"Highlight__text-node"}>
                  {(highlightIndex + 1).toString()}
                </p>
              )}
          </div>
        )}
        <Rnd
          className="AreaHighlight"
          style={{
            backgroundColor: highlightColor
              ? highlightColor
              : "rgba(252, 232, 151, 1)"
          }}
          onDragStart={() => {
            this.setState({
              showIndex: false
            });
          }}
          onDragStop={(_, data) => {
            const boundingRect = {
              ...highlight.position.boundingRect,
              top: data.y,
              left: data.x
            };
            this.setState({
              x: boundingRect.left,
              y: boundingRect.top,
              width: boundingRect.width,
              height: boundingRect.height,
              showIndex: true
            });

            onChange(boundingRect);
          }}
          onResizeStart={() => {
            this.setState({
              showIndex: false
            });
          }}
          onResizeStop={(_, direction, ref, delta, position) => {
            const boundingRect = {
              top: position.y,
              left: position.x,
              width: ref.offsetWidth,
              height: ref.offsetHeight
            };

            this.setState({
              x: boundingRect.left,
              y: boundingRect.top,
              width: boundingRect.width,
              height: boundingRect.height,
              showIndex: true
            });

            onChange(boundingRect);
          }}
          default={{
            x: highlight.position.boundingRect.left,
            y: highlight.position.boundingRect.top,
            width: highlight.position.boundingRect.width,
            height: highlight.position.boundingRect.height
          }}
          onClick={event => {
            event.stopPropagation();
            event.preventDefault();
          }}
          {...otherProps}
        />
      </div>
    );
  }
}

export default AreaHighlight;
