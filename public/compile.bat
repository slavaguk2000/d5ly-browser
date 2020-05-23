cls
call compile2.bat 
em++ --bind -std=c++11 -O3 -o archivers.js -s ALLOW_MEMORY_GROWTH=1 main.bc ^
-s ERROR_ON_UNDEFINED_SYMBOLS=0 ^
-msimd128 


REM -s USE_ZLIB=1 code\zlib\archiver.cpp code\zlib\gzip.cpp ^
REM code\libdeflate2\archiver.cpp code\libdeflate2\lib\deflate_compress.c code\libdeflate2\lib\deflate_decompress.c code\libdeflate2\lib\aligned_malloc.c ^
REM code\miniz\archiver.cpp ^
REM code\main.cpp