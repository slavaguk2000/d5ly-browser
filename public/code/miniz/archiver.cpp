#include "archiver.h"
#include "trunk/miniz.c"
#include <iostream>

namespace miniz{
	int my_compress(int pointer, int buffer, int source_size, int level){
		std::cout << "miniz" << std::endl;
		mz_ulong compress_buff_size = source_size;
		if(
			 mz_compress2((unsigned char *)buffer, &compress_buff_size, (const unsigned char *)pointer, (mz_ulong)source_size, level)
			 != MZ_OK) return 0;
		return compress_buff_size;
	}

	int my_decompress(int compressedSource, int compressedSize, int uncompressedBuffer, int uncompressedSize) {
		std::cout << "zlib" << std::endl;
		mz_ulong uLongUncompressedSize = uncompressedSize;
		int error_msg = mz_uncompress((unsigned char *)uncompressedBuffer, &uLongUncompressedSize, (const unsigned char *)compressedSource, compressedSize);
		return uLongUncompressedSize;
	}
}