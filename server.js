require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const path = require("path");
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})


app.get("/allrecipes", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM recipes");
        res.json(result.rows);
    } catch (error) {
        console.error(`Error executing query`, error);
        res.status(500).send("Internal Server Error");
    }
})

app.post("/newrecipe", async (req, res) => {
    try {
        const { recipeName, ingredients, instructions, authorName } = req.body;
        if (recipeName && ingredients && instructions && authorName) {
            await pool.query(
                "INSERT INTO recipes (recipe_name, ingredients, instructions, author_name) VALUES ($1, $2, $3, $4)",
                [recipeName, ingredients, instructions, authorName]
            );
            res.status(201).json({ success: true, message: "Recipe added successfully" });
        } else {
            res.status(400).json({ success: false, message: "All field are required" });
        }
    } catch (error) {
        console.error(`Error executing query`, error);
        res.status(500).send("Internal Server Error");
    }

})

app.get("/recipes/:recipe_id", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'recipe.html'));
})


app.get("/data/:recipe_id", async (req, res) => {

    const recipeId = req.params.recipe_id;
    try {
        const result = await pool.query("SELECT * FROM recipes WHERE recipe_id = $1", [recipeId]);
        if (result.rows.length > 0) {
            res.send(result.rows)
        } else {
            res.status(400).json({ succes: false, message: "This ID doesn't exist in database" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, "public", 'create.html'));
})

app.get("/recipes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "recipes.html"));
});

app.get("/advice", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "advice.html"));
});













app.listen(PORT, () => {
    console.log(`Server is working on localhost:${PORT}`);
})
