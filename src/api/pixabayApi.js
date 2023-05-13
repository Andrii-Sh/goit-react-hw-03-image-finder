const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '34852218-682624240d6257474a10d77b2'

export const getSearchGallery = (query, page = 1, photosPerPage = 12) => { 
    console.log(`page in fetch: ${page}`)
    const searchParams = new URLSearchParams({
        page: page,
        q: query,
        key: API_KEY,
        image_type: "photo",
        orientation: "horizontal",
        per_page: photosPerPage,
    });   
    console.log(searchParams.toString());
    return fetch(`${BASE_URL}?${searchParams}`).then((res) => res.json());
    
}