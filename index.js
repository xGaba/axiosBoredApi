import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const {type, participants} = req.body;
    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`);
    const resultApi = response.data;
    res.render('index.ejs', { data : resultApi[Math.floor(Math.random()*resultApi.length)] });
  } catch (error){
    console.log(error)
    const errorMessage = 'No activities that match your criteria';
    res.render('index.ejs', {
      error : errorMessage
    })
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
