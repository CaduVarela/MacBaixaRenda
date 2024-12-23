import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
const prisma = new PrismaClient()

export function prismaCreate(model: any): RequestHandler {
    return async (req, res) => {
        try {
            const data = req.body

            if (data["$connect"]) {
                Object.entries(data["$connect"]).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        data[key] = {
                            connect: value.map((id) => ({ id }))
                        }
                    } else {
                        data[key] = {
                            connect: { id: value }
                        }
                    }
                })
            }

            delete data["$connect"]

            const Create = model.create.bind(model)

            const response = await Create({ data })
            res.status(200).json({
                "detail": "Registered successfully"
            })

        } catch (err: any) {

            console.error(err)
            res.status(400).json({ ...err })
        }
    }
}

export function prismaUpdate(model: any): RequestHandler {
    return async (req, res) => {
        try {
            const data = req.body
            const id = Number(req.params.id)

            if (data["$connect"]) {
                Object.entries(data["$connect"]).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        data[key] = {
                            connect: value.map((id) => ({ id }))
                        }
                    } else {
                        data[key] = {
                            connect: { id: value }
                        }
                    }
                })
            }

            if (data["$disconnect"]) {
                Object.entries(data["$disconnect"]).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        data[key] = {
                            ...data[key],
                            disconnect: value.map((id) => ({ id }))
                        }
                    } else {
                        data[key] = {
                            ...data[key],
                            disconnect: { id: value }
                        }
                    }
                })
            }

            delete data["$connect"]
            delete data["$disconnect"]

            const Update = model.update.bind(model)

            const response = await Update(
                {
                    where: { id },
                    data
                }
            )

            res.status(200).json({
                "detail": "Updated successfully",
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

export function prismaFindUnique(model: any, prismaIncludeConfig?: Object): RequestHandler {
    return async (req, res) => {
        try {
            const id = Number(req.params.id)

            const FindOne = model.findUnique.bind(model)

            const response = await FindOne(
                {
                    where: { id },
                    include: prismaIncludeConfig
                }
            )

            if (response === null)
                throw new Error('P2025')

            res.status(200).json(response)

        } catch (err: any) {

            if (err.code === 'P2025' || err.message === 'P2025') {
                res.status(400).json({
                    "detail": "Entry not found!"
                })
                return
            }

            console.error(err)
            res.status(400).json({ ...err })
        }
    }
}

export function prismaFindMany(model: any, prismaIncludeConfig?: Object): RequestHandler {
    return async (req, res) => {
        try {
            const page = Number(req.query.page) || 0;
            const take = Number(req.query.take) || 25;

            const filters: any = req.query.filters ? JSON.parse(req.query.filters as string) : {};
            const orderBy = req.query.orderBy ? JSON.parse(req.query.orderBy as string) : undefined;

            const FindMany = model.findMany.bind(model);
            const Count = model.count.bind(model);

            const [data, count] = await prisma.$transaction([
                FindMany({
                    where: {
                        ...filters
                    },
                    include: {
                        ...prismaIncludeConfig
                    },
                    skip: page > 0 ? (page * take) : 0,
                    take: take,
                    orderBy: orderBy
                }),
                Count({
                    where: {
                        ...filters
                    }
                })
            ]);

            res.status(200).json({
                pagination: {
                    count,
                    page,
                    take
                },
                data
            });

        } catch (err: any) {
            if (err.code === 'P2025') {
                res.status(400).json({
                    "detail": "Entry not found!"
                });
                return;
            }

            console.error(err);
            res.status(400).json({ ...err });
        }
    }
}

export function prismaDelete(model: any): RequestHandler {
    return async (req, res) => {
        try {
            const id = Number(req.params.id)

            const Delete = model.delete.bind(model)

            const response = await Delete({ where: { id } })

            res.status(200).json({
                "detail": "Deleted successfully",
            })

        } catch (err: any) {

            if (err.code === 'P2025') {
                res.status(400).json({
                    "detail": "Entry not found!"
                })
                return
            }

            console.error(err)
            res.status(400).json({ ...err })
        }
    }
}