// main.js

// Here is where the recipes that you will fetch.
// Feel free to add your own here for part 2, if they are local files simply add their path as a string.
const recipes = [
  'https://introweb.tech/assets/json/ghostCookies.json',
  'https://introweb.tech/assets/json/birthdayCake.json',
  'https://introweb.tech/assets/json/chocolateChip.json',
  'assets/recipes/cornbread.json',
  'assets/recipes/pumpkinBread.json',
  'assets/recipes/meatball.json'
];

// Once all of the recipes that were specified above have been fetched, their
// data will be added to this object below. You may use whatever you like for the
// keys as long as it's unique, one suggestion might but the URL itself
const recipeData = {}

window.addEventListener('DOMContentLoaded', init);

// This is the first function to be called, so when you are tracing your code start here.
async function init() {
  // fetch the recipes and wait for them to load
  let fetchSuccessful = await fetchRecipes();
  // if they didn't successfully load, quit the function
  if (!fetchSuccessful) {
    console.log('Recipe fetch unsuccessful');
    return;
  };
  console.log(recipeData);
  console.log(Object.keys(recipeData));
  // Add the first three recipe cards to the page
  createRecipeCards();
  // Make the "Show more" button functional
  bindShowMore();
}

async function fetchRecipes() {
  return new Promise((resolve, reject) => {
    // This function is called for you up above
    // From this function, you are going to fetch each of the recipes in the 'recipes' array above.
    // Once you have that data, store it in the 'recipeData' object. You can use whatever you like
    // for the keys. Once everything in the array has been successfully fetched, call the resolve(true)
    // callback function to resolve this promise. If there's any error fetching any of the items, call
    // the reject(false) function.

    // For part 2 - note that you can fetch local files as well, so store any JSON files you'd like to fetch
    // in the recipes folder and fetch them from there. You'll need to add their paths to the recipes array.

    // Part 1 Expose - TODO

    // Loop through recipes
    for (let i = 0; i < recipes.length; i++) {
      // Use fetch API
      fetch(recipes[i])
        .then(response => response.json())
        .then(data => {
          // Store recipe data in recipeData object
          recipeData[recipes[i]] = data;
          
          // If the for loop is at its last iteration, then we have fetched all 
          // the data successfully, so resolve true
          if (i == recipes.length - 1) {
            resolve(true);
          }
        })
        .catch((error) => {
          // If an error occurs during the fetch, reject
          reject(false);
        });
    }
    
  });
}

function createRecipeCards() {
  // This function is called for you up above.
  // From within this function you can access the recipe data from the JSON 
  // files with the recipeData Object above. Make sure you only display the 
  // three recipes we give you, you'll use the bindShowMore() function to
  // show any others you've added when the user clicks on the "Show more" button.

  // Part 1 Expose - TODO

  let count = 0;

  // Loop through recipeData object
  for (const property in recipeData) {
    // Create <recipe-card>
    let newRecipe = document.createElement("recipe-card");

    // Get data into <recipe-card>
    newRecipe.data = recipeData[property];

    // Attach <recipe-card> to main
    document.querySelector('main').appendChild(newRecipe);
    
    count++;
    if (count == 3) {
      break;
    }
  }
}

function bindShowMore() {
  // This function is also called for you up above.
  // Use this to add the event listener to the "Show more" button, from within 
  // that listener you can then create recipe cards for the rest of the .json files
  // that were fetched. You should fetch every recipe in the beginning, whether you
  // display it or not, so you don't need to fetch them again. Simply access them
  // in the recipeData object where you stored them/

  // Part 2 Explore - TODO

  // Select the Show more button
  let show = document.querySelector("button");

  // Keeps track of whether the button currently says Show more or Show less
  let showStatus = false;

  // Do something when the button is clicked
  show.addEventListener('click', () => {

    // If the showStatus is false, it means the button currently says Show more,
    // so change it to Show less and update showStatus
    if (showStatus == false) {
      show.innerHTML = "Show less";
      showStatus = true;

      // Used to keep track of which card we're trying to build
      let cardCount = 0;

      for (const property in recipeData) {

        // If the cardCount is less than 3, that means that we're currently 
        // iterating over the data for our first three cards. We don't want to 
        // create them again since we're already displaying them, so continue 
        // with the loop.
        if (cardCount < 3) {
          cardCount++; 
          continue;
        } else {
          // Create our three new cards
          
          // Create <recipe-card>
          let newRecipe = document.createElement("recipe-card");

          // Give each new card an ID based on cardCount so that we can access 
          // them later
          newRecipe.id = cardCount;
      
          // Get data into <recipe-card>
          newRecipe.data = recipeData[property];
      
          // Attach <recipe-card> to main
          document.querySelector('main').appendChild(newRecipe);
          
          cardCount++;
        }
      }
    } else {
      // If showStatus is true, that means that the button currently says Show 
      // less, so we change it to Show more and update showStatus
      show.innerHTML = "Show more";
      showStatus = false;

      // Access the three new cards by using the IDs we gave them earlier
      let fourthCard = document.getElementById("3");
      let fifthCard = document.getElementById("4");
      let sixthCard = document.getElementById("5");

      // Call remove() on the new cards to get rid of them
      fourthCard.remove();
      fifthCard.remove();
      sixthCard.remove();
    }
  });
}