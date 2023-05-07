
const express = require("express");
const router = express.Router();
const ToDoItem = require("../models/ToDoItem");
const User = require("../models/User");
const axios = require("axios");

const tingweiPrompt = "Enter a a famous person that you would like to know more about: ";

const tingweiGPTPrompt =
  "Give me an overview of this person, similar to wikipedia introduction: \n";


isLoggedIn = (req, res, next) => {
  if (res.locals.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};


class GPT {
  constructor() {
  }

  async getResponse(prompt) {
    const response = await axios.post(
      "http://gracehopper.cs-i.brandeis.edu:3500/openai",
      { prompt: prompt }
    );

    return response.data.choices[0].message.content;
  }
}

const gpt = new GPT();


//prompt
router.get("/gpt", isLoggedIn, async (req, res, next) => {
  const prompt = req.query.prompt;
  if (prompt == "tingwei") {
    res.render("gpt", { prompt: tingweiPrompt });
  
  } else {
  }
  res.render("gpt", { prompt });
});


//post
router.post("/gpt", 
    isLoggedIn, 
      async (req, res, next) => {

  const prompt = req.body.prompt;
  const input = req.body.input;
  response = undefined;
  console.log(prompt + " " + input);

  if (prompt == tingweiPrompt) {
    response = await gpt.getResponse(tingweiGPTPrompt + input);
  
  } else {
  }
  res.render("gpt", { prompt, input, response });
});

module.exports = router;
