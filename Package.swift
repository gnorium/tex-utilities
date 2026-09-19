// swift-tools-version: 6.2

import PackageDescription

let package = Package(
  name: "TeXUtilities",
  platforms: [.macOS(.v14)],
  products: [.library(name: "TeXUtilities", targets: ["TeXUtilities"])],
  targets: [
    .target(name: "TeXUtilities"),
    .testTarget(name: "TeXUtilitiesTests", dependencies: ["TeXUtilities"]),
  ]
)
