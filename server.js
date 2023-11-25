const express = require('express')
const app = express()
const path = require('path')

const PORT = process.env.PORT || 3500

//built -in middleware to handle urlencoded data 
//in other words, fomr data;
// content-type : application/x-ww-form-urlencoded

app.use(express.urlencoded({ extended: false }))


// buit-in middleware for json
app.use(express.json())

//server static file
app.use(express.static(path.join(__dirname, '/public')))
app.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname })
    res.sendFile(path.join(__dirname, 'views', 'index.html'))

})

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html')
})
//Route handler

// app.get('/hello(.html)?', (req, res, next) => {
//     console.log('attempted to load hello.html')
//     next()
// }, (req, res) => {
//     res.send('heloo world')
// })
const one = (req, res, next) => {
    console.log('one')
    next()
}
const two = (req, res, next) => {
    console.log('two')
    next()
}
const three = (req, res) => {
    console.log('three')
    res.send('hello welcome to third file')
}

app.get('/chain(.html)?', [one, two, three])


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
})
app.listen(PORT, () =>
    console.log(`Sever is running at ${PORT}`)
)