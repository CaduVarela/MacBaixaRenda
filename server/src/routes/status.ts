import { Router } from 'express'

import { zodValidate } from '../utils/zodValidate'
import { PrismaClient } from '@prisma/client'
import { prismaCreate, prismaDelete, prismaFindMany, prismaFindUnique, prismaUpdate } from '../utils/factoriesRoute'

import { zodStatusCreate, zodStatusUpdate } from '../zodSchemas/zodStatus'

const prisma = new PrismaClient()
const model = prisma.status

const route = Router()

route.post('/',
    zodValidate(zodStatusCreate),
    prismaCreate(model))

route.get('/',
    prismaFindMany(model))

route.get('/:id',
    prismaFindUnique(model))

route.put('/:id',
    zodValidate(zodStatusUpdate),
    prismaUpdate(model))

route.delete('/:id',
    prismaDelete(model))

export default route
