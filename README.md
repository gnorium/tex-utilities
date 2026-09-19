# TeXUtilities

TeX formula rendering for Gnorium, alongside XMLUtilities and MarkdownUtilities.
This package handles TeX mathematical notation, not numerical computation or full
LaTeX document compilation. It has no TEI, record, or application dependencies.

`TeXRenderer.placeholder(source, displayMode: false)` returns an escaped HTML
fragment with the original notation visible. Load `Browser/tex.js` and call
`render(root)` to typeset explicit `.tex-formula[data-tex-display]` elements with
locally served KaTeX. `renderToString(source, displayMode)` also exposes the same
renderer to JavaScript callers. Formulas are passed without dollar delimiters;
the package never searches ordinary prose for mathematical notation.

Copy the complete `Browser` directory to the application's public assets,
preserving relative paths. Styles and fonts load only when a formula is present.
Invalid notation or failed assets leave the source readable. HTML and MathML are
emitted together; URL/HTML commands are untrusted, expansion and sizes are bounded,
and macro definitions are scoped to one formula. Original source documents are
never rewritten.

In Gnorium, XMLUtilities extracts TEI formulas, WebComponents' TeXView emits the
placeholder, and the application's loader calls the browser renderer for both
initial and lazily inserted content. `make tex-assets` copies this package's
browser files into `gnorium-web/Public/tex-utilities`.

Run `swift test` for the Swift adapter and `npm test` for the actual TeX renderer.
The latter requires only Node, with no install step. Vendored KaTeX's original
license and verified archive provenance are under `Browser/vendor/katex-0.18.7`.
