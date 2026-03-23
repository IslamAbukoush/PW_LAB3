import { defineCollection } from 'astro:content';

const pages = defineCollection({ type: 'content' });

export const collections = { pages };
