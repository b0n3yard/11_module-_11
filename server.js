const express = require('express')
const path =require('path')
const fs = require('fs')
// const main = require('./public')
// const db = require('./db')
const app = express()
const PORT = process.env.PORT || 3335

app.use(express.static('./db'))
app.use(express.static('./public'))

app.use(express.json())

app.get('/',(cro,sro) =>{


})
app.get('/notes', (cro,sro) =>{

    const notes = path.join(__dirname,'public/notes.html')
    sro.sendFile(notes)
    // const data = db
    // const obj = db.find((fobj) =>{
    //     console.log(fobj)
    // })

    // sro.send(obj || {message:'not found'})
})
app.get('/api/notes',(cro,sro) =>{
    const data = path.join(__dirname,'db/db.json')
    sro.sendFile(data)

})
app.post('/api/notes',(cro,sro) =>{
    const data = path.join(__dirname,'db/db.json')
    // fs.writeFile(data,'[]','utf8', ()=>{
    //     console.log('write')
    // })
    const hi = fs.readFile(data, 'utf8',(err,json)=>{
        console.log('hi')
        console.log(data)
       
   
    const notes =JSON.parse(json)
    let count = 1
    // console.log(notes) 
    // console.log(notes.length)
    notes.push(cro.body)
    notes.forEach(note => {
        note.id = count
        count += 1
    });
    // cro.body.id = notes.length 
    // console.log('cro.body', cro.body.id)
    // console.log(notes) 
    fs.writeFile(data,JSON.stringify(notes),'utf8',()=>{
        console.log('write')
    })
    sro.json({
        message: "update success"
      })
    
})
console.log(hi) 
    // data.push(cro.body)
    // fs.writeFile(data)
    //     console.log('data')

})
app.delete('/api/notes/:id',(cro,sro) =>{
    const data = path.join(__dirname,'db/db.json')
    const hi = fs.readFile(data, 'utf8',(err,json)=>{
        console.log('hi')
        console.log(data)
       
   
    const notes =JSON.parse(json)
    const ids = parseInt(cro.params.id)
    const obj = notes.findIndex(fobj => fobj.id == ids)
    console.log(obj) 
    if (obj !== -1){
        notes.splice(obj, 1)
    }
    fs.writeFile(data,JSON.stringify(notes),'utf8',()=>{
        console.log('write')
    })
    sro.json({
        message: "delete success"
      })
    // sro.send( obj || {message: "not found"})
    })
    // const notes = req.params.id
    // res.sendstatus(204)
})
app.listen(PORT, ( ) => console.log('started'))