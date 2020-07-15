extern "C"{
    int compress(int source, int source_size);
    int decompress(int compressedData, int compressedSize);
    int gzipCompress(int source, int source_size);
}
