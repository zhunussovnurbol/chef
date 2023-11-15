const createForm = document.getElementById("createForm");
createForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const recipeName = document.getElementById("recipe_name").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;
    const authorName = document.getElementById("author_name").value;
    try {
        const response = await fetch("/newrecipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ recipeName: recipeName, ingredients: ingredients, instructions: instructions, authorName: authorName }),
        });
        if (response.ok) {
            console.log(`Recipe added successfully`);
            window.location.href = "/recipes";
        } else {
            console.error("Error adding recipe:", await response.text());
        }
    } catch (error) {
        console.error("Error: ", error);
    }
});