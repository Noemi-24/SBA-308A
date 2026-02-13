import axios from 'axios';

const API_KEY = 'live_QLUwjiRib0GOqQSvuVN1JxIrLB8ApRK87HLA12rl9l85BtBWmYxO7gs4vUHrrxnX';
axios.defaults.baseURL = "https://api.thedogapi.com/v1";
axios.defaults.headers.common["x-api-key"] = API_KEY;


// Get all breeds
export const getBreeds = async () => {
  try {
    const response = await axios.get('/breeds'); 
    return response.data; // The actual data is in the 'data' property of the response
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw error; // Propagate the error for the calling function to handle
  }
};

// Post a vote
export const votePost = async (postData) => {
  try {
    const response = await axios.post('/votes', postData); 
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

//Post a favourite
export const favouritePost = async (postData) => {
  try {
    const response = await axios.post('/favourites', postData); 
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};


// Export the functions for use in other files
// export { getPosts, createPost, getUser };
