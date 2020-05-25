let wasmMemoryBuffer = null;

function getUint8Memory() {
	if (wasmMemoryBuffer === null || wasmMemoryBuffer.buffer !== wasmMemory.buffer) {
		wasmMemoryBuffer = new Uint8Array(wasmMemory.buffer);
	}
	return wasmMemoryBuffer;
}

function passArray8ToWasm(arg, malloc, size) {
    const ptr = malloc(size);
	if(!ptr) throw "Memory Error"
	getUint8Memory().set(arg, ptr);
	return ptr;
}
function getArrayU8FromWasm(ptr, len) {
	return getUint8Memory().subarray(ptr, ptr + len);
}
function d5ly_compress(sourceArray)
{
    var len = sourceArray.length;
	var sourcePointer = passArray8ToWasm(sourceArray, Module._malloc, len * 2);
	var compressedSize = Module.compress(sourcePointer, len);
	var compressedArray = getArrayU8FromWasm(sourcePointer+len, compressedSize).slice();
	Module._free(sourcePointer)
	return compressedArray;
}

function d5ly_decompress(compressedArray, sourceSize)
{
	len = compressedArray.length;
    const compressedPointer = passArray8ToWasm(compressedArray, Module._malloc, sourceSize+len);
	var decompressedSize = Module.decompress(compressedPointer, len, sourceSize);
	if (decompressedSize != sourceSize) {
		throw ("error, new_size = " + decompressedSize);
	}
	var decompressedArray = getArrayU8FromWasm(compressedPointer+len, decompressedSize).slice();
	Module._free(compressedPointer)
	return decompressedArray
}