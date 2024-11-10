import { Router } from 'express'

import { zodValidate } from '../utils/zodValidate'
import { PrismaClient } from '@prisma/client'
import { prismaCreate, prismaDelete, prismaFindMany, prismaFindUnique, prismaUpdate } from '../utils/factoriesRoute'

import { zodCategoryCreate, zodCategoryUpdate } from '../zodSchemas/zodCategory'

const prisma = new PrismaClient()
const model = prisma.category

const route = Router()

route.post('/',
    zodValidate(zodCategoryCreate),
    prismaCreate(model))

route.get('/',
    prismaFindMany(model))

route.get('/:id',
    prismaFindUnique(model))

route.put('/:id',
    zodValidate(zodCategoryUpdate),
    prismaUpdate(model))

route.delete('/:id',
    prismaDelete(model))

export default route
