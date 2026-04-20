const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
console.log('API URL:', import.meta.env.VITE_API_URL);

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// ✅ search recipes
export const getRecipes = (query, page = 0) => {
  return request(
    `${BASE_URL}/recipes/search?query=${encodeURIComponent(query)}&page=${page}`
  );
};

// Pull dinner recipe types for initial display in community recipes
export const getDinners = (page = 0) => {
  return request(`${BASE_URL}/recipes/dinner?page=${page}`);
};

// ✅ get recipe details
export const getRecipeDetails = (id) => {
  return request(`${BASE_URL}/recipes/${id}`);
};
