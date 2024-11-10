import { z } from "zod";

export const zodStatusCreate = z.object({
    body: z.object({
        type: z.string(),
    }).strict(),
});

export const zodStatusUpdate = z.object({
    body: z.object({
        type: z.string().optional(),
    }).strict(),
});