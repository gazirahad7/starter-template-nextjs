import { z } from 'zod';

export const homePageContentSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  description: z.string().max(1000, 'Description is too long').optional(),
  imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),
});

export type HomePageContentInput = z.infer<typeof homePageContentSchema>;
