const express = require('express')
const path =require('path')
const fs = require('fs')
// const main = require('./public')
// const db = require('./db')

const app = express()

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
    console.log(notes) 
    notes.push(cro.body)
    console.log(notes) 
    fs.writeFile(data,JSON.stringify(notes),'utf8',()=>{
        console.log('write')
    })
    
})
console.log(hi) 
    // data.push(cro.body)
    // fs.writeFile(data)
    //     console.log('data')

})
app.listen(3335, ( ) => console.log('started'))