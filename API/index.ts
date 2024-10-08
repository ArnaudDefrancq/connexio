import dotenv from 'dotenv';
import express from 'express';
import userRouter from './src/routes/userRouter';
import profilRouter from './src/routes/profilRouter';
import postRouter from './src/routes/postRouter';
import commentaireRouter from './src/routes/commentaireRouter';
import postLikeRouter from './src/routes/postLikeRouter';
import commentaireLikeRouter from './src/routes/commentaireLikeRouter';
import amitieRouter from './src/routes/amitieRouter';
import path = require('path');

dotenv.config();

const app = express();

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

app.use(express.json());
  
app.get("/", (req, res) => {
res.status(200).json({
    status: "success",
    message: "Hello from the express server",
});
});

app.use('/users', userRouter);
app.use('/profils', profilRouter);
app.use('/posts', postRouter);
app.use('/commentaires', commentaireRouter);
app.use('/posts-like', postLikeRouter);
app.use('/commentaires-like', commentaireLikeRouter);
app.use('/amities', amitieRouter);

app.use('/imgPost', express.static(path.join(__dirname, './src/img//imgPost')));
app.use('/imgProfil', express.static(path.join(__dirname, './src/img/imgProfil')));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})