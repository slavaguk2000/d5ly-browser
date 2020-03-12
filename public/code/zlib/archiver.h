#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include "gzguts.h"
#define MEMORY_ERROR -1
namespace zlib{
	int my_compress(int pointer, int source_size, int level);
	int my_decompress(int compressedBuffer, int compressedSize, int uncompressedBuffer, int uncompressedSize);
	int gzipCompress(int sourcePointer, int gzipPointer, int size);
}