#!/usr/bin/env bash
# Builds a signed release APK and generates .md5/.sha512 sidecar checksums for it,
# verifiable with `md5sum -c` / `sha512sum -c`.
set -euo pipefail

cd "$(dirname "$0")"

./gradlew assembleRelease

apk_dir="app/build/outputs/apk/release"
shopt -s nullglob
for apk in "$apk_dir"/*.apk; do
    (cd "$apk_dir" && md5sum "$(basename "$apk")" > "$(basename "$apk").md5")
    (cd "$apk_dir" && sha512sum "$(basename "$apk")" > "$(basename "$apk").sha512")
done
