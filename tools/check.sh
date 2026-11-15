#!/bin/sh
# Syntax-checks every module as an ES module (node --check on a .js file does not catch everything here).
cd "$(dirname "$0")/.."
T=$(mktemp -d)
bad=0
for f in $(find src -name "*.js"); do
  cp "$f" "$T/m.mjs"
  node --check "$T/m.mjs" 2>"$T/err" || { echo "BAD $f: $(grep -m1 -i error "$T/err")"; bad=1; }
done
rm -rf "$T"
[ $bad = 0 ] && echo "all modules parse"
