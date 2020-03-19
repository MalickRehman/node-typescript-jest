const http =require('http');
const app = require('./index.ts')
const port = process.env.PORT ||4000

const server =http.createServer(app);

app.listen(4000, () => {
        console.log('server started');
      })

      module.exports = server