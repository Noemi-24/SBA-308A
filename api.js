import axios from 'axios';

const API_KEY = 'live_QLUwjiRib0GOqQSvuVN1JxIrLB8ApRK87HLA12rl9l85BtBWmYxO7gs4vUHrrxnX';

const apiClient = axios.create({
  baseURL: 'https://api.thedogapi.com/v1', 
  timeout: 5000,
  headers: {
    'x-api-key': API_KEY,
  },
});

// Get all breeds
export const getBreeds = async () => {
  try {
    const response = await apiClient.get('/breeds', {
        params: {
            limit: 200, 
            order: 'ASC', 
        }
    }); 
    return response.data; // The actual data is in the 'data' property of the response
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw error; // Propagate the error for the calling function to handle
  }
};

function validateVote(data) {
  if (!data || typeof data !== 'object') throw new Error('Invalid data');
  if (!data.image_id || typeof data.image_id !== 'string') throw new Error('image_id is missing or not a string');
  if (typeof data.value !== 'number') throw new Error('value is missing or not a number');
}

// Post a vote
export const createVote = async (postData) => {
  try {
    validateVote(postData);
    const response = await apiClient.post('/votes', postData); 
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

