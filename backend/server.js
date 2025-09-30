import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors';

import userRegister from './routes/userRegister.js';
import getNutrition  from "./utils/Gemin-AI.js"
import userLogin from './routes/userLogin.js'
import profileSetup from './routes/profileSetup.js'
import homeSetup from "./routes/homeSetup.js" 
import { scheduleDailyReset } from './utils/dailyReset.js'

const app = express();


// Middleware
app.use(cors({
    origin: 'http://localhost:5173',  // frontend origin
    credentials: true                 // allow cookies/auth headers
  }));
app.use(express.json()); // <-- this parses JSON bodies


app.use(express.json());
app.post('/register', userRegister);
app.post('/login', userLogin);
app.post("/gemini" , getNutrition )
app.post("/profile-setup/:userId" , profileSetup)
app.post("/homeSetup" , homeSetup)





mongoose.connect('mongodb://localhost:27017/gym-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    scheduleDailyReset();
}).catch((err) => {
    console.log(err);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});










