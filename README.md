## react-pdf-highlighter

`react-pdf-highlighter` provides annotation experience for PDF documents on web
built on top of PDF.js. Text and rectangular highlights are supported. Highlight
data format is independent of the viewport, making it suitable for saving on the
server.

### Demo

http://agentcooper.github.io/react-pdf-highlighter/

### Installation

<!-- `npm install react-pdf-highlighter` -->

### Example

See
[`demo/src/App.js`](https://github.com/digitalscientists/react-pdf-highlighter/blob/master/demo/src/App.js)
for React component API example.

### Customizations

| Name           | Default | Description                                                                                                  |
| -------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| highlightIndex | none    | Pass to Highlight & AreaHighlight. Required if you want to see the annotation index next to each annotation. |
| highlightColor | blue    | Pass to Highlight & AreaHighlight. Color of the annotation background highlight.                             |
| pdfScale       | 'auto'  | Pass to Pdfhighlighter. Updated in component on prop change.                                                 |

### CSS Customizations

| Style to change       | CSS Class                    | Description                                                              |
| --------------------- | ---------------------------- | ------------------------------------------------------------------------ |
| Pdfhighlighter        | .Pdfhighlighter              | To change space above PDF and background color of the viewer.            |
| Page                  | .page                        | To change box shadow, space between pages.                               |
| Annotation Index      | .Highlight\_\_text-container | To change position, height, width, border of annotation index container. |
| Annotation Index Text | .Highlight\_\_text-node      | To change color of text                                                  |

### Prior art

[`react-pdf`](https://github.com/wojtekmaj/react-pdf) and
[`react-pdfjs`](https://github.com/erikras/react-pdfjs) only provide React
wrappers for PDF.js and do not have built-in annotation functionality.

[`pdfjs-annotate`](https://github.com/instructure/pdf-annotate.js/) does not
provide text highlights out of the box.

PDF.js provides only viewer:

> [PDF.js is mainly written for reading PDF files, not editing them. Because of that we don't yet support adding any kind of annotations. We do however support rendering a number of annotation types for viewing.](https://github.com/mozilla/pdf.js/wiki/Frequently-Asked-Questions#is-it-possible-to-add-annotations-to-a-pdf)

See also:

* https://github.com/mozilla/pdf.js
* https://github.com/wojtekmaj/react-pdf
* https://github.com/erikras/react-pdfjs
* https://github.com/instructure/pdf-annotate.js/
* https://blogs.dropbox.com/tech/2016/11/annotations-on-document-previews/

### Compatibility

Works in Google Chrome, Safari 10+, Firefox 52+. Not tested in Internet
Explorer.
