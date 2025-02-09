import express from 'express';
import dotenv from 'dotenv';
import './config/db.js'
import {createRoles} from './libs/initialSetup'
import morgan from 'morgan';
import cors from 'cors'

//routes
import authRoutes from './routes/auth.routes.js';
import recetasRoutes from'./routes/recetas.routes.js'

dotenv.config();

const app = express();
createRoles();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors())

var path = require('path')

app.use('/public', express.static(path.join(__dirname, 'storage/imgs')))
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req,res)=> {
  res.json({
      name: 'recetiva',
      version: '0.0.1'
  })
})

app.use('/api/auth', authRoutes);
app.use('/api/recetas', recetasRoutes);