import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    excerpt: z.string(),
    eyebrow: z.string().optional(),
    intro: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().default(''),
    draft: z.boolean().default(false),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    team: z.enum(['Software', 'Hardware', 'Business']),
    order: z.number().default(0),
    focus: z.string().optional(),
    currentWork: z.string().optional(),
    hasProfile: z.boolean().default(true),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({ title: z.string() }),
});

export const collections = { blog, team, legal };
