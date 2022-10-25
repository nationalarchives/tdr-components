#!/bin/bash
npm config set //registry.npmjs.org/:_authToken=$1
npm ci
npm run build
cd package
npm version patch
npm publish --access public
cd ..
echo ::set-output name=set-npm-version::$(awk '/version/{gsub(/("|",)/,"",$2);print $2}' package.json)
