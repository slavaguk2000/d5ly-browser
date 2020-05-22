#include <stdio.h>
#include <string.h>
#include <iostream>
#include <vector>
#include <stdexcept>
#include "core/archiver.h"
#include <emscripten.h>
#include <emscripten/bind.h>
#include <math.h>

using namespace emscripten;
void print_Hello(int count, int str){
	puts("It is my code!!!");
}


EMSCRIPTEN_BINDINGS(my_module) {
	function("compress", &compress, allow_raw_pointers());
	function("decompress", &decompress, allow_raw_pointers());
 }

int main() {
	return 0;
}
//level 1(speed) - 9(compression)