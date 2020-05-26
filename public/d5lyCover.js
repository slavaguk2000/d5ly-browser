let wasmMemoryBuffer = null;

function getUint8Memory() {
	if (wasmMemoryBuffer === null || wasmMemoryBuffer.buffer !== wasmMemory.buffer) {
		wasmMemoryBuffer = new Uint8Array(wasmMemory.buffer);
	}
	return wasmMemoryBuffer;
}

function passArrayToWasm(arg, malloc, size) {
    const ptr = malloc(size);
	if(!ptr) throw "Memory Error"
	getUint8Memory().set(arg, ptr);
	return ptr;
}
function getArrayFromWasm(ptr, len) {
	return getUint8Memory().subarray(ptr, ptr + len);
}
function d5ly_compress(sourceArray)
{
    var len = sourceArray.length;
	var sourcePointer = passArrayToWasm(sourceArray, Module._malloc, len * 2);
	var compressedSize = Module.compress(sourcePointer, len);
	var compressedArray = getArrayFromWasm(sourcePointer+len, compressedSize).slice();
	Module._free(sourcePointer)
	return compressedArray;
}

function d5ly_decompress(compressedArray, sourceSize)
{
	len = compressedArray.length;
    const compressedPointer = passArrayToWasm(compressedArray, Module._malloc, sourceSize+len);
	var decompressedSize = Module.decompress(compressedPointer, len, sourceSize);
	if (decompressedSize != sourceSize) {
		throw ("error, new_size = " + decompressedSize);
	}
	var decompressedArray = getArrayFromWasm(compressedPointer+len, decompressedSize).slice();
	Module._free(compressedPointer)
	return decompressedArray
}

function d5ly_gzipCompress(sourceArray){
	var len = sourceArray.length;
	GZIP_OWERHEAD = 20
	var sourcePointer = passArrayToWasm(sourceArray, Module._malloc, len * 2 + GZIP_OWERHEAD);
	var compressedSize = Module.gzipCompress(sourcePointer, len);
	var compressedArray = getArrayFromWasm(sourcePointer+len, compressedSize).slice();
	Module._free(sourcePointer)
	return compressedArray;
}

function d5ly_compress_optimize(sourceArray)
{
    var len = sourceArray.length;
	var sourcePointer = passArrayToWasm(sourceArray, Module._malloc, len * 2);
	var compressedSize = Module.compress_optimize(sourcePointer, len);
	var compressedArray = getArrayFromWasm(sourcePointer+len, compressedSize).slice();
	Module._free(sourcePointer)
	return compressedArray;
}