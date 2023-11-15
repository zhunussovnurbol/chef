"use sctrict";
const recipesList = document.querySelector(".recipes-list");

function showList() {
    fetch("/allrecipes")
        .then(response => response.json())
        .then(data => data.reverse().forEach(element => {
            const li = document.createElement("li");
            li.classList.add("recipes-item");
            li.textContent = element.recipe_name;
            li.addEventListener("click", () => {
                window.location.href = `/recipes/${element.recipe_id}`;
            })
            recipesList.appendChild(li);
        }));
}
showList();
