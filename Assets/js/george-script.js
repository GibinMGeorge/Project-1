// api key
const APIKey = '13c389678aa941079e53352da0c7ae3a';

// Load saved cities from local storage
var savedRecipe = JSON.parse(localStorage.getItem('savedRecipe')) || [];
displayLastSearch();


// link html using jquery
//search-input
const searchInput = $('#search-input');
//search-btn
const searchBtn = $('#search-btn');
searchBtn.click(() => {
    validateInput();
    const lastRecipe = searchInput.val()
    saveRecipe(lastRecipe);
    displayCards();
})
//recipe-results
const recipeResults = $('#recipe-results');

//modal-search
const modalSearch = $('#modal-search');

//modal-search-bg
const modalSearchBg = $('#modal-search-bg');

// function to fetch the api data on click
function displayCards() {
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchInput.val()}&number=6&apiKey=${APIKey}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data)
            recipeResults.html('');
            data.forEach(recipe => {
                const recipeCard = $('<div>')
                    .addClass('card column is-4 mx-3 my-3 has-text-centered container')

                const recipeTitle = $('<h6>')
                    .addClass('title has-text-centered pt-3')
                    .html(`<p>${recipe.title}</p>`);
                recipeCard.append(recipeTitle);

                const recipeFigure = $('<figure>')
                    .addClass('image is-centered')
                const recipeImage = $('<img>')
                    .attr('src', recipe.image)
                recipeFigure.append(recipeImage)
                recipeCard.append(recipeFigure);

                const seeMoreBtn = $('<button>')
                    .addClass('button is-info see-more-btn mt-3 mb-3')
                    .attr('recipe-id', recipe.id)
                seeMoreBtn.text('See more')
                    .click(() => {
                        recipeDetails(recipe.id);
                    })
                recipeCard.append(seeMoreBtn);

                recipeResults.append(recipeCard);
            });
        })
}
//validate the text on the search input
function validateInput() {
    if (!searchInput.val()) {
        modalSearch.addClass('is-active')   //create a modal if search-input false 
    }
    modalSearchBg.click(() => {
        modalSearch.removeClass('is-active')  //close modal
    })
}

function saveRecipe(lastRecipe) {

    savedRecipe = savedRecipe.filter(savedRecipe => savedRecipe !== lastRecipe);

    savedRecipe.unshift(lastRecipe);

    if (savedRecipe.length > 5) {
        savedRecipe.pop();
    }

    localStorage.setItem('savedRecipe', JSON.stringify(savedRecipe));

    displayLastSearch();
}

function displayLastSearch() {
    const ul = $('#ul');

    ul.html('');

    savedRecipe.forEach((lastRecipe) => {
        const lastSearch = $('<li>').text(lastRecipe);
        lastSearch.click(() => {
            searchInput.val(lastRecipe);
            displayCards();
        })
        ul.append(lastSearch);

    })

}


// Function to get recipe instructions and nutritional information

function recipeDetails(recipeId) {
    const modalContent = $('#modal-content')
    .html('');
    const modalInstructions = $('#modal-instructions')
    .addClass('is-active');
    const modalInstructionsBg = $('#modal-instructions-bg')
    .click(() => {
        modalInstructions.removeClass('is-active')
    })

    fetch(`https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=${APIKey}`)
        .then((response) => {
            return response.json();
        })
        .then((nutritionData) => {
            // include info in the modal
            console.log(nutritionData);
            
            const nutriInfo = $('<h4>')
            .text('Nutritional Info')
            .addClass('has-text-centered mx-3 my-3');

            modalContent.append(nutriInfo);
            const caloriesText = $('<h6>')
            .html(`<p>Calories: ${nutritionData.calories}</p>`);
            modalContent.append(caloriesText);

            const proteinText = $('<h6>')
            .html(`<p>Protein: ${nutritionData.protein}</p>`);
            modalContent.append(proteinText);

            const fatText = $('<h6>')
            .html(`<p>Fat: ${nutritionData.fat}</p>`)
            modalContent.append(fatText);
            
            const carboText = $('<h6>')
            .html(`<p>Carbohydrates: ${nutritionData.carbs}</p>`)
            modalContent.append(carboText);
        })

        fetch(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${APIKey}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            // Display recipe instructions
            console.log(data);
            const howToDoIt = $('<h4>')
            .text('How to do it')
            .addClass('has-text-centered mx-3 my-3');
            modalContent.append(howToDoIt);

            const ol = $('<ol>');
            data.forEach(recipe => {
                if(Array.isArray(recipe.steps)) {
                    recipe.steps.forEach(step => {
                        const li = $('<li>').text(step.step);
                        ol.append(li);
                    });
                }
            })
            
            modalContent.append(ol);
        })
}

 