//server.js serves up the code for other computer

var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var axios = require('axios')

var app = express()
//configuration (setup for our app)
app.set('view engine', 'ejs')
app.set(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', __dirname + '/public')

app.get('/', function(request, response){
    response.render('home.ejs')
})

app.post('/results', function(request, response){
    var bae = request.body.bae
    var github = request.body.github
    axios.get('https//api.github.com/users/' + github)
    .then(function(resp){
        return resp.data
    })
    .then(function(data){
        response.render('results.ejs', {
            myBoo: bae,
            myGithub: github,
            myData: data
        })
    })
    .catch( err => console.log(err))
})

var port = process.env.PORT || 8080

app.listen(port, function(){
//app.listen makes the computer wait and "listen"
    console.log('App is running on port' + port)
})
