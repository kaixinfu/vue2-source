const express = require('express')
const app = express();

app.get('/',function(req,res){
  res.send(`
        <html>
            <body>
                <div id="app">
                    <h1>呃呃呃呃呃呃</h1>
                    <p class="demo">哒哒哒哒哒哒</p>
                </div>
            </body>
        </html> 
    `)
})

app.listen(3001, ()=>{
  // eslint-disable-next-line no-console
  console.log('3001启动成功')
})
