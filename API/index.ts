import dotenv from 'dotenv';
import express from 'express';
import userRouter from './src/routes/userRouter';
import profilRouter from './src/routes/profilRouter';

dotenv.config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});
  
app.get("/", (req, res) => {
res.status(200).json({
    status: "success",
    message: "Hello from the express server",
});
});

app.use('/users', userRouter);
app.use('/profils', profilRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})