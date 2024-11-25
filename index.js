import express from "express";
import axios from "axios";
import expressLayouts  from "express-ejs-layouts";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/Any";

app.use(express.static("public"));
app.use(expressLayouts);
app.set("layout", "layouts/main");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req,res) => { 
    res.render("index");

})

app.post("/show", async (req,res) => {
    const category = req.body.category || "any";
    try {
    const result = await axios.get(`${API_URL}/${category}`);
    const jokeData = result.data;

    if (jokeData.type == "twopart") {
        res.render("index", {
            setup: jokeData.setup,
            delivery: jokeData.delivery
        })
    }
    else if (jokeData.type == "single") {
        res.render("index", {
            setup: null,
            delivery: null,
            joke: jokeData.joke
        })
    }
    } catch (error) {
        console.log(error.response.data);
        res.status(500).send("Error fetching data");
    }
    
})

app.listen(port, () => { 
    console.log(`testing server in port ${port}`);
})