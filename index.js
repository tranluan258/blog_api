require("dotenv").config();
const express = require("express");
// eslint-disable-next-line no-unused-vars
const DB = require("./src/lib/config.db");
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;
const logger = require('morgan');
const app = express();
const CategoryRouter = require('./src/routes/category.routes');
const UserRouter = require('./src/routes/user.routes');
const PostRouter = require('./src/routes/post.routes');
 

app.use(express.json());
app.use(logger('dev'));


app.get('/api', (req,res) => {
    res.status(200).json({message: "Welcome to blog api"});
})

app.use('/api', UserRouter);
app.use('/api', CategoryRouter);
app.use('/api', PostRouter);


app.listen(PORT, () => console.log("App running PORT: "+PORT));



