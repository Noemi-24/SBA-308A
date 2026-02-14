export function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;
    notification.style.zIndex = '9999';
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade');
        setTimeout(() => notification.remove(), 150);
    }, 2000);
}

export function showLoading(show) {
    const loadingEl = document.getElementById('loading');
    if (loadingEl) {
        loadingEl.style.display = show ? 'block' : 'none';
    }
}

export function createBreedCard(breed) {
    return `
        <div class="col-md-4 mb-4">
            <div class="card h-100" style="width: 22rem;">
                <div style="position: relative; padding-top: 100%; overflow: hidden;">
                    <img src="${breed.image.url}" 
                        id="${breed.image.id}" 
                        class="card-img-top w-100 h-100 position-absolute top-0 start-0" 
                        alt="${breed.name}"
                        style="object-fit: cover;">
                </div>                       
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-0">${breed.name}</h5>
                    <button class="btn btn-sm vote-btn" data-id="${breed.image.id}" aria-label="Vote for ${breed.name}">
                        <i class="fa-regular fa-thumbs-up" aria-hidden="true"></i>
                        <span class="vote-count">0</span>
                        <span class="visually-hidden">votos</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

export function updateVoteCount(button, increment = 1) {
    const countEl = button.querySelector('.vote-count');
    if (countEl) {
        const current = Number(countEl.textContent) || 0;
        countEl.textContent = String(current + increment);
    }
}

export function toggleVoteSuccess(button) {
    button.classList.add('btn-success');
    setTimeout(() => button.classList.remove('btn-success'), 800);
}