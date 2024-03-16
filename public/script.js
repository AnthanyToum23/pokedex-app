document.addEventListener('DOMContentLoaded', () => {
  // DomContent is the type listener, when the dom content load it'll fire the event
  // (or when you access the website)

  const pokedexForm = document.getElementById('pokedexForm');
  // getElementById returns the element with a value which is pokdexForm
  // pokedexForm is a variable that is equal to the element found by the function getElementbyid

  const pokedexEntries = document.getElementById('pokedexEntries');
  // pokedexEntrie retireves the getElementById in the index

  pokedexForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    // submit is a type of action

    const formData = new FormData(pokedexForm);
    // getting information from pokdexForm

    const newEntry = {};
    // now having a new variable called new entry, immediatly assigning newEntry into an empty object

    formData.forEach((value, key) => {
      newEntry[key] = value;
      // we are taking forEach piece of info we are assigning it into a subscript
      // newEntry is an object that stores information that user submitted in the form
    });

    const response = await fetch('/pokedex', {
      // fetch = a request to a webserver

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEntry)
      // body is the information that is part of the request
    });

    if (response.ok) {
      alert('Pokedex entry added successfully!');
      loadPokedexEntries();
    } else {
      alert('Failed to add entry to Pokedex');
    }
    // if the response came back as ok, then it was successful is not then the description would say
    //failed

  });

  async function loadPokedexEntries() {
    // when this function is called it will do the following things, it'll make a request to the
    // server, and it will store a response in the var called response

    try {
      const response = await fetch('/pokedex');
      if (!response.ok) {
        throw new Error('Failed to fetch Pokedex entries');
        // It will throw an error if the response is not ok
      }

      const entries = await response.json();
      displayPokedexEntries(entries);
      // retrieving response info from the request, and it displays the pokedex entries which was pulled
      // from the response using the pokedexEntries response function

    } catch (error) {
      console.error('Error fetching Pokedex entries:', error.message);
      // if the server fails to respond then an error message will pop
    }
  }

  function displayPokedexEntries(entries) {
    pokedexEntries.innerHTML = '';
    // pokedexEntries is an HTML element on the page, we are overriding that elements kids with an empty string

    if (!Array.isArray(entries)) {
      console.error('Unexpected data format received:', entries);
      return;
      // displays an error message when entries is not an array. ! is a type of unary opperator which
      // takes in one input, and it produces the inverse (! not an array)
    }

    entries.forEach(entry => {
      const entryDiv = document.createElement('div');
      entryDiv.innerHTML = `
        <p>Name: ${entry.name}</p>
        <p>Number: ${entry.number}</p>
        <p>Type: ${entry.type}</p>
        <p>Description: ${entry.description}</p>
        <hr>
      `;
      pokedexEntries.appendChild(entryDiv);
      // line 84 creates a div element and stores that element in var called entryDiv
      // 85 - 90 assigns that innerHTML of the div directly to 4 paragraphs
    });
  }
  loadPokedexEntries();
});
