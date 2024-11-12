import { z } from "zod";

export const zodOrderCreate = z.object({
    body: z.object({
        name: z.string(),
        phone: z.string().regex(
            /^[0-9]{10,11}$/,
            'Invalid phone number format'
        ),
        cep: z.string().optional(),
        street: z.string().optional(),
        number: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        neighborhood: z.string().optional(),
        deliveryType: z.string(),
        paymentType: z.string(),
        canceled: z.boolean().optional().default(false),
        statusId: z.number().positive(),
        $connect: z.object({
            products: z.array(
                z.object({
                    productId: z.number(),
                    quantity: z.number().positive(),
                    observations: z.string().optional(),
                })
            ).optional(),
        }).strict().optional(),
    }).strict(),
});

export const zodOrderUpdate = z.object({
    body: z.object({
        name: z.string().optional(),
        phone: z.string().regex(
            /^[0-9]{10,11}$/,
            'Invalid phone number format'
        ).optional(),
        cep: z.string().optional(),
        street: z.string().optional(),
        number: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        neighborhood: z.string().optional(),
        deliveryType: z.string().optional(),
        paymentType: z.string().optional(),
        canceled: z.boolean().optional(),
        statusId: z.number().positive().optional(),
        $connect: z.object({
            products: z.array(
                z.object({
                    productId: z.number(),
                    quantity: z.number().positive().optional(),
                    observations: z.string().optional(),
                })
            ).optional(),
        }).strict().optional(),
        $disconnect: z.object({
            products: z.array(
                z.number().positive().optional()
            ).optional(),
        }).strict().optional(),
    }).strict(),
});