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

function battle_with_wasm_flate(){
	var sourceArray = new Uint8Array(100000);
	var size = sourceArray.length
	for (var i = 0; i < sourceArray.length; i++)
	sourceArray[i] = getRandomInt(100) + (255 - 100)/2;
	
	console.time('wasm-flate')
	flate.deflate_encode_raw(sourceArray)
	console.timeEnd('wasm-flate')
	
	console.time('d5ly_compress')
	compressedArray1 = d5ly_compress(sourceArray)
	console.timeEnd('d5ly_compress')

	console.time('d5ly_compress_optimize')
	compressedArray2 = d5ly_compress_optimize(sourceArray)
	console.timeEnd('d5ly_compress_optimize')	
	

	error = 0
	for (var i = 0; i < sourceArray.length; i++)
		if( compressedArray1[i] != compressedArray2[i]) 
		{
			console.log("ERROR_OPTIMIZATION")
			error = 1
			break
		}
	if(!error) console.log("OPTIMIZATION RESAULT: EQUAL")
	
	decompressedArray = d5ly_decompress(compressedArray2, sourceArray.length)
	error = 0
	for (var i = 0; i < sourceArray.length; i++)
		if( sourceArray[i] != decompressedArray[i]) 
		{
			console.log("ERROR_DECOMPRESS")
			error = 1
			break
		}
	if(!error) console.log("DECOMPRESS RESAULT: EQUAL")
	
}
