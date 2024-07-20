 const cors = require('cors'); 
const express = require('express');

const axios = require('axios');
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;
const TIMEOUT = 500; 

const AUTH_URL = 'http://20.244.56.144/test/auth';
const TOKEN_URL = 'http://20.244.56.144/test/companies';

let authToken = '';

const getAuthToken = async () => {
    try {
        const response = await axios.post(AUTH_URL, {
            companyName: "afford",
            clientID: "1b2286ec-b931-4671-a3bd-6b48e8fa640f",
            clientSecret: "UNvxSbJgcFzbTgNA",
            ownerName: "Sahithi Srujana C",
            ownerEmail: "sahithi.srujanareddy2003@gmail.com",
            rollNo: "1JS21CS122"
        });
        authToken = response.data.access_token;
    } catch (error) {
        console.error('Error fetching auth token:', error.message || error);
    }
};

const fetchProductsFromCompany = async (company, category, top, minPrice, maxPrice) => {
    const url = `${TOKEN_URL}/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    try {
        const response = await axios.get(url, {
            timeout: TIMEOUT,
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching from ${url}:`, error.message || error);
        return [];
    }
};

app.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const { top = 10, page = 1, minPrice = 0, maxPrice = 10000, sort = 'price' } = req.query;

    if (!CATEGORIES.includes(categoryname)) {
        return res.status(400).json({ error: 'Invalid category' });
    }

    if (!authToken) {
        await getAuthToken();
    }

    if (top > 10) {
        const products = await Promise.all(COMPANIES.map(company => fetchProductsFromCompany(company, categoryname, top, minPrice, maxPrice)));
        let allProducts = products.flat();

        
        allProducts = Array.from(new Set(allProducts.map(p => JSON.stringify(p)))
                             .map(e => JSON.parse(e)));

        
        allProducts.sort((a, b) => a[sort] - b[sort]);

        const start = (page - 1) * top;
        const paginatedProducts = allProducts.slice(start, start + top);

        res.json({ products: paginatedProducts });
    } else {
        const products = await Promise.all(COMPANIES.map(company => fetchProductsFromCompany(company, categoryname, top, minPrice, maxPrice)));
        let allProducts = products.flat();

        
        allProducts = Array.from(new Set(allProducts.map(p => JSON.stringify(p)))
                             .map(e => JSON.parse(e)));

       
        allProducts.sort((a, b) => a[sort] - b[sort]);

        const limitedProducts = allProducts.slice(0, top);

        res.json({ products: limitedProducts });
    }
});

app.get('/categories/:categoryname/products/:productid', async (req, res) => {
    const { categoryname, productid } = req.params;

    if (!CATEGORIES.includes(categoryname)) {
        return res.status(400).json({ error: 'Invalid category' });
    }

    if (!authToken) {
        await getAuthToken();
    }

    const products = await Promise.all(COMPANIES.map(company => fetchProductsFromCompany(company, categoryname, 100, 0, 10000)));
    let allProducts = products.flat();

    
    const product = allProducts.find(p => p.id === productid);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
