#include "archiver.h"
namespace miniz{
	int my_compress(int pointer, int buffer, int source_size, int level){
		std::cout << "miniz" << std::endl;
		int compress_buff_size = 0;
		
		return compress_buff_size;
	}

	int my_decompress(int compressedBuffer, int compressedSize, int uncompressedBuffer, int uncompressedSize) {
		std::cout << "zlib" << std::endl;
		uLong uLongUncompressedSize = uncompressedSize;
		int error_msg = uncompress((Bytef*)uncompressedBuffer, &uLongUncompressedSize, (const Bytef*)compressedBuffer, compressedSize);
		return uncompressedSize;
	}
}