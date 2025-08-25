const express = require('express');
const app =express();
const bodyparser = require('body-parser');
const cors =require('cors');
const urlshortController= require('./urlshortenController')
app.use(bodyparser.json());
app.use(cors());

app.use('/api',urlshortController);

const PORT =3001;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});