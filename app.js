import {getBreeds, createVote, addFavourite} from "./api.js";

const renderBreeds = (breeds) => {
  const userListElement = document.getElementById('container');

  // Clear previous content
  userListElement.innerHTML = '';

  // Iterate over users and create list items
  breeds.forEach(breed => {
    const li = document.createElement('li');
    li.textContent = `Name: ${breed.name}`;
    userListElement.appendChild(li);
  });
};


