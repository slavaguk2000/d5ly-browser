//#define __wasm_unimplemented_simd128__
#include <emscripten/bind.h>
#include <emscripten/emscripten.h>
#include <time.h>
#include <stdio.h>
#include <wasm_simd128.h>
// #include "simd.h"

using namespace emscripten;

const int N = 1024;
const int count = 1;//000;

int **left;
int **right;
int **res;

int auto_vectorize()
{
	for (int a = 0; a < count; a++)
		for (int i = 0; i < N; i++)
			for (int k = 0; k < N; k++)
				for (int j = 0; j < N; j++)
					res[i][j] += left[i][k] * right[k][j]; 
	return 0;
}

int no_vectorize()
{
	for (int a = 0; a < count; a++)
		for (int i = 0; i < N; i++)
			for (int j = 0; j < N; j++)
				for (int k = 0; k < N; k++)
					res[i][j] += left[i][k] * right[k][j]; 
	return 0;
}

int my_vectorize()
{
	for (int a = 0; a < count; a++)
		for (int i = 0; i < N; i++)
			for (int k = 0; k < N; k++)
			{
				v128_t const_value = wasm_i32x4_splat(left[i][k]);
				for (int j = 0; j < N; j+=4)
				{
					v128_t string_value = wasm_v128_load(right[k] + j);
					v128_t result = wasm_v128_load(res[i] + j);
					result = wasm_i32x4_add(result, wasm_i32x4_mul(string_value, const_value));
					wasm_v128_store(res[i]+j, result);					
				}
			}
	return 0;
}

EMSCRIPTEN_BINDINGS(my_module) {
   	function("my_vectorize", &my_vectorize, allow_raw_pointers());
	function("no_vectorize", &no_vectorize, allow_raw_pointers());
	function("auto_vectorize", &auto_vectorize, allow_raw_pointers());
}

int init_matrix(int** &matrix, bool is_rand)
{
	srand(time(0));
	matrix = (int**)aligned_alloc(N * sizeof(int*), 16);
	if (!matrix) return 0;
	for (int i = 0; i < N; i++) {
		matrix[i] = (int*)aligned_alloc(N * sizeof(int), 16);
		if (!(matrix[i])) return 0;
	}
	return 1;
}

int main()	
{
	if (!init_matrix(left, true)) return 1;
	if (!init_matrix(right, true)) return 2;
	if (!init_matrix(res, false)) return 3;
	EM_ASM(
		function getNoVec(){
			console.time('no_vectorize');
			Module.no_vectorize();
			console.timeEnd('no_vectorize');
		}

		function getAutoVec(){
			console.time('auto_vectorize');
			Module.auto_vectorize();
			console.timeEnd('auto_vectorize');
		}
		function getMyVec(){
			console.time('my_vectorize');
			Module.my_vectorize();
			console.timeEnd('my_vectorize');
		}
	);	
	printf("everything ok\n");
	return 0;
}