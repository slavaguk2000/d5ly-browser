#include "lib/libdeflate.h"

#define LVL 1

int compress(int source, int source_size){
    struct libdeflate_compressor* compressor = libdeflate_alloc_compressor(LVL);
    uint8_t* source_pointer = (uint8_t*)source;
    uint8_t* destenition_pointer = source_pointer + source_size;
    uint32_t size = libdeflate_deflate_compress(compressor, source_pointer, source_size, destenition_pointer, source_size - 1);
    *((uint32_t*)(destenition_pointer+size)) = size;
    return size;
}
int decompress(int compressedData, int compressedSize, int uncompressedSize)
{
    struct libdeflate_decompressor* decompressor = libdeflate_alloc_decompressor();
    size_t actual_out_size;
    uint8_t* pointer = (uint8_t*)compressedData;
    if (libdeflate_deflate_decompress(decompressor, pointer, compressedSize, 
    pointer + compressedSize, uncompressedSize, &actual_out_size) != LIBDEFLATE_SUCCESS) return 0;
    return actual_out_size; 
}
int gzipCompress(int source, int source_size)
{
    struct libdeflate_compressor* compressor = libdeflate_alloc_compressor(LVL);
    uint8_t* pointer = (uint8_t*)source;
    return libdeflate_gzip_compress(compressor, pointer, source_size, pointer+source_size, source_size);
}    
