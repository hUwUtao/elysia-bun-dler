#!/bin/bash
build() {
  bun build src/index.ts --compile --minify --outfile=dist/server.exe $@
}

# build --target=bun-linux-x64 --outfile=dist/server-linux-x64.exe
# build --target=bun-linux-arm64 --outfile=dist/server-linux-arm64.exe
# build --target=bun-macos-x64 --outfile=dist/server-macos-x64.exe
# build --target=bun-macos-arm64 --outfile=dist/server-macos-arm64.exe
build --target=bun-windows-x64 --outfile=dist/server-windows-x64.exe
# build --target=bun-windows-arm64 --outfile=dist/server-windows-arm64.exe
