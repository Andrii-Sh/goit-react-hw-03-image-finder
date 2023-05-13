import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '34852218-682624240d6257474a10d77b2'

export const getSearchGallery = async (query, page = 1, photosPerPage = 12) => { 
    const searchParams = new URLSearchParams({
        page: page,
        q: query,
        key: API_KEY,
        image_type: "photo",
        orientation: "horizontal",
        per_page: photosPerPage,
    });   
    return await axios.get(`${BASE_URL}?${searchParams}`);
    
}