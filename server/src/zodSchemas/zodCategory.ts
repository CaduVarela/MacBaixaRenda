import { z } from "zod";

export const zodCategoryCreate = z.object({
    body: z.object({
        name: z.string(),
    }).strict(),
});

export const zodCategoryUpdate = z.object({
    body: z.object({
        name: z.string().optional(),
    }).strict(),
});