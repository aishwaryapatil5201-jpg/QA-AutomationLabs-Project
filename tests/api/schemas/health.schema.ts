import { z } from 'zod';

export const healthResponseSchema = z.object({
  data: z.object({
    status: z.string(),
    version: z.string(),
    uptime: z.string(),
    region: z.string(),
    time: z.string(),
  }),
  meta: z.object({
    requestId: z.string(),
    responseTimeMs: z.number(),
    timestamp: z.string(),
    apiVersion: z.string(),
  }),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;
