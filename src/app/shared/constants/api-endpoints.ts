export const API_ENDPOINTS = {
    //Account endpoints:
    login: 'https://localhost:7084/api/Account/login',
    register: 'https://localhost:7084/api/Account/register',
    refresh: 'https://localhost:7084/api/Account/refresh',
    changePassword: 'https://localhost:7084/api/Account/changePassword',
    makeAdmin: (userId: string) => `https://localhost:7084/api/Account/${userId}/makeAdmin`,
    revokeAdmin: (userId: string) => `https://localhost:7084/api/Account/${userId}/revokeAdmin`,
    logout: 'https://localhost:7084/api/Account/logout',
    
    //Categories endpoints:
    categories: 'https://localhost:7084/api/Categories',
    categoriesWithId: (categoryId: string) => `https://localhost:7084/api/Categories/${categoryId}`,

    //Genres endpoints:
    genres: 'https://localhost:7084/api/Genres',
    genresWithId: (genreId: string) => `https://localhost:7084/api/Genres/${genreId}`,

    //Products endpoints:
    products: 'https://localhost:7084/api/Products',
    productsWithId: (productId: string) => `https://localhost:7084/api/Products/${productId}`,

    //Users endpoints:
    users: 'https://localhost:7084/api/Users',
    usersWithId: (userId: string) => `https://localhost:7084/api/Users/${userId}`,
    buyProductWithId: (userId: string, productId: string) => `https://localhost:7084/api/Users/${userId}/${productId}`
  };