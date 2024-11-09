import { z } from "zod";

export const zodProductCreate = z.object({
    body: z.object({
        name: z.string(),
        description: z.string(),
        price: z.number().positive().refine(n => {
            return n.toString().split('.')[1]?.length <= 2
        }, { message: 'Max precision is 2 decimal places' }),
        categoryId: z.number(),
    }).strict(),
});

export const zodProductUpdate = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.number().positive().refine(n => {
            return n.toString().split('.')[1]?.length <= 2
        }, { message: 'Max precision is 2 decimal places' }).optional(),
        categoryId: z.number().optional(),
    }).strict(),
});