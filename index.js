import dotenv from 'dotenv';
dotenv.config();
import express from "express";
// eslint-disable-next-line no-unused-vars
import DB from './src/lib/config.db.js';
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;
import logger from 'morgan';
const app = express();
import CategoryRouter from './src/routes/category.routes.js';
import UserRouter from './src/routes/user.routes.js';
import PostRouter from './src/routes/post.routes.js';
import UserPermissionRouter from './src/routes/user.permission.routes.js';
import redis from './src/helpers/redis.js';

app.use(express.json());
app.use(logger('dev'));


redis.connect();

app.get('/api', (req,res) => {
    res.status(200).json({message: "Welcome to blog api"});
})

app.use('/api', UserPermissionRouter);
app.use('/api', UserRouter);
app.use('/api', CategoryRouter);
app.use('/api', PostRouter);


app.listen(PORT, () => console.log("App running PORT: "+PORT));

export default app;