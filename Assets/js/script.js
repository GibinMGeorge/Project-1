const seeMoreBtns = document.querySelectorAll('.see-more-btn');
const modalBg = document.querySelector('.modal-background');
const modal = document.querySelector('.modal');
const instructionResults = document.querySelector('.modal-content');

seeMoreBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Get the recipe ID from the clicked button's dataset
    const recipeId = btn.dataset.recipeId;
    // Call the function to get recipe instructions
    getRecipeInstructions(recipeId);
    // Display the modal
    modal.classList.add('is-active');
  });
});

modalBg.addEventListener('click', () => {
  modal.classList.remove('is-active');
});

// Function to get recipe instructions
function getRecipeInstructions(recipeId) {
    // Make API call to retrieve recipe instructions using Recipe API
    fetch(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=de1acafedb0a4a1198f8090c07677726`)
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
