import { Router } from 'express'

import productRouter from './product'
import categoryRouter from './category'
import orderRouter from './order'
import statusRouter from './status'

const router = Router()

router.use('/product', productRouter);
router.use('/category', categoryRouter);
router.use('/order', orderRouter);
router.use('/status', statusRouter);

export { router }