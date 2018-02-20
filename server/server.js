const path  = require('path');
const express = require('express');
const port = process.env.PORT || 3000;

const app = express();
const initialPath = path.join(__dirname,'..');

app.use(express.static(initialPath + '/public'))

app.listen(port,()=>
{
  console.log(`Server is up and running at ${port}`);
});
