var flate = require('wasm-flate');
var pako = require('pako');
 
var data = new Uint8Array( Buffer.from('Hello World') );
flate.deflate_encode_raw(data)
pako.deflateRaw(data)

var data = new Uint8Array( Buffer.from('Hello World') );
var compressed_with_wasm_flate = flate.deflate_encode_raw(data)
var decompressed_with_pako = pako.inflateRaw(compressed_with_wasm_flate)
 
// covert to a string - since JS doesnt let us directly compare UintArrays
var original = new TextDecoder("utf-8").decode(data)
var evaluated = new TextDecoder("utf-8").decode(decompressed_with_pako)
console.log(original === evaluated)
console.log(evaluated)
