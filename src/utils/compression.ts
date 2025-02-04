import { compressToEncodedURIComponent as compress, decompressFromEncodedURIComponent as decompress } from 'lz-string';

export const compressToEncodedURIComponent = (input: string): string => {
  return compress(input);
};

export const decompressFromEncodedURIComponent = (compressed: string): string => {
  return decompress(compressed);
};