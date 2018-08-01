#!/usr/bin/env bash

set -euo pipefail

cd nlp
wget https://github.com/mit-nlp/MITIE/releases/download/v0.4/MITIE-models-v0.2.tar.bz2
tar jxf MITIE-models-v0.2.tar.bz2
bzip2 -dk MITIE-models-v0.2.tar.bz2
tar xvf MITIE-models-v0.2.tar
