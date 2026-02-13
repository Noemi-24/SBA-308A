import axios from 'axios';

const API_KEY = 'live_QLUwjiRib0GOqQSvuVN1JxIrLB8ApRK87HLA12rl9l85BtBWmYxO7gs4vUHrrxnX';
// axios.defaults.baseURL = "https://api.thedogapi.com/v1";
// axios.defaults.headers.common["x-api-key"] = API_KEY;


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
    const response = await apiClient.get('/breeds'); 
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

//Post a favourite
export const addFavourite = async (postData) => {
  try {
    const response = await apiClient.post('/favourites', postData); 
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};


// Export the functions for use in other files
// export { getPosts, createPost, getUser };

// dentro del cathch de cada función, puedes manejar el error de manera más específica, por ejemplo:
// if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     } else if (error.request) {
//       // The request was made but no response was received
//       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//       // http.ClientRequest in node.js
//       console.log(error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log('Error', error.message);
//     }
//     console.log(error.config);