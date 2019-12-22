const express = require("express");
const app = express();
const request = require("request");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("search");
})

app.get("/results", (req, res) => {
    const search = req.query.search;
    // Make API call to OMDb using <search>
    request("http://www.omdbapi.com/?apikey=thewdb&s="+search, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const parsedData = JSON.parse(body);
            res.render("results", {data : parsedData});
        }
    })
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Movie app has begun!");
});