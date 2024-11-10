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
    orderCreate())

route.get('/',
    prismaFindMany(model, { products: true }))

route.get('/:id',
    prismaFindUnique(model, { products: true }))

route.put('/:id',
    zodValidate(zodOrderUpdate),
    orderUpdate())

route.delete('/:id',
    prismaDelete(model))

function orderCreate(): RequestHandler {
    return async (req, res) => {
        try {
            const data = req.body;

            if (data["$connect"]) {
                const products = data["$connect"]["products"];
                
                if (products && Array.isArray(products)) {
                    data["products"] = {
                        create: products.map((product: { productId: number, quantity: number, observations?: string }) => ({
                            productId: product.productId,
                            quantity: product.quantity,
                            observations: product.observations || null
                        }))
                    };
                }
            }

            delete data["$connect"];

            const response = await model.create({ data });

            res.status(201).json({
                "detail": "Created successfully"
            });

        } catch (err: any) {
            console.error(err);
            res.status(500).json({ ...err });
        }
    }
}

function orderUpdate(): RequestHandler {
    return async (req, res) => {
        try {
            const data = req.body
            const id = Number(req.params.id)

            if (data["$connect"]) {
                const products = data["$connect"]["products"]

                if (products && Array.isArray(products)) {
                    data["products"] = {
                        upsert: products.map((product: { productId: number, quantity: number, observations?: string }) => ({
                            where: {
                                productId_orderId: {
                                    productId: product.productId,
                                    orderId: id
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
                    }
                }
            }

            if (data["$disconnect"]) {
                const products = data["$disconnect"]["products"]
                if (products && Array.isArray(products)) {
                    data["products"].deleteMany = products.map((productId: number) => ({
                        productId,
                        orderId: id
                    }))
                }
            }

            delete data["$connect"]
            delete data["$disconnect"]

            const Update = model.update.bind(model)

            const response = await Update({
                where: { id },
                data
            })

            res.status(200).json({
                "detail": "Updated successfully"
            })

        } catch (err: any) {
            if (err.code === 'P2025') {
                res.status(400).json({
                    "detail": "Entry not found!"
                })
                return
            }

            console.error(err)
            res.status(500).json({ ...err })
        }
    }
}

export default route
