const quote = document.querySelector("#quote");
const author = document.querySelector("#author");
const previous = document.querySelector("#previous");
const random = document.querySelector("#random");
const next = document.querySelector("#next");
const dropdown = document.getElementById("search-select");

const baseApi = "https://api.quotable.io";

// Define a global array to store fetched quotes
let fetchedQuotes = [];
let currentQuoteIndex = -1; // Keep track of the index of the current quote

const getQuote = async () => {
  try {
    const response = await fetch(`${baseApi}/random`);
    const data = await response.json();

    fetchedQuotes.push(data); 
    currentQuoteIndex = fetchedQuotes.length - 1;
    displayQuote(data); 
  } catch (error) {
    console.error("Error fetching quote:", error);
  }
};

getQuote();

// Function to get a quote based on tags
const getQuoteByCategory = async (category) => {
  try {
    const response = await fetch(`${baseApi}/quotes?tags=${category}`);
    const data = await response.json();

    fetchedQuotes.push(data);

    currentQuoteIndex = fetchedQuotes.length - 1;
    displayQuote(data);
  } catch (error) {
    window.alert("Ops, something went wrong");
  }
};

// Function to display quote and author
const displayQuote = (data) => {
  if (!data.content) {
    getQuote();
    return;
  }
  quote.innerHTML = `"${data.content}"`;
  author.innerHTML = data.author;

  // Add the displayed quote to the sequence and update the current index
  displayedQuotes.push(data);
  currentQuoteIndex++;
};

// Function to get the previous quote
const getPreviousQuote = () => {
  if (currentQuoteIndex > 0) {
    // Check if there is a previous quote in the array
    currentQuoteIndex--; // Decrement the current index
    const previousQuote = fetchedQuotes[currentQuoteIndex]; // Get the previous quote
    displayQuote(previousQuote); // Display the previous quote
  } else {
    console.log("No previous quote available");
  }
};

// Function to get the next quote
const getNextQuote = () => {
  if (currentQuoteIndex < fetchedQuotes.length - 1) {
    // Check if there is a next quote in the array
    currentQuoteIndex++; // Increment the current index
    const nextQuote = fetchedQuotes[currentQuoteIndex]; // Get the next quote
    displayQuote(nextQuote); // Display the next quote
  } else {
    console.log("No next quote available");
    getQuote(); // Fetch a new quote if there are no more stored quotes
  }
};

// Function to get a random quote

const getRandomQuote = async () => {
  if (fetchedQuotes.length === 0) {
    await getQuote();
  }
  // const randomIndex = Math.floor(Math.random() * fetchedQuotes.length);
  // const randomQuote = fetchedQuotes[randomIndex];
  // displayQuote(randomQuote);
  getQuote(); 
};

// Event listeners for buttons
random.addEventListener("click", getRandomQuote);
previous.addEventListener("click", getPreviousQuote);
next.addEventListener("click", getNextQuote);

// Event listener for dropdown
dropdown.addEventListener("change", function () {
  const selectedValue = dropdown.value;
  if (selectedValue !== "All") {
    getQuoteByCategory(selectedValue);
  } else {
    // If the selected value is "All", get a random quote
    getRandomQuote();
  }
});

//for mode change
document.addEventListener("DOMContentLoaded", function () {
  const changeSpan = document.querySelector(".change");
  const modeDiv = document.querySelector(".mode");
  const quote = document.getElementById("quote");
  const author = document.getElementById("author");
  const heading = document.getElementById("heading");
  const options = document.querySelectorAll("#search-select option");
  const container = document.getElementsByClassName("container")[0]; // Select the first element with class "container"
  const searchSelect = document.getElementById("search-select");

  changeSpan.addEventListener("click", function () {
    const currentMode = changeSpan.textContent.trim();
    if (currentMode === "OFF") {
      // Switch to dark mode
      modeDiv.classList.add("dark-mode");
      document.body.style.backgroundColor = "#333"; 
      container.style.backgroundColor = "#222"; 
      quote.style.color = "#fff";
      author.style.color = "#fff";
      heading.style.color = "#fff";
      dropdown.style.color = "#f8f8f8";
      searchSelect.style.backgroundColor = "#333"; 
    
      options.forEach(option => {
        option.style.color = "#fff";
});
      changeSpan.textContent = "ON";
    } else {
      // Switch to light mode
      modeDiv.classList.remove("dark-mode");
      document.body.style.backgroundColor = "#fff";
      container.style.backgroundColor = "#f8f8f8";
      heading.style.color = "#000";
      quote.style.color = "#000";
      author.style.color = "#000";
      dropdown.style.color = "#000";

      options.forEach(option => {
        option.style.color = "#f8f8f8";
      });
      searchSelect.style.backgroundColor = "#fff"; 
      container.style.backgroundColor = "#fff"; 

      changeSpan.textContent = "OFF";
    }
  });
});



