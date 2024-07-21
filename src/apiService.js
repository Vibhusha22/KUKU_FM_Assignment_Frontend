import axios from "axios";

const API_URL = "http://localhost:3000/books";

const getAudioBooks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching audiobooks:", error);
    throw error;
  }
};

const getAudioBookById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching audiobook with id ${id}:`, error);
    throw error;
  }
};

const addReview = async (id, review) => {
  try {
    const response = await axios.post(`${API_URL}/${id}/review`, review);
    return response.data;
  } catch (error) {
    console.error(`Error adding review to audiobook with id ${id}:`, error);
    throw error;
  }
};

const deleteReview = async (id, reviewIndex) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}/review/${reviewIndex}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting review from audiobook with id ${id}:`, error);
    throw error;
  }
};

export default {
  getAudioBooks,
  getAudioBookById,
  addReview,
  deleteReview,
};
