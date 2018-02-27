#!/bin/bash

cat bookmarklet.js | bookmarkletter | tr -d '\n' > dist/export.bookmarklet
cat README.template | sed "s/%%%CODE%%%/$(sed 's:/:\\/:g' dist/export.bookmarklet)/g" > README.md
