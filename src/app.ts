/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import notFound from './app/middlewares/notFound'
import router from './app/routes'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

const app: Application = express()

//parsers
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// application routes
app.use('/api', router)
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(
    swaggerJsdoc({
      swaggerDefinition: {
        openapi: '3.0.0',
        info: {
          title: 'Turf Hub API Documentation',
          version: '1.0.0',
        },
        servers: [
          {
            url: 'http://localhost:5000/api',
          },
          {
            url: 'http://localhost:3000/api',
          },
        ],
      },
      apis: ['./src/app/modules/API-documentation/swagger.ts'],
    }),
  ),
)

const test = async (req: Request, res: Response) => {
  res.send(
    ' <div style=" height:100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; "><h1 style="border: 1px solid red; border-radius: 10px; padding: 10px; color: red;">Ki amake dekhe hotash naki? ami tomader restful api.</h1> <img src="https://media.tenor.com/sMTKcbAPZ8cAAAAj/sonic-run-away.gif" alt="gif" /> <small style="color: green;">Server Running...</small> </div> ',
  )
}

app.get('/', test)

app.use(globalErrorHandler)

//Not Found
app.use(notFound)

export default app
