const API_BASE_URL = 'http://20.244.56.144/test/companies/AMZ'; // Replace with your backend URL

export const fetchProducts = async (categoryname, params) => {
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxNDU5NDQ0LCJpYXQiOjE3MjE0NTkxNDQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjEyYTFmZTEwLThkMjYtNDZhZS1hNTBjLWRiZDIwM2UyYWYzYSIsInN1YiI6InByYWp3YWxiMDIwOEBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJqc3NhdGViIiwiY2xpZW50SUQiOiIxMmExZmUxMC04ZDI2LTQ2YWUtYTUwYy1kYmQyMDNlMmFmM2EiLCJjbGllbnRTZWNyZXQiOiJZb3RQdmxyV2NBUE5vT2lCIiwib3duZXJOYW1lIjoiUHJhandhbEIiLCJvd25lckVtYWlsIjoicHJhandhbGIwMjA4QGdtYWlsLmNvbSIsInJvbGxObyI6IjFKUzIxQ1MxMDUifQ.Ka-XgNg_DWf6HVqfkcah5kx3aD6mO2AdM0Rnl7tIhAQ"
    const response = await fetch(`${API_BASE_URL}/categories/${categoryname}/products?${new URLSearchParams(params)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductDetail = async (categoryname, productid) => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryname}/products/${productid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product detail:', error);
    throw error;
  }
};