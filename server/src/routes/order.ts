import { RequestHandler, Router } from 'express'

import { zodValidate } from '../utils/zodValidate'
import { PrismaClient } from '@prisma/client'
import { prismaCreate, prismaDelete, prismaFindMany, prismaFindUnique, prismaUpdate } from '../utils/factoriesRoute'

import { zodOrderCreate, zodOrderUpdate } from '../zodSchemas/zodOrder'

const prisma = new PrismaClient()
const model = prisma.order

const route = Router()

route.post('/',
    zodValidate(zodOrderCreate),
    handleOrder("create"))

route.get('/',
    prismaFindMany(model, { 
        products: { 
            include: { 
                product: { 
                    select: { name: true } 
                } 
            } 
        }, status: true }))

route.get('/:id',
    prismaFindUnique(model, { 
        products: { 
            include: { 
                product: { 
                    select: { name: true } 
                } 
            } 
        }, status: true }))

route.put('/:id',
    zodValidate(zodOrderUpdate),
    handleOrder("update"))

route.delete('/:id',
    prismaDelete(model))

function handleOrder(operation: "create" | "update"): RequestHandler {
    const isCreate = operation === "create";
    return async (req, res) => {
        try {
            const data = req.body;
            const id = isCreate ? undefined : Number(req.params.id);

            processConnectData(data, isCreate, id);
            if (!isCreate) processDisconnectData(data, id as number);

            delete data["$connect"];
            delete data["$disconnect"];

            const response = isCreate
                ? await model.create({ data })
                : await model.update({
                    where: { id: id! },
                    data
                });

            res.status(isCreate ? 201 : 200).json({
                "detail": isCreate ? "Created successfully" : "Updated successfully"
            });

        } catch (err: any) {
            if (!isCreate && err.code === 'P2025') {
                res.status(400).json({
                    "detail": "Entry not found!"
                });
            } else {
                console.error(err);
                res.status(500).json({ ...err });
            }
        }
    };
}

function processConnectData(data: any, isCreate: boolean, id?: number) {
    if (data["$connect"]) {
        const products = data["$connect"]["products"];
        if (products && Array.isArray(products)) {
            data["products"] = isCreate
                ? { // Create
                    create: products.map((product: { productId: number, quantity: number, observations?: string }) => ({
                        productId: product.productId,
                        quantity: product.quantity,
                        observations: product.observations || null
                    }))
                }
                : { // Update
                    upsert: products.map((product: { productId: number, quantity: number, observations?: string }) => ({
                        where: {
                            productId_orderId: {
                                productId: product.productId,
                                orderId: id!
                            }
                        },
                        create: {
                            productId: product.productId,
                            quantity: product.quantity,
                            observations: product.observations || null
                        },
                        update: {
                            quantity: product.quantity,
                            observations: product.observations || null
                        }
                    }))
                };
        }
    }
}

function processDisconnectData(data: any, id: number) {
    if (data["$disconnect"]) {
        const products = data["$disconnect"]["products"];
        if (products && Array.isArray(products)) {
            data["products"] = {
                deleteMany: products.map((productId: number) => ({
                    productId,
                    orderId: id
                }))
            };
        }
    }
}

export default route
