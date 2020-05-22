int compress(int pointer, int buffer, int source_size, int level);
int decompress(int compressedBuffer, int compressedSize, int uncompressedBuffer, int uncompressedSize);
int gzipCompress(int sourcePointer, int gzipPointer, int size);