const path  = require('path');
const express = require('express');

const app = express();
const initialPath = path.join(__dirname,'..');

app.use(express.static(initialPath + '/public'))

app.listen(3000,()=>
{
  console.log('Server is up and running at 3000');
});
