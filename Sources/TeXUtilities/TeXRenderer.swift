import Foundation

/// TeX formula output shared by server-rendered views and the browser renderer.
/// This package renders mathematical notation; it does not compile LaTeX documents.
public enum TeXRenderer {
  /// An escaped, readable source fragment. `Browser/tex.js` progressively replaces
  /// its contents with typeset HTML and MathML. Asset or parse failures keep this
  /// source visible. Callers pass the formula itself, without dollar delimiters.
  public static func placeholder(_ source: String, displayMode: Bool = false) -> String {
    let escaped = source
      .replacingOccurrences(of: "&", with: "&amp;")
      .replacingOccurrences(of: "<", with: "&lt;")
      .replacingOccurrences(of: ">", with: "&gt;")
      .replacingOccurrences(of: "\"", with: "&quot;")
      .replacingOccurrences(of: "'", with: "&#39;")
    let mode = displayMode ? "display" : "inline"
    return "<span class=\"tex-formula\" data-tex-display=\"\(mode)\">\(escaped)</span>"
  }
}
