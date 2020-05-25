
let cachegetUint8Memory0 = null;

function getUint8Memory0() {
	if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasmMemory.buffer) {
		cachegetUint8Memory0 = new Uint8Array(wasmMemory.buffer);
	}
	return cachegetUint8Memory0;
}

function passArray8ToWasm0(arg, malloc, size) {
    const ptr = malloc(size);
	if(!ptr) throw "Memory Error"
	getUint8Memory0().set(arg, ptr);
	return ptr;
}
function getArrayU8FromWasm0(ptr, len) {
	return getUint8Memory0().subarray(ptr, ptr + len);
}
function d5ly_compress(sourceArray)
{
    var len = sourceArray.length;
	var sourcePointer = passArray8ToWasm0(sourceArray, Module._malloc, len * 2);
	var compressedSize = Module.compress(sourcePointer, len);
	var compressedArray = getArrayU8FromWasm0(sourcePointer+len, compressedSize).slice();
	Module._free(sourcePointer)
	return compressedArray;
}

function d5ly_decompress(compressedArray, sourceSize)
{
	len = compressedArray.length;
    const compressedPointer = passArray8ToWasm0(compressedArray, Module._malloc, sourceSize+len);
	var decompressedSize = Module.decompress(compressedPointer, len, sourceSize);
	if (decompressedSize != sourceSize) {
		throw ("error, new_size = " + decompressedSize);
	}
	var decompressedArray = getArrayU8FromWasm0(compressedPointer+len, decompressedSize).slice();
	Module._free(compressedPointer)
	return decompressedArray
}