import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import { router } from './routes'

const PORT = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api', router)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))