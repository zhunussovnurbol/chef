"use strict";

// Search bar functionality
const searchBar = document.getElementById("search-bar");
const search = document.querySelector(".search");
const searchResults = document.querySelector(".search-results");

searchBar.addEventListener("input", () => {
    const inputValue = searchBar.value.trim().toLowerCase();
    searchResults.innerHTML = "";
    if (inputValue !== "") {
        fetch("/allrecipes")
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(element => element.recipe_name.toLowerCase().includes(inputValue));
                if (filteredData.length > 0) {
                    searchResults.classList.remove("invisible");
                    filteredData.forEach(element => {
                        searchResults.classList.remove("invisible");
                        const a = document.createElement("a");
                        a.classList.add("search-item");
                        a.textContent = element.recipe_name;
                        a.setAttribute("href", `/recipes/${element.recipe_id}`);
                        searchResults.appendChild(a);
                    });
                } else {
                    searchResults.classList.add("invisible");
                }
            });
    } else {
        searchResults.classList.add("invisible");
    }
});

