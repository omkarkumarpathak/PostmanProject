const express=require('express')
const app=express();

const { MikroORM } = require('@mikro-orm/core');
const config = require('./mikro-orm.config.js');
const { RequestLog } = require('./entities/RequestLog');


let orm;

(async()=>{
    orm=await MikroORM.init(config);
    await orm.getSchemaGenerator().updateSchema();
})()

app.post('/saveLogs',async(req,res)=>{
    const em=orm.em.fork();
    const log=em.create('RequestLog',req.body);
    await em.persistAndFlush(log);
    res.json(log);
})

//getting the logs api

app.get('/getLogs', async (req, res) => {
  const em = orm.em.fork();   
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const [logs, count] = await em.findAndCount('RequestLog', {}, { 
    limit, 
    offset: (page - 1) * limit,
    orderBy: { createdAt: 'DESC' }
  });
  res.json({ data: logs, total: count, page });
});


app.listen(4000,(req,res)=>{
    console.log(`server is running om port: ${4000} `)
})

