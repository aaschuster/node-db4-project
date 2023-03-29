const express = require("express");
const server = express();

server.use(express.json());

const Recipes = require("./model");

server.get("/api/recipes/:id", (req, res) => {
    Recipes.getRecipeById(req.params.id)
        .then( recipe => res.json(recipe))
        .catch( err => res.status(500).json({message: err.message}));
})

module.exports = server;