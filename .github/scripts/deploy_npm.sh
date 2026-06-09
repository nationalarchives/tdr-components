#!/bin/bash
set -e
npm config set //registry.npmjs.org/:_authToken=$1
npm ci
npm run build
cd package
npm version patch
git add package.json
git commit -m 'Update npm version'
git push
echo "set-npm-version=$(awk '/version/{gsub(/("|",)/,"",$2);print $2}' package/package.json)" >> $GITHUB_OUTPUT
npm publish --access public
cd ..
