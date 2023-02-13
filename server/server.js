require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;


//Routes


app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})