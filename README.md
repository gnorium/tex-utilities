# TeXUtilities, as used in [gnorium.com](https://gnorium.com)

TeX formula rendering with a Swift HTML placeholder and a locally served KaTeX browser renderer. It handles mathematical notation, not numerical computation or full LaTeX document compilation.

## Overview

`TeXRenderer.placeholder(_:displayMode:)` returns an escaped HTML fragment that keeps the original notation readable before typesetting. Load `Browser/tex.js` and call `render(root)` to typeset explicit `.tex-formula[data-tex-display]` elements. Formulas are passed without dollar delimiters; the package does not search prose for mathematical notation.

The browser renderer emits HTML and MathML together. Invalid notation or failed assets leave the source readable. URL and HTML commands are untrusted, expansion and sizes are bounded, and macro definitions are scoped to one formula. Source documents are never rewritten.

## Features

- A Swift placeholder for inline and display formulas
- Local KaTeX assets loaded only when a formula is present
- A JavaScript `renderToString(source, displayMode)` entry point
- No TEI, record, or application dependencies

## Installation

### Swift Package Manager

```swift
dependencies: [
    .package(url: "https://github.com/gnorium/tex-utilities", branch: "main")
]
```

Add `.product(name: "TeXUtilities", package: "tex-utilities")` to the target that emits formula placeholders. Copy the complete `Browser` directory to the application's public assets, preserving its relative paths.

## Usage

```swift
import TeXUtilities

let html = TeXRenderer.placeholder(source: #"x^2 + y^2 = z^2"#, displayMode: true)
```

Include `Browser/tex.js` in the page and call `render(root)` after the formula elements are inserted. In Gnorium, XMLUtilities extracts TEI formulas, WebComponents' TeXView emits the placeholder, and `make tex-assets` copies the browser files into `gnorium-web/Public/tex-utilities`.

## Running tests

Run `swift test` for the Swift adapter and `npm test` for the browser renderer. The latter requires Node but no install step.

## Requirements

- macOS 14 or later and Swift 6.2 or later for the Swift package
- A browser for the KaTeX renderer

## License

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE). Vendored KaTeX's license and verified archive provenance are under `Browser/vendor/katex-0.18.7`.

## Related Packages

- [admin-core](https://github.com/gnorium/admin-core) - Core admin functionalities for web applications
- [artifact-core](https://github.com/gnorium/artifact-core) - IIIF Presentation API v3 types + deep zoom viewer
- [design-tokens](https://github.com/gnorium/design-tokens) - Universal design tokens based on Apple HIG
- [diff-engine](https://github.com/gnorium/diff-engine) - Platform-agnostic character-level diff engine
- [embedded-swift-utilities](https://github.com/gnorium/embedded-swift-utilities) - Utility functions for Embedded Swift environments
- [markdown-utilities](https://github.com/gnorium/markdown-utilities) - Markdown rendering with extended syntax
- [web-apis](https://github.com/gnorium/web-apis) - Web API implementations for Swift WebAssembly
- [web-builders](https://github.com/gnorium/web-builders) - HTML, CSS, JS, and SVG DSL builders
- [web-components](https://github.com/gnorium/web-components) - Reusable UI components for web applications
- [web-formats](https://github.com/gnorium/web-formats) - Structured data format builders
- [web-security](https://github.com/gnorium/web-security) - Portable security utilities for web applications
- [web-tests](https://github.com/gnorium/web-tests) - Swift browser testing across Chrome and Safari
- [web-types](https://github.com/gnorium/web-types) - Shared web types for web applications
- [xml-utilities](https://github.com/gnorium/xml-utilities) - XML and TEI rendering utilities
