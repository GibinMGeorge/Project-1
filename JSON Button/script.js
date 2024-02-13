// Function to search for recipes based on ingredients
function searchRecipes() {
    const ingredients = document.getElementById('ingredient-input').value.trim();
    const recipeResults = document.getElementById('recipe-results');

    // Clear previous results
    recipeResults.innerHTML = '';

    // Validate ingredient input
    if (!ingredients) {
        alert('Please enter ingredients.');
        return;
    }

    // Make API call to retrieve recipes based on ingredients using Recipe API
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=44fabab8576843c3ab1aae250e0ebc39`)
    .then(response => response.json())
    .then(data => {
        if (!data || data.length === 0) {
            recipeResults.innerHTML = '<p>No recipes found.</p>';
            return;
        }

        // Display recipe results
        data.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');

            const recipeTitle = document.createElement('h3');
            recipeTitle.textContent = recipe.title;

            const recipeImage = document.createElement('img');
            recipeImage.src = recipe.image;
            recipeImage.alt = recipe.title;

            recipeCard.appendChild(recipeTitle);
            recipeCard.appendChild(recipeImage);

            recipeResults.appendChild(recipeCard);

            // Event listener to get recipe instructions and nutritional information when recipe is clicked
            recipeCard.addEventListener('click', () => {
                getRecipeInstructions(recipe.id);
                getNutritionalInfo(recipe.title);
            });
        });
    })
    .catch(error => {
        console.error('Error fetching recipes:', error);
    });
}

// Function to get recipe instructions
function getRecipeInstructions(recipeId) {
    const instructionResults = document.getElementById('instruction-results');

    // Make API call to retrieve recipe instructions using Recipe API
    fetch(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=44fabab8576843c3ab1aae250e0ebc39`)
    .then(response => response.json())
    .then(data => {
        // Display recipe instructions
        instructionResults.innerHTML = `
            <h2>Recipe Instructions</h2>
            <ol>
                ${data[0].steps.map(step => `<li>${step.step}</li>`).join('')}
            </ol>
        `;
    })
    .catch(error => {
        console.error('Error fetching recipe instructions:', error);
    });
}