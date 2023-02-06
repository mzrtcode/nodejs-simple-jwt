import express from 'express'
import authController from './controllers/authController.js'
const app = express()


app.use(express.json()); // Para que nuestro server entienda los json que le enviemos
app.use(express.urlencoded({extended:false})) // Entender datos de un formulario y convertirlo en un objeto de javascript
app.use(authController)
export default app;