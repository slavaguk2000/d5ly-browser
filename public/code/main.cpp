#include <stdio.h>
#include <string.h>
#include <iostream>
#include <vector>
#include <stdexcept>
#include "zlib/archiver.h"
#include "libdeflate2/archiver.h"
#include "miniz/archiver.h"
#include <emscripten.h>
#include <emscripten/bind.h>
#include <math.h>

using namespace emscripten;
void print_Hello(int count, int str){
	puts("It is my code!!!");
}

using namespace libdeflate;

void zero(int ptr, int len)
{
	uint8_t* p = (uint8_t*)ptr;
	while(len--) {
		p[len] = 0;
	}
}

EMSCRIPTEN_BINDINGS(my_module) {
	function("zero", &zero, allow_raw_pointers());
	function("compress", &my_compress, allow_raw_pointers());
	function("decompress", &my_decompress, allow_raw_pointers());
	function("print_Hello", &print_Hello, allow_raw_pointers());
	function("libdeflate_compress", &libdeflate::my_compress, allow_raw_pointers());
	function("libdeflate_decompress", &libdeflate::my_decompress, allow_raw_pointers());
	function("zlib_compress", &zlib::my_compress, allow_raw_pointers());
	function("zlib_decompress", &zlib::my_decompress, allow_raw_pointers());
	function("miniz_compress", &miniz::my_compress, allow_raw_pointers());
	function("miniz_decompress", &miniz::my_decompress, allow_raw_pointers());
	
	//function("check_library", &check_library, allow_raw_pointers());
	//function("gzipCompress", &gzipCompress, allow_raw_pointers());
 }

int main() {
	return 0;
}
//level 1(speed) - 9(compression)