#!/bin/bash

rm -rf dist lib
edp build -f
mv output/asset dist
rm -rf output
