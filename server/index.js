import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

// CONFIGURATION

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}));
app.use(cors());


// ROUTES
app.use("/client",clientRoutes);
app.use("/general",generalRoutes);
app.use("/mangement",managementRoutes);
app.use("/sales",salesRoutes);


// MONGOOSE SETUP
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT,()=>console.log(`server is running on ${PORT}`))
}).catch((error)=>console.log(`${error} did not connect`))
 