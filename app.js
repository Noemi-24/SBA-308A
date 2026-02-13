import {getBreeds, createVote, addFavourite} from "./api.js";

const container = document.getElementById('card-container');

// Function to render the API response
async function renderBreeds() {   
    
    try {
        const breeds = await getBreeds(); // Using exported function
        
        // Creating HTML structure
        const html = breeds.map(breed => `
            <div class="card" style="width: 18rem;">
                <img src="${breed.image.url}" id="${breed.image.id} "class="card-img-top" alt="${breed.name}">
                <div class="card-body">
                    <h5 class="card-title">${breed.name}</h5>
                    <p class="card-text">${breed.description}</p>
                    <p class="card-text"><strong>Origin: </strong>${breed.origin}</p>
                    <p class="card-text"><strong>Temperament: </strong>${breed.temperament}</p>
                    <p class="card-text"><strong>Weight: </strong>${breed.weight.imperial}</p>
                    <p class="card-text"><strong>Height: </strong>${breed.height.imperial}</p>
                    <p class="card-text"><strong>Life Span: </strong>${breed.life_span}</p>
                </div>
                <div>
                    <button class="btn btn-sm btn-primary vote-btn" data-id="${breed.image.id}" aria-label="Votar por esta imagen">
                        <i class="fa-solid fa-thumbs-up" aria-hidden="true"></i>
                        <span class="vote-count">12</span>
                        <span class="visually-hidden"> votos</span>
                    </button>
                    <button class="btn btn-icon fav-btn" data-id="BJa4kxc4X" aria-pressed="false" aria-label="Agregar a favoritos">
                        <i class="fa-regular fa-heart" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = html;
    } catch (error) {
        container.innerHTML = `<p>Error: ${error.message}</p>`;
        console.error('Error:', error);
    }
}


container.addEventListener('click', async (event) => {
  // Detect vote button click
  const voteBtn = event.target.closest('.vote-btn');
  if (voteBtn && container.contains(voteBtn)) {
    const imageId = voteBtn.dataset.id;
    if (!imageId) return;

    voteBtn.disabled = true;
    try {
      // Call API to create a vote
      await createVote({ image_id: imageId, value: 1 });

      //Update vote count in the UI
      const countEl = voteBtn.querySelector('.vote-count');
      if (countEl) {
        const current = Number(countEl.textContent) || 0;
        countEl.textContent = String(current + 1);
      }

      voteBtn.classList.add('btn-success');
      setTimeout(() => voteBtn.classList.remove('btn-success'), 800);
    } catch (err) {
      console.error(err);
      alert('Vote can not be sent. Please try again.');
    } finally {
      voteBtn.disabled = false;
    }
    return;
  }

  // Detect favorite button click
  const favBtn = event.target.closest('.fav-btn');
  if (favBtn && container.contains(favBtn)) {
    const imageId = favBtn.dataset.id;
    if (!imageId) return;

    favBtn.disabled = true;
    try {
      await addFavourite({ image_id: imageId });

      // Toggle favorite state in the UI
      const isFav = favBtn.getAttribute('aria-pressed') === 'true';
      favBtn.setAttribute('aria-pressed', String(!isFav));
      favBtn.classList.toggle('is-fav', !isFav);
    } catch (err) {
      console.error(err);
      alert('Could not add to favorites. Please try again.');
    } finally {
      favBtn.disabled = false;
    }
    return;
  }
});

// Call the render function
renderBreeds();



