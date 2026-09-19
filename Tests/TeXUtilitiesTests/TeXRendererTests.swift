import TeXUtilities
import XCTest

final class TeXRendererTests: XCTestCase {
  func testFormulaMarkupCannotBecomeHTML() {
    let source = #"\text{</span><img src=x onerror='alert(1)'>} & x"#
    let html = TeXRenderer.placeholder(source)
    XCTAssertFalse(html.contains("<img"))
    XCTAssertTrue(html.contains("&lt;/span&gt;"))
    XCTAssertTrue(html.contains("&#39;alert(1)&#39;"))
    XCTAssertTrue(html.contains(" &amp; x"))
    XCTAssertTrue(html.contains("data-tex-display=\"inline\""))
  }

  func testDisplayMatrixPreservesTeXAndEscapesOnlyHTML() {
    let html = TeXRenderer.placeholder(
      #"\begin{matrix}a & b \\ c & d\end{matrix}"#, displayMode: true)
    XCTAssertEqual(
      html,
      #"<span class="tex-formula" data-tex-display="display">\begin{matrix}a &amp; b \\ c &amp; d\end{matrix}</span>"#)
  }
}
