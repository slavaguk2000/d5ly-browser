function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

var saveByteArray = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, name) {
        var blob = new Blob([data], {type: "application/octet-binary"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

function getGzipFile(inputArray, name){
  saveByteArray(d5ly_gzipCompress(inputArray), name);
}

function getSourceArray(){
	var sourceArray = new Uint8Array(1000000);
	for (var i = 0; i < sourceArray.length; i++)
	sourceArray[i] = getRandomInt(100) + (255 - 100)/2;
	return sourceArray
}

function check_equality(sourceArray, decompressedArray){
	error = 0
	for (var i = 0; i < sourceArray.length; i++)
	if( sourceArray[i] != decompressedArray[i]) 
	{
		console.log("ERROR_DECOMPRESS: " + i)
		error = 1
		break
	}
	if(!error) console.log("EQUAL")
}

function battle_with_wasm_flate(){
	var sourceArray = getSourceArray()
	
	console.time('wasm-flate')
	flate.deflate_encode_raw(sourceArray)
	console.timeEnd('wasm-flate')
	
	console.time('d5ly_compress')
	compressedArray = d5ly_compress(sourceArray)
	console.timeEnd('d5ly_compress')
	
	decompressedArray = d5ly_decompress(compressedArray, sourceArray.length)
	check_equality(sourceArray, decompressedArray)	
}

pako = window.pako

function battle_with_pako(){
	var sourceArray = getSourceArray()
	
	console.time('pako')
	pako.deflateRaw(sourceArray)
	console.timeEnd('pako')
	
	console.time('d5ly_compress')
	compressedArray = d5ly_compress(sourceArray)
	console.timeEnd('d5ly_compress')
	
	decompressedArray = d5ly_decompress(compressedArray, sourceArray.length)
	check_equality(sourceArray, decompressedArray)
	
}

function battle(){	
	var sourceArray = getSourceArray()
	
	console.time('pako')
	pako.deflateRaw(sourceArray)
	console.timeEnd('pako')
		
	console.time('wasm-flate')
	flate.deflate_encode_raw(sourceArray)
	console.timeEnd('wasm-flate')

	console.time('d5ly_compress')
	compressedArray = d5ly_compress(sourceArray)
	console.timeEnd('d5ly_compress')
	
	decompressedArray = d5ly_decompress(compressedArray)
	check_equality(sourceArray, decompressedArray)
	
}

function get_time_of_compress(){
	var sourceArray = getSourceArray()
	
	let times = []
	
	let start = performance.now();
	pako.deflateRaw(sourceArray)
	let end = performance.now();
	times.push(end - start)
	
	start = performance.now();
	flate.deflate_encode_raw(sourceArray)
	end = performance.now();
	times.push(end - start)

	start = performance.now();
	compressedArray = d5ly_compress(sourceArray)
	end = performance.now();
	times.push(end - start)

	decompressedArray = d5ly_decompress(compressedArray, sourceArray.length)
	check_equality(sourceArray, decompressedArray)
	return times
}

function get_time_of_decompress(){
	var sourceArray = getSourceArray()
	compressedArray = flate.deflate_encode_raw(sourceArray)

	let times = []

	let start = performance.now();
	pako.inflateRaw(compressedArray)
	let end = performance.now();
	times.push(end - start)
	
	start = performance.now();
	flate.deflate_decode_raw(compressedArray)
	end = performance.now();
	times.push(end - start)

	start = performance.now();
	decompressedArray = d5ly_decompress(compressedArray)
	end = performance.now();
	times.push(end - start)

	check_equality(sourceArray, decompressedArray)

	return times
}
