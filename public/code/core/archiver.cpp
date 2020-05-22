#include <iostream>
#include "libdeflate.h"

using std::endl;
using std::cout;

int my_compress(int pointer, int buffer, int source_size, int level){
    libdeflate_compressor* compressor = libdeflate_alloc_compressor(level);
    size_t size = libdeflate_deflate_compress_bound(compressor,source_size);
    return libdeflate_deflate_compress(compressor, (const void*)pointer, source_size, (void*)buffer, size);
}
int my_decompress(int compressedBuffer, int compressedSize, int uncompressedBuffer, int uncompressedSize)
{
    libdeflate_decompressor* decompressor = libdeflate_alloc_decompressor();
    size_t actual_out_size;
    if (libdeflate_deflate_decompress(decompressor, (const void*)compressedBuffer, compressedSize, 
    (void*)uncompressedBuffer, uncompressedSize, &actual_out_size) != LIBDEFLATE_SUCCESS) return 0;
    return actual_out_size; 
}
int gzipCompress(int sourcePointer, int gzipPointer, int size)
{
    return 0;
}