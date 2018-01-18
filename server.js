const express = require('express');
const app = express();

app.get('/', (req,res) => {
  res.send('Hello world!')
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server is up on port: " + PORT);
})