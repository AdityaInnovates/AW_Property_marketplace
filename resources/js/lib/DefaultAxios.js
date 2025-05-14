import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL.replace('/api', '') || '/';

export default axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});
