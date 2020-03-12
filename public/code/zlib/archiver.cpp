#include "archiver.h"
namespace zlib{
	int my_compress(int pointer, int source_size, int level){
		std::cout << "zlib" << std::endl;
		int error_msg;
		uLongf compress_buff_size = compressBound(source_size);
		error_msg = 0;
		void* compress_buff = malloc(compress_buff_size+sizeof(int32_t));
		if (!compress_buff)
		{
			error_msg = MEMORY_ERROR;
			throw std::runtime_error("Memory Error");
		}
		error_msg = compress2((Bytef*)((int32_t*)compress_buff+1), (uLongf*)&compress_buff_size, (const Bytef*)pointer, source_size, level);
		switch (error_msg)
		{
		case Z_MEM_ERROR:
			throw std::runtime_error("Memory Error");
		case Z_BUF_ERROR:
			throw std::runtime_error("Buffer Error");
		default:
			break;
		}
		((int32_t*)compress_buff)[0] = compress_buff_size;
		return (int)compress_buff;
	}

	int my_decompress(int compressedBuffer, int compressedSize, int uncompressedBuffer, int uncompressedSize) {
		std::cout << "zlib" << std::endl;
		uLong uLongUncompressedSize = uncompressedSize;
		int error_msg = uncompress((Bytef*)uncompressedBuffer, &uLongUncompressedSize, (const Bytef*)compressedBuffer, compressedSize);
		return uncompressedSize;
	}
}