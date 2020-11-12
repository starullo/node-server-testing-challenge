const server = require('./server');
require('dotenv').config();

const PORT = process.env.PORT || 4444;

server.listen(PORT, (req, res, next)=>{
    console.log('all good on port ' + PORT)
})