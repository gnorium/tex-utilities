# KaTeX 0.18.7

Locally served ESM renderer, stylesheet, and fonts from the official npm package.
The archive was verified against npm's SHA-512 integrity value before copying.
`provenance.json` records the archive URL, integrity value, and each copied file's
SHA-256. The original MIT license is in `LICENSE`.

TeXUtilities renders only explicitly tagged formula nodes. It always denies trust, with bounded
macro expansion and sizes, and a fresh macro scope for each formula. Parse or
asset failures leave the original notation readable. Raw XML is never rewritten.

To update, verify a new official release, copy its renderer/CSS/fonts/license into
a new version directory, regenerate the provenance file, and update both paths
in `Browser/tex.js`. Keep fonts beside the CSS. Run the formula rendering
tests and browser fixture before removing the old version.

Upstream: https://katex.org/docs/browser.html
Options: https://katex.org/docs/options.html
