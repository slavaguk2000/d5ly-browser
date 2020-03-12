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
			Module._free(buffer)
		}
		Module._free(sourcePointer)
	}
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


