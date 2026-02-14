import {getBreeds, createVote} from "./api.js";
import {createBreedCard} from "./ui.js"; 

const container = document.getElementById('card-container');

// Function to render the API response
async function renderBreeds() {   
    
    try {
        const breeds = await getBreeds(); // Using exported function
        
        // Creating HTML structure
        const html = breeds.map(breed => createBreedCard(breed)).join('');
        
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
            console.error('Error creating post:', err.response ? err.response.data : err.message);
            alert('Vote can not be sent. Please try again.');
        } finally {
            voteBtn.disabled = false;
        }
        return;
    }

});

// Call the render function
renderBreeds();



{/* <i class="fa-solid fa-thumbs-up"></i>   pulgar arriba relleno*/}
{/* <i class="fa-solid fa-heart"></i>   Corazón relleno */}
{/* <i class="fa-solid fa-thumbs-down"></i>   Pulgar abajo relleno */}
{/* <i class="fa-regular fa-thumbs-down"></i>   Pulgar abajo sin relleno */}