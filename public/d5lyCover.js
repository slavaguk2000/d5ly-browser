let wasmMemoryBuffer = null;

function getUint8Memory() {
	if (wasmMemoryBuffer === null || wasmMemoryBuffer.buffer !== wasmMemory.buffer) {
		wasmMemoryBuffer = new Uint8Array(wasmMemory.buffer);
	}
	return wasmMemoryBuffer;
}

function passArrayToWasm(arg, size) {
    const ptr = Module._malloc(size);
	if(!ptr) throw "Memory Error"
	getUint8Memory().set(arg, ptr);
	return ptr;
}
function getArrayFromWasm(ptr, len) {
	return getUint8Memory().subarray(ptr, ptr + len);
}

function getInt32(uint8Pointer){
	return Module.HEAPU32[Math.ceil(uint8Pointer/4)]
}

function d5ly_compress(sourceArray)
{
    var len = sourceArray.length;
	var sourcePointer = passArrayToWasm(sourceArray, len * 2);
	var compressedSize = Module.compress(sourcePointer, len);
	var compressedArray = getArrayFromWasm(sourcePointer+len, compressedSize).slice();
	Module._free(sourcePointer)
	return compressedArray;
}

function d5ly_decompress(compressedArray, sourceSize)
{
	var len = compressedArray.length;
	var compressedArrayPointer = passArrayToWasm(compressedArray, len + 7);
	var decompressedSize = Module.decompress(compressedArrayPointer, len);
	decompressedArrayPointer = getInt32(compressedArrayPointer + len)
	var decompressedArray = getArrayFromWasm(decompressedArrayPointer, decompressedSize).slice();
	Module._free(compressedArrayPointer)
	Module._free(decompressedArrayPointer)
	return decompressedArray;
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
