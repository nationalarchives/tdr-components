#!/bin/bash
npm config set //registry.npmjs.org/:_authToken=$1
npm ci
npm run build
npm version patch
git add package.json package-lock.json
git commit -m 'Update npm version'
git push
npm publish --access public
cd ..
echo ::set-output name=set-npm-version::$(awk '/version/{gsub(/("|",)/,"",$2);print $2}' ts/package.json)
