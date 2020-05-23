emcc -O3 -s ALLOW_MEMORY_GROWTH=1 -r -o core.bc ^
-s EXPORTED_FUNCTIONS="['_compress']" ^
-s ERROR_ON_UNDEFINED_SYMBOLS=0 ^
-s LINKABLE=1 ^
code\core\archiver.c code\core\lib\deflate_compress.c code\core\lib\deflate_decompress.c code\core\lib\aligned_malloc.c code\core\lib\gzip_compress.c code\core\lib\gzip_decompress.c ^
-msimd128
