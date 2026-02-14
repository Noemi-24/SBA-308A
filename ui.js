// ui.js
export function createBreedCard(breed) {
  return `
    <div class="col-12 col-sm-6 col-md-4 mb-4">
      <div class="card h-100 justify-content-center shadow border-0" style="width: 22rem;">
        <div style="position: relative; padding-top: 100%; overflow: hidden;">
          <img src="${breed.image.url}" id="${breed.image.id}" 
               class="card-img-top w-100 h-100 position-absolute top-0 start-0" 
               alt="${breed.name}" style="object-fit: cover;">
        </div>                       
        <div class="card-footer d-flex justify-content-between align-items-center">
          <h5 class="card-title">${breed.name}</h5>
          <button class="btn btn-sm vote-btn" data-id="${breed.image.id}">
            <i class="fa-regular fa-thumbs-up"></i>
            <span class="vote-count">0</span>
          </button>
        </div>
      </div>
    </div>
  `;
}