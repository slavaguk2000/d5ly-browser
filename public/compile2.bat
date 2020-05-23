emcc -s ALLOW_MEMORY_GROWTH=1 -c -o main.bc code\main.cpp ^ 
-s LINKABLE=1 ^

-msimd128



REM -O3 -r
REM -s EXPORTED_FUNCTIONS="['_compress']" ^
REM -s ERROR_ON_UNDEFINED_SYMBOLS=0 ^
REM code\core\archiver.c code\core\lib\deflate_compress.c code\core\lib\deflate_decompress.c code\core\lib\aligned_malloc.c code\core\lib\gzip_compress.c code\core\lib\gzip_decompress.c ^
