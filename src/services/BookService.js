import axios from 'axios';

const BASE_URL = '/api';

const searchBooks = async (query) => {
  const response = await axios.get(`${BASE_URL}/search.json?q=${encodeURIComponent(query)}`);
  return response.data.docs;
};


const getBookDetails = async (bookId) => {
  try {
    const formattedBookId = bookId.startsWith('/works/') ? bookId.substring(7) : bookId;
    const response = await axios.get(`${BASE_URL}/works/${formattedBookId}.json`);
    return response.data;
  } catch (error) {
    console.error("Fehler beim Abrufen der Buchdetails:", error);
    throw error;
  }
};

const getAuthorDetails = async (authorId) => {
  const response = await axios.get(`${BASE_URL}/authors/${encodeURIComponent(authorId)}.json`);
  return response.data;
};


export { searchBooks, getBookDetails, getAuthorDetails };
