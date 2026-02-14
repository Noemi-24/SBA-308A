// ui.js
export function createBreedCard(breed, voteCount =0) {
    const imageId = breed.image?.id || breed.reference_image_id || '';
    return `
        <div class="col-12 col-sm-6 col-md-4 mb-4">
            <div class="card h-100 justify-content-center shadow border-0" style="width: 22rem;">
                <div style="position: relative; padding-top: 100%; overflow: hidden;">
                    <img src="${breed.image?.url || 'https://via.placeholder.com/300x200?text=No+Image'}" id="${imageId}" 
                        class="card-img-top w-100 h-100 position-absolute top-0 start-0" 
                        alt="${breed.name}" style="object-fit: cover;">
                </div>                       
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <h5 class="card-title">${breed.name}</h5>
                    <button class="btn btn-sm vote-btn" data-id="${imageId}">
                        <i class="fa-regular fa-thumbs-up"></i>
                        <span class="vote-count">${voteCount}</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}