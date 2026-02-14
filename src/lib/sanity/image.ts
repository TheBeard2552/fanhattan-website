import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';
import { SanityImage } from './types';

const builder = imageUrlBuilder(client);

export function urlForImage(source: SanityImage) {
  return builder.image(source);
}
