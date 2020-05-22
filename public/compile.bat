emcc --bind -O3 -s ALLOW_MEMORY_GROWTH=1 code\main.cpp -o archivers.js ^
-s USE_ZLIB=1 code\zlib\archiver.cpp code\zlib\gzip.cpp ^
code\libdeflate2\archiver.cpp code\libdeflate2\lib\deflate_compress.c code\libdeflate2\lib\deflate_decompress.c code\libdeflate2\lib\aligned_malloc.c ^
code\miniz\archiver.cpp ^
-msimd128 