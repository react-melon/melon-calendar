#!/bin/bash

rm -rf lib
edp build -f -s npm
mv output/asset lib
cp package.json README.md lib
rm -rf output dist

cd lib

npm publish
