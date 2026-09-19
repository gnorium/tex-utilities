import katex from "./vendor/katex-0.18.7/katex.mjs";

export const selector = '.tex-formula[data-tex-display]';
let stylesReady;

function options(displayMode, onUntrustedCommand) {
    return {
        displayMode,
        output: "htmlAndMathml",
        throwOnError: true,
        trust: () => {
            onUntrustedCommand();
            return false;
        },
        strict: "error",
        maxExpand: 1000,
        maxSize: 20,
        // Each formula gets its own scope: definitions never leak to another.
        macros: {},
    };
}

/** Render one formula, without surrounding dollar delimiters. Invalid TeX throws. */
export function renderToString(source, displayMode = false) {
    let untrustedCommand = false;
    const html = katex.renderToString(source, options(displayMode, () => {
        untrustedCommand = true;
    }));
    // KaTeX otherwise draws only a rejected command's name in red, dropping
    // its arguments from the visible reading. Keep the entire source instead.
    if (untrustedCommand) throw new Error("Untrusted TeX command; original notation required");
    return html;
}

function loadStyles() {
    if (!stylesReady) {
        stylesReady = new Promise((resolve, reject) => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = new URL("./vendor/katex-0.18.7/katex.min.css", import.meta.url).href;
            link.onload = resolve;
            link.onerror = () => {
                link.remove();
                stylesReady = undefined;
                reject(new Error("TeX stylesheet could not be loaded"));
            };
            document.head.append(link);
        });
    }
    return stylesReady;
}

/** Typeset explicitly tagged formulas only; ordinary text is never scanned. */
export async function render(root = document) {
    const formulas = [
        ...(root.matches?.(selector) ? [root] : []),
        ...root.querySelectorAll(selector),
    ];
    const pending = formulas.filter(node => !node.dataset.texState);
    if (!pending.length) return;
    await loadStyles();
    for (const node of pending) {
        // Inserted ancestors can schedule the same formula while assets load.
        if (!node.isConnected || node.dataset.texState) continue;
        const source = node.textContent;
        try {
            const html = renderToString(source, node.dataset.texDisplay === "display");
            // Only KaTeX output reaches innerHTML, after parsing succeeds with
            // trust disabled. The source itself is always assigned as text.
            node.innerHTML = html;
            node.dataset.texState = "rendered";
        } catch (_) {
            node.textContent = source;
            node.dataset.texState = "source";
            node.title = "Formula could not be rendered; original notation shown.";
        }
    }
}
