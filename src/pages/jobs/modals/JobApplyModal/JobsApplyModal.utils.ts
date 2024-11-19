import { z } from 'zod';

export const JOB_APPLICATION_SCHEMA = z.object({
    name: z.string(),
    email: z.string().email(),
    shortBio: z.string().optional(),
    portfolioLink: z.string().url().optional(),
    jobId: z.string(),
});
