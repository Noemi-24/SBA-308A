import { getBreeds, createVote } from "./api.js";
import { showNotification, showLoading, createBreedCard, updateVoteCount, toggleVoteSuccess } from "./ui.js";
import { Paginator, createPaginationControls } from "./pagination.js";

const container = document.getElementById('card-container');
const paginationContainer = document.createElement('div');
paginationContainer.id = 'pagination-controls';
container.parentElement.appendChild(paginationContainer);

//create paginator instance
const paginator = new Paginator(9); // 9 cards per page

//function to render the current page
function renderCurrentPage() {
    const currentBreeds = paginator.getCurrentPageItems();
    
    if (currentBreeds.length === 0) {
        container.innerHTML = '<p class="text-center">No breeds to display</p>';
        return;
    }
  
    const html = currentBreeds.map(breed => createBreedCard(breed)).join('');
    container.innerHTML = html;
    
    //render pagination controls
    paginationContainer.innerHTML = createPaginationControls(paginator);
    
    //add event listeners for pagination buttons
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
        if (paginator.prevPage()) {
            renderCurrentPage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
        if (paginator.nextPage()) {
            renderCurrentPage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        });
    }
}

//Function to load and render breeds
async function renderBreeds() {
    try {
        showLoading(true);
        const breeds = await getBreeds();
        
        //save all breeds to paginator
        paginator.setItems(breeds);
        
        //render the first page
        renderCurrentPage();
        
        showLoading(false);
        showNotification('Breeds loaded successfully!', 'success');
    } catch (error) {
        container.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
        console.error('Error:', error);
        showLoading(false);
        showNotification('Failed to load breeds', 'danger');
    }
}

//Event delegation for vote buttons
container.addEventListener('click', async (event) => {
  const voteBtn = event.target.closest('.vote-btn');
  if (!voteBtn || !container.contains(voteBtn)) return;

  const imageId = voteBtn.dataset.id;
  if (!imageId) return;

  voteBtn.disabled = true;
  
  try {
    await createVote({ image_id: imageId, value: 1 });
    
    updateVoteCount(voteBtn, 1);
    toggleVoteSuccess(voteBtn);
    showNotification('Vote sent successfully!', 'success');
  } catch (err) {
    console.error('Error creating vote:', err.response ? err.response.data : err.message);
    showNotification('Vote could not be sent. Please try again.', 'danger');
  } finally {
    voteBtn.disabled = false;
  }
});

//Initialize app
renderBreeds();