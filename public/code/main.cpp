#include "core/archiver.h"
#include <emscripten.h>
#include <emscripten/bind.h>

#include <stdio.h>

using namespace emscripten;

EMSCRIPTEN_BINDINGS(my_module) {
	function("compress", &compress, allow_raw_pointers());
	function("decompress", &decompress, allow_raw_pointers());
	function("gzipCompress", &gzipCompress, allow_raw_pointers());
 }

int main() {
	return 0;
}