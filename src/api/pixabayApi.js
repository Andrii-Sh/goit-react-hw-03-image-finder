const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '34852218-682624240d6257474a10d77b2'

export const getSearchGallery = (query) => { 
    const searchParams = new URLSearchParams({
        page: 1,
        q: query,
        key: API_KEY,
        image_type: "photo",
        orientation: "horizontal",
        per_page: 12,
});   
    return fetch(`${BASE_URL}?${searchParams}`).then((res) => res.json());
}