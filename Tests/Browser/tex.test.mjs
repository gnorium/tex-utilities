import assert from "node:assert/strict";
import test from "node:test";
import { renderToString } from "../../Browser/tex.js";

test("fractions, roots, limits, and matrices retain structure in MathML", () => {
    const fraction = renderToString(String.raw`x_{a.b}=\frac{u+v}{w}`);
    assert.match(fraction, /<mfrac>/);
    assert.match(fraction, /<msub>/);
    assert.match(fraction, /encoding="application\/x-tex"/);
    const display = renderToString(String.raw`\sqrt{xy}+\sum_{i=\theta}^{\infty}z_i`, true);
    assert.match(display, /class="katex-display"/);
    assert.match(display, /<msqrt>/);
    assert.match(display, /<munderover>/);
    const matrix = renderToString(String.raw`\begin{matrix}a & b \\ c & d\end{matrix}`, true);
    assert.equal((matrix.match(/<mtr>/g) || []).length, 2);
    assert.equal((matrix.match(/<mtd>/g) || []).length, 4);
});

test("invalid and recursively expanding formulas stop with a parse error", () => {
    assert.throws(() => renderToString(String.raw`\frac{a`));
    assert.throws(() => renderToString(String.raw`\def\loop{\loop}\loop`), /expansions/);
});

test("source markup and TeX commands cannot introduce active HTML or URLs", () => {
    const literal = renderToString(String.raw`\text{<img src=x onerror=alert(1)>}`);
    assert.doesNotMatch(literal, /<img\b/);
    for (const source of [
        String.raw`\href{javascript:alert(1)}{x}`,
        String.raw`\includegraphics{https://example.com/track.png}`,
        String.raw`\htmlClass{injected}{x}`,
    ]) {
        assert.throws(() => renderToString(source), /Untrusted TeX command|ParseError/);
    }
});

test("macro definitions cannot leak between formulas", () => {
    renderToString(String.raw`\gdef\privateFormula{z}\privateFormula`);
    assert.throws(() => renderToString(String.raw`\privateFormula`));
});
