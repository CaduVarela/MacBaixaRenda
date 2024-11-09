import { z } from "zod";

export const zodOrderCreate = z.object({
    body: z.object({
        name: z.string(),
        celular: z.string(),
        cep: z.string().optional(),
        street: z.string().optional(),
        number: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        neighborhood: z.string().optional(),
        deliveryType: z.string(),
        paymentType: z.string(),
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
        celular: z.string().optional(),
        cep: z.string().optional(),
        street: z.string().optional(),
        number: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        neighborhood: z.string().optional(),
        deliveryType: z.string().optional(),
        paymentType: z.string().optional(),
        $connect: z.object({
            products: z.array(
                z.object({
                    productId: z.number(),
                    quantity: z.number().positive(),
                    observations: z.string().optional(),
                })
            ).optional(),
        }).strict().optional(),
        $disconnect: z.object({
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