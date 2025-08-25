const  urlanalysisController= require('./urlanalysisController');
const express = require('express');
const app =express();
const bodyparser = require('body-parser');
const cors =require('cors');
app.use(bodyparser.json());
app.use(cors());

app.use('/api',urlanalysisController);

const PORT =3002;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});