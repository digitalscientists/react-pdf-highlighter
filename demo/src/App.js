import React, { Component } from "react";

import URLSearchParams from "url-search-params";

import {
  PdfLoader,
  PdfAnnotator,
  Tip,
  Highlight,
  Popup,
  AreaHighlight
} from "../../src";

import testHighlights from "./test-highlights";

import Spinner from "./Spinner";
import Sidebar from "./Sidebar";

import type { T_Highlight, T_NewHighlight } from "../../src/types";

import "./style/App.css";

type T_ManuscriptHighlight = T_Highlight;

type Props = {};

type State = {
  highlights: Array<T_ManuscriptHighlight>
};

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () => location.hash.slice("#highlight-".length);

const resetHash = () => {
  location.hash = "";
};

const HighlightPopup = ({ comment }) =>
  comment.text ? (
    <div className="Highlight__popup">
      {comment.emoji} {comment.text}
    </div>
  ) : null;

const DEFAULT_URL = "https://arxiv.org/pdf/1708.08021.pdf";

const searchParams = new URLSearchParams(location.search);
const url = searchParams.get("url") || DEFAULT_URL;

class App extends Component<Props, State> {
  state = {
    highlights: testHighlights[url] ? [...testHighlights[url]] : [],
    pdfScale: 1
  };

  state: State;

  resetHighlights = () => {
    this.setState({
      highlights: []
    });
  };

  scrollViewerTo = (highlight: any) => {};

  scrollToHighlightFromHash = () => {
    const highlight = this.getHighlightById(parseIdFromHash());

    if (highlight) {
      this.scrollViewerTo(highlight);
    }
  };

  componentDidMount() {
    window.addEventListener(
      "hashchange",
      this.scrollToHighlightFromHash,
      false
    );
  }

  getHighlightById(id: string) {
    const { highlights } = this.state;

    return highlights.find(highlight => highlight.id === id);
  }

  addHighlight(highlight: T_NewHighlight) {
    const { highlights } = this.state;

    console.log("Saving highlight", highlight);

    this.setState({
      highlights: [...highlights, { ...highlight, id: getNextId() }]
    });
  }

  updateHighlight(highlightId: string, position: Object, content: Object) {
    this.setState({
      highlights: this.state.highlights.map(h => {
        return h.id === highlightId
          ? {
              ...h,
              position: { ...h.position, ...position },
              content: { ...h.content, ...content }
            }
          : h;
      })
    });
  }

  getIndex(highlights: Array<Object>, highlight: Object) {
    var index;
    highlights.forEach((h, i) => {
      if (highlight.id === h.id) {
        index = i;
      }
    });

    // console.log("highlight", highlight);
    // console.log("index", index);
    return index;
  }

  zoomIn() {
    if (this.state.pdfScale < 2) {
      this.setState({
        pdfScale: this.state.pdfScale + 0.1
      });
    } else {
      return;
    }
  }

  zoomOut() {
    if (this.state.pdfScale > 0) {
      this.setState({
        pdfScale: this.state.pdfScale - 0.1
      });
    } else {
      return;
    }
  }

  render() {
    const { highlights } = this.state;

    return (
      <div className="App" style={{ display: "flex", height: "100vh" }}>
        <div className="pdf-toolbar">
          <p style={{ color: "black", padding: 10 }}>Zoom</p>
          <button
            style={{
              margin: 5,
              borderWidth: 1,
              borderColor: "#cccccc",
              paddingHorizontal: 10,
              fontSize: 16,
              outline: "none"
            }}
            onClick={() => this.zoomIn()}
          >
            +
          </button>
          <button
            style={{
              margin: 5,
              borderWidth: 1,
              borderColor: "#cccccc",
              paddingHorizontal: 10,
              fontSize: 16,
              outline: "none"
            }}
            onClick={() => this.zoomOut()}
          >
            -
          </button>
        </div>
        <div
          style={{
            height: "100vh",
            width: "75vw",
            // overflowY: "scroll",
            position: "relative",
            paddingTop: 50
          }}
        >
          <PdfLoader url={url} beforeLoad={<Spinner />}>
            {pdfDocument => (
              <PdfAnnotator
                pdfScale={this.state.pdfScale}
                pdfDocument={pdfDocument}
                enableAreaSelection={event => event.altKey}
                onScrollChange={resetHash}
                scrollRef={scrollTo => {
                  this.scrollViewerTo = scrollTo;

                  this.scrollToHighlightFromHash();
                }}
                url={url}
                onSelectionFinished={(
                  position,
                  content,
                  hideTipAndSelection,
                  transformSelection
                ) => (
                  <Tip
                    addText={"Add comment"}
                    onOpen={transformSelection}
                    onConfirm={comment => {
                      this.addHighlight({ content, position, comment });

                      hideTipAndSelection();
                    }}
                  />
                )}
                highlightTransform={(
                  highlight,
                  index,
                  setTip,
                  hideTip,
                  viewportToScaled,
                  screenshot,
                  isScrolledTo
                ) => {
                  const isTextHighlight = !Boolean(
                    highlight.content && highlight.content.image
                  );

                  const component = isTextHighlight ? (
                    <Highlight
                      isScrolledTo={isScrolledTo}
                      position={highlight.position}
                      comment={highlight.comment}
                      highlightColor={"blue"}
                      highlightIndex={this.getIndex(highlights, highlight)}
                    />
                  ) : (
                    <AreaHighlight
                      highlight={highlight}
                      highlightIndex={this.getIndex(highlights, highlight)}
                      highlightColor={"blue"}
                      onChange={boundingRect => {
                        this.updateHighlight(
                          highlight.id,
                          { boundingRect: viewportToScaled(boundingRect) },
                          { image: screenshot(boundingRect) }
                        );
                      }}
                    />
                  );

                  return (
                    <Popup
                      popupContent={<HighlightPopup {...highlight} />}
                      onMouseOver={popupContent =>
                        setTip(highlight, highlight => popupContent)
                      }
                      onMouseOut={hideTip}
                      key={index}
                      children={component}
                    />
                  );
                }}
                highlights={highlights}
              />
            )}
          </PdfLoader>
        </div>
        <Sidebar
          highlights={highlights}
          resetHighlights={this.resetHighlights}
        />
      </div>
    );
  }
}

export default App;
