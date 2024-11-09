import { z } from "zod";

export const zodOrderProductCreate = z.object({
    body: z.object({
        productId: z.number(),
        orderId: z.number(),
        quantity: z.number().positive(),
        observations: z.string().optional(),
    }).strict(),
});