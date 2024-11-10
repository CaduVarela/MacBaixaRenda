import { RequestHandler, Router } from 'express'

import { zodValidate } from '../utils/zodValidate'
import { PrismaClient } from '@prisma/client'
import { prismaCreate, prismaDelete, prismaFindMany, prismaFindUnique, prismaUpdate } from '../utils/factoriesRoute'

import { zodProductCreate, zodProductUpdate } from '../zodSchemas/zodProduct'

const prisma = new PrismaClient()
const model = prisma.product

const route = Router()

route.post('/',
  zodValidate(zodProductCreate),
  prismaCreate(model))

route.get('/',
  prismaFindMany(model, { category: true }))

route.get('/:id',
  prismaFindUnique(model, { category: true }))

route.put('/:id',
  zodValidate(zodProductUpdate),
  prismaUpdate(model))

route.delete('/:id',
  prismaDelete(model))

export default route
