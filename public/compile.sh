#!/bin/bash

clear
emcc --bind -O3 -s ALLOW_MEMORY_GROWTH=1 \
-o archivers.js code/main.cpp \
code/core/archiver.c code/core/lib/deflate_compress.c code/core/lib/deflate_decompress.c code/core/lib/aligned_malloc.c code/core/lib/gzip_compress.c code/core/lib/crc32.c \
-msimd128 
# -s ERROR_ON_UNDEFINED_SYMBOLS=0 \
# code/CloudFlare/archiver.cpp code/CloudFlare/compress.c code/CloudFlare/uncompr.c \
# code/libdeflate2/archiver.cpp code/libdeflate2/lib/deflate_compress.c code/libdeflate2/lib/deflate_decompress.c code/libdeflate2/lib/aligned_malloc.c \
# code/miniz/archiver.cpp \
# -s USE_ZLIB=1 code/zlib/archiver.cpp code/zlib/gzip.cpp \