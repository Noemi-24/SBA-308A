import {getBreeds, createVote} from "./api.js";
import {createBreedCard} from "./ui.js"; 

const container = document.getElementById('card-container');

// Global variables for pagination
let allBreeds = [];
let currentPage = 0;
let breedsPerPage = 6; 

//load votes from localStorage
const voteCounts = JSON.parse(localStorage.getItem('dogVotes')) || {};

// Load all breeds and show first page
async function loadBreeds() {   
    try {
        allBreeds = await getBreeds(); 
        console.log(`Total breeds loaded: ${allBreeds.length}`);
        renderCurrentPage(); 
    } catch (error) {
        container.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
        console.error('Error:', error);
    }
}

// Render breeds with pagination
function renderCurrentPage() {
    const start = currentPage * breedsPerPage;
    const end = start + breedsPerPage;
    const breedsToShow = allBreeds.slice(start, end);
    
    const html = breedsToShow.map(breed => {
        const imageId = breed.image?.id || breed.reference_image_id || '';
        const currentVotes = voteCounts[imageId] || 0;
        return createBreedCard(breed, currentVotes);
    }).join('');

    container.innerHTML = html;
    
    // update page info
    const totalPages = Math.ceil(allBreeds.length / breedsPerPage);
    document.getElementById('page-info').textContent = `Page ${currentPage + 1} of ${totalPages}`;
    
    // Disable buttons if on first or last page
    document.getElementById('prev-btn').disabled = currentPage === 0;
    document.getElementById('next-btn').disabled = currentPage >= totalPages - 1;
}

// Previous button
document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        renderCurrentPage();
    }
});

// Next button
document.getElementById('next-btn').addEventListener('click', () => {
    const totalPages = Math.ceil(allBreeds.length / breedsPerPage);
    if (currentPage < totalPages - 1) {
        currentPage++;
        renderCurrentPage();
    }
});


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

            // Update votes in memory
            voteCounts[imageId] = (voteCounts[imageId] || 0) + 1;
            console.log(`Vote added for ${imageId}. New count: ${voteCounts[imageId]}`); // debug
            
            // Save to localStorage
            localStorage.setItem('dogVotes', JSON.stringify(voteCounts));

            // Update UI
            const countEl = voteBtn.querySelector('.vote-count');
            if (countEl) {
                countEl.textContent = voteCounts[imageId];
            }

            voteBtn.classList.add('btn-success');
            setTimeout(() => voteBtn.classList.remove('btn-success'), 800);
        } catch (err) {
            console.error('Error creating post:', err.response ? err.response.data : err.message);
            alert('Vote can not be sent. Please try again.');
        } finally {
            voteBtn.disabled = false;
        }
        return;
    }

});

// Call the loadBreeds function
loadBreeds(); 
