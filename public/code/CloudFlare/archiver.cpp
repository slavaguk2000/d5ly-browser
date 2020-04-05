#include <iostream>
#include "zlib.h"
#define MEMORY_ERROR -1

using std::endl;
using std::cout;

namespace cloudflare{
   int my_compress(int pointer, int buffer, int source_size, int level){
		std::cout << "cloudflare" << std::endl;
		int error_msg = 0;
		uLongf compress_buff_size = source_size;
		error_msg = compress2((Bytef*)buffer, &compress_buff_size, (const Bytef*)pointer, source_size, level);
		switch (error_msg)
		{
		case Z_MEM_ERROR:
			return 0;
		case Z_BUF_ERROR:
			return 0;
		default:
			break;
		}
		return compress_buff_size;
	}

	int my_decompress(int compressedBuffer, int compressedSize, int uncompressedBuffer, int uncompressedSize) {
		std::cout << "cloudflare" << std::endl;
		uLong uLongUncompressedSize = uncompressedSize;
		int error_msg = uncompress((Bytef*)uncompressedBuffer, &uLongUncompressedSize, (const Bytef*)compressedBuffer, compressedSize);
		return uLongUncompressedSize;
	}
}

int main(){

	cloudflare::my_compress(0,0,0,0);
	return 0;
}