# D5LY - Browser
# The fastest deflate compressor for browser

## Usage 
### You need 3 files:
####	-public/d5ly.js
####	-public/d5ly.wasm
####	-public/d5ly_cover.js

```html
<script src="d5ly_cover.js"></script>
<script src="d5ly.js"></script>
```

```javascript
compressedArray = d5ly_compress(sourceArray)
decompressedArray = d5ly_decompress(compressedArray)
```
