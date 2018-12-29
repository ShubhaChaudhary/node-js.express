const express= require('express')
const fs=require('fs')
const app= express()
const hbs=require('hbs')
const port = process.env.PORT || 3000

app.use(express.static(__dirname +'/public'))
app.set('view engine','hbs')
hbs.registerPartials(__dirname +'/views/partials')
hbs.registerPartials(__dirname +'/views/header')
hbs.registerHelper('getdate',()=>{
    return new Date().getFullYear() 
})
hbs.registerHelper('capital',(text)=>{
    return text.toUpperCase()
})
app.use((req,res,next)=>{
    let time= new Date().toString()
    let serverinfo=`${time} ${req.method} ${req.url}`
    console.log(serverinfo)
     fs.appendFileSync('server.log',serverinfo+ '\n')
    next()
})
// app.use((req,res,next)=>{

//     res.render('maintance.hbs')

// })

app.get('/',(req,res)=>{
    res.render('home.hbs',{
    about: 'welcome to home page'
 })
 })
app.listen(port,()=>{
    console.log(`server is connected on ${port}`)
})

app.get('/page',(req,res)=>{
    res.send({
        name: 'web',
        body:'body of the web page',
        age: 78
    })
})
app.get('/details',(req,res)=>{
    res.render('details.hbs',{
       about: 'welcome to details page'
    })
})
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        // date:  new Date().getFullYear(),
        about: 'welcome to about page'
    })
})