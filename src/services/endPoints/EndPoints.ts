// ****************************** BaseUrl ************************************

export const BASE_URL = import.meta.env.VITE_SERVER_URL

// ****************************** Auth ************************************

export const AUTH_URLS = {
  login: "/api/auth/local",
  register: "/api/auth/local/register",
}

// ****************************** Products ************************************

export const PRODUCTS_URLS = {
  getProductList: "/api/products?populate=thumbnail&sort=createdAt:DESC",
  createProduct: "/api/products",
  UpdateOrDeleteProduct: (id: string) => `/api/products/${id}`
}


