const express = require('express');
const app = express();
const userRouter = require('./users/usersRouter');

app.use(express.json());
app.use('/users', userRouter);


app.get('/test', (req, res, next)=>{
    res.json({message: 'affirmative'})
})

app.get('/', (req, res, next)=>{
    res.json({message: 'wow'});
})


module.exports = app;