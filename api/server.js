const express = require("express");
const server = express();

server.use(express.json());

const Recipes = require("./model");

server.get("/api/recipes/:id", (req, res) => {
    Recipes.getRecipeById(req.params.id)
        .then( recipe => res.json(recipe))
        .catch( () => res.status(500).json({message: "There was an issue with the server"}));
})

module.exports = server;