const userController = require('./userController');
const express = require('express');
const app =express();
const bodyparser = require('body-parser');
const cors =require('cors');
app.use(bodyparser.json());
app.use(cors());

app.use('/api',userController);

const PORT =3000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});