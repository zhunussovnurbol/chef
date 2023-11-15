const recipeId = window.location.pathname.split("/").pop();
fetch(`/data/${recipeId}`)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            const recipe = data[0];
            document.getElementById('recipeName').textContent = recipe.recipe_name;

            const ingredientsList = document.getElementById("ingredients");
            ingredientsList.innerHTML = "";
            const ingredientsArray = recipe.ingredients.split('\n');
            ingredientsArray.forEach(ingredient => {
                const li = document.createElement("li");
                li.textContent = ingredient;
                ingredientsList.appendChild(li);
            })

            const instructions = document.getElementById('instructions')
            instructions.innerHTML = '';
            const instructionsArray = recipe.instructions.split('\n');
            instructionsArray.forEach(ingredient => {
                const li = document.createElement("li");
                li.textContent = ingredient;
                instructions.appendChild(li);
            })
        } else {
            console.error('Recipe not found');
        }
    })
    .catch(error => console.error(error));