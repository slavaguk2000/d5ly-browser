cls

@echo off

echo.
echo. 
echo.
echo. 
echo      \\\\\\\          \\\\\\       \\          \\     \\\\\\\\      \\\\\\    \\           \\\\\\\\ 
echo    \\       \\      \\      \\     \\\\      \\\\     \\      \\      \\      \\           \\ 
echo    \\              \\        \\    \\  \\  \\  \\     \\       \\     \\      \\           \\   
echo    \\              \\        \\    \\    \\    \\     \\      \\      \\      \\           \\\\\ 
echo    \\              \\        \\    \\          \\     \\\\\\\\        \\      \\           \\ 
echo    \\        \\     \\      \\     \\          \\     \\              \\      \\           \\ 
echo      \\\\\\\\         \\\\\\       \\          \\     \\            \\\\\\    \\\\\\\\\\   \\\\\\\\\
echo.
echo. 
echo.
echo.

@echo on

emcc --bind -O3 -s ALLOW_MEMORY_GROWTH=1 ^
-o d5ly.js code/d5ly_browser.cpp ^
code/core/d5ly.c code/core/lib/deflate_compress.c code/core/lib/deflate_decompress.c code/core/lib/aligned_malloc.c code/core/lib/gzip_compress.c code/core/lib/crc32.c 

REM-msimd128 

REM -s ASSERTIONS=1
