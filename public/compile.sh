#!/bin/bash

clear
emcc --bind -O3 -s ALLOW_MEMORY_GROWTH=1 \
-o d5ly.js code/main.cpp \
code/core/d5ly.c code/core/lib/deflate_compress.c code/core/lib/deflate_decompress.c code/core/lib/aligned_malloc.c code/core/lib/gzip_compress.c code/core/lib/crc32.c \
-msimd128 

# emcc -v 1.39.11
# clang version 11.0.0 