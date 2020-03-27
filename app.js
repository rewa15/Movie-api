const express = require("express");
const bodyParser = require("body-parser");
var unirest = require('unirest');
const ejs = require("ejs");

const app = express();
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res)
{
    res.sendFile(__dirname + "/index.html");
});

const arrayMovies=[];
const images=[];
const type=[];

app.post("/", function(req,res)
{
    const query= req.body.keyword;
    const Apikey = "e60a021e";   
    const url = "https://www.omdbapi.com/?apikey="+Apikey+"&s="+query;
    unirest.post(url)
    .header("X-RapidAPI-Key", Apikey)
    .end(function (result) 
    {
        for(let i=0;i<result.body.Search.length;i++)
        {
           arrayMovies.push(result.body.Search[i].Title);
           images.push(result.body.Search[i].Poster);
           type.push(result.body.Search[i].Type);
        }
        res.render("home.ejs",{arr1: arrayMovies, arr2: images, arr3:type});
    });   
});

app.listen(3000);
