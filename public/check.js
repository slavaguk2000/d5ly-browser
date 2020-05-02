function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
  
function compare_compress_speed(count, dispersion)
{
	if (dispersion>255) dispersion = 255
	var sourceArray = new Uint8Array(count);
	var size = sourceArray.length
	var sourcePointer = Module._malloc(size);
	if (sourcePointer)
	{
		var buffer = Module._malloc(size);
		if (buffer)
		{
			for (var i = 0; i < sourceArray.length; i++)
				sourceArray[i] = getRandomInt(dispersion) + (255 - dispersion)/2;
			uncompressedArray = new Uint8Array(wasmMemory.buffer, sourcePointer, size);
			uncompressedArray.set(sourceArray);
			for (var i = 1; i < 10; i++){
				console.time('zlib_time');
				var compressedSize = Module.zlib_compress(sourcePointer, buffer, size, i);
				console.timeEnd('zlib_time');
				console.log("compress size: " + compressedSize + ", level: " + i)
			}
			for (var i = 1; i < 10; i++){
				if (i == 7) i = 9;
				console.time('libdeflate_time');
				var compressedSize = Module.libdeflate_compress(sourcePointer, buffer, size, i);
				console.timeEnd('libdeflate_time');
				console.log("compress size: " + compressedSize + ", level: " + i)
			}	
			for (var i = 1; i < 10; i++){
				console.time('miniz_time');
				var compressedSize = Module.miniz_compress(sourcePointer, buffer, size, i);
				console.timeEnd('miniz_time');
				console.log("compress size: " + compressedSize + ", level: " + i)
			}
			console.time('wasm-flate_time')
			var compress_Arrrrr = flate.deflate_encode_raw(uncompressedArray);
			console.timeEnd('wasm-flate_time')
			console.log("compress size: " + compress_Arrrrr.length + ", level: unknown")

			Module._free(buffer)
		}
		Module._free(sourcePointer)
	}
}

function libdef_comp(sourceArray)
{
    var size = sourceArray.length
	var sourcePointer = Module._malloc(size*2);	
	if (sourcePointer) {
		uncompressedArray = new Uint8Array(wasmMemory.buffer, sourcePointer, size);
		uncompressedArray.set(sourceArray);
		var compressedSize = Module.libdeflate_compress(sourcePointer, sourcePointer+size, size, 1);
		compressedArray = new Uint8Array(wasmMemory.buffer, sourcePointer+size, compressedSize);
		Module._free(sourcePointer)
		return compressedArray
	}
	else {
		returnedArray = new Uint8Array();	
		return returnedArray;
	}
}

let WASM_VECTOR_LEN = 0;
let cachegetUint8Memory0 = null;

function getUint8Memory0() {
	if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasmMemory.buffer) {
		cachegetUint8Memory0 = new Uint8Array(wasmMemory.buffer);
	}
	return cachegetUint8Memory0;
}

function passArray8ToWasm0(arg, malloc) {
	WASM_VECTOR_LEN = arg.length;
	const ptr = malloc(WASM_VECTOR_LEN * 2);
	getUint8Memory0().set(arg, ptr);
	return ptr;
}
function getArrayU8FromWasm0(ptr, len) {
	return getUint8Memory0().subarray(ptr, ptr + len);
}
function libdef_comp2(sourceArray)
{
	var sourcePointer = passArray8ToWasm0(sourceArray, Module._malloc);
	if(!sourcePointer) throw "Memory Error"
	var len = WASM_VECTOR_LEN;
	var compressedSize = Module.libdeflate_compress(sourcePointer, sourcePointer+len, len, 1);
	var compressedArray = getArrayU8FromWasm0(sourcePointer+len, compressedSize).slice();
	Module._free(sourcePointer)
	return compressedArray;
}

function libdef_decomp(compressArray, sourceSize)
{
	len = compressArray.length;
	const ptr = Module._malloc(sourceSize+len);
	if(!ptr) throw "Memory Error"
	getUint8Memory0().set(compressArray, ptr);
	var decompressedSize = Module.decompress(ptr, len, ptr+len, sourceSize);
	if (decompressedSize != sourceSize) {
		throw ("error, new_size = " + decompressedSize);
	}
	var decompressedArray = getArrayU8FromWasm0(ptr+len, decompressedSize).slice();
	Module._free(ptr)
	return decompressedArray
}

function compress(sourceArray, level){
	var size = sourceArray.length
	var sourcePointer = Module._malloc(size);
	if (sourcePointer){
		var buffer = Module._malloc(size);
		if(buffer)
		{
			uncompressedArray = new Uint8Array(wasmMemory.buffer, sourcePointer, size);
			uncompressedArray.set(sourceArray);
			console.time('zip_time');
			var compressedSize = Module.compress(sourcePointer, buffer, size, level);
			console.timeEnd('zip_time');
			wasmCompressedArray =  new Uint8Array(wasmMemory.buffer, buffer, compressedSize);
			const compressedArray = [...wasmCompressedArray];
			Module._free(buffer);
		}
		Module._free(sourcePointer);
	}
	if (compressedSize) 
	{
		returnedArray = new Uint8Array(compressedArray)
		return {
			size,
			returnedArray
		}
	}
	else return {
		size,
		sourceArray
	}
}


function decompress(compressedArray, sourceSize){
	var size = compressedArray.length;
	var compressedPointer = Module._malloc(size);
	var decompressedPointer = Module._malloc(sourceSize);
	wasmCompressedArray = new Uint8Array(wasmMemory.buffer, compressedPointer, size);
	wasmDecompressedArray = new Uint8Array(wasmMemory.buffer, decompressedPointer, sourceSize);
	wasmCompressedArray.set(compressedArray);
	var decompressedSize = Module.decompress(compressedPointer, size, decompressedPointer, sourceSize);
	if (decompressedSize != sourceSize) {
		console.log("error, new_size = " + decompressedSize);
	}
	const decompressedArray = [...wasmDecompressedArray];
	Module._free(compressedPointer);
	Module._free(decompressedPointer);
	returnedArray = new Uint8Array(decompressedArray);
	return returnedArray;
}

function battle_with_wasm_flate(){
	var sourceArray = new Uint8Array(100000);
	var size = sourceArray.length
	for (var i = 0; i < sourceArray.length; i++)
		sourceArray[i] = getRandomInt(100) + (255 - 100)/2;

	console.time('wasm-flate')
	flate.deflate_encode_raw(sourceArray)
	console.timeEnd('wasm-flate')

	console.time('libdeflate')
	libdef_comp(sourceArray)
	console.timeEnd('libdeflate')

	console.time('libdeflate2')
	compressedArray = libdef_comp2(sourceArray)
	console.timeEnd('libdeflate2')

	decompressedArray = libdef_decomp(compressedArray, sourceArray.length)
	error = 0
	for (var i = 0; i < sourceArray.length; i++)
		if( sourceArray[i] != decompressedArray[i]) 
		{
			console.log("ERROR_DEOMPRESS")
			error = 1
			break
		}
	if(!error) console.log("EQUAL")

	var size = sourceArray.length
	var returnedArray = new Uint8Array();
	var sourcePointer = Module._malloc(size*2);	
	if (sourcePointer) {
		uncompressedArray = new Uint8Array(wasmMemory.buffer, sourcePointer, size);
		uncompressedArray.set(sourceArray);
		// console.time('libdeflate-core')
		var compressedSize = Module.libdeflate_compress(sourcePointer, sourcePointer+size, size, 1);
		// console.timeEnd('libdeflate-core')
		compressedArray = new Uint8Array(wasmMemory.buffer, sourcePointer+size, compressedSize);
		// console.time('copy_return')
		returnedArray = Array.from(compressedArray)
		// console.timeEnd('copy_return')
		Module._free(sourcePointer)
	}
}


var count = 1000000
level = 1
var sourcePointer = Module._malloc(count);
var sourceArray = new Uint8Array(wasmMemory.buffer, sourcePointer, count);
for (var i = 0; i < sourceArray.length; i++)
	sourceArray[i] = i%10+48;
var compressArray = compress(sourceArray, level);
console.log(compressArray.returnedArray.length)
var decompressArray = decompress(compressArray.returnedArray, compressArray.size);

function compress_test(level)
{
	var compressArray = compress(sourceArray, level);
	console.log("compress size: " + compressArray.returnedArray.length + ", level: " + level)
}

for (var i = 1; i < 10; i++)
	compress_test(i)


