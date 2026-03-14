const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://https://ecommerce-mern-seven-ochre.vercel.app/' 
  : 'http://localhost:5000';

export default API_URL;