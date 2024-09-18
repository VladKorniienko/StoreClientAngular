const API_BASE = 'https://storeapp.azurewebsites.net/api';

export const API_ENDPOINTS = {
  //Account endpoints:
  login: API_BASE + '/Account/login',
  register: API_BASE + '/Account/register',
  refresh: API_BASE + '/Account/refresh',
  changePassword: API_BASE + '/Account/changePassword',
  makeAdmin: (userId: string) => API_BASE + `/Account/${userId}/makeAdmin`,
  revokeAdmin: (userId: string) => API_BASE + `/Account/${userId}/revokeAdmin`,
  logout: API_BASE + '/Account/logout',

  //Categories endpoints:
  categories: API_BASE + '/Categories',
  categoriesWithId: (categoryId: string) =>
    API_BASE + `/Categories/${categoryId}`,

  //Genres endpoints:
  genres: API_BASE + '/Genres',
  genresWithId: (genreId: string) => API_BASE + `/Genres/${genreId}`,

  //Products endpoints:
  products: API_BASE + '/Products',
  productsWithId: (productId: string) => API_BASE + `/Products/${productId}`,

  //Users endpoints:
  users: API_BASE + '/Users',
  usersWithId: (userId: string) => API_BASE + `/Users/${userId}`,
  buyProductWithId: (userId: string, productId: string) =>
    API_BASE + `/Users/${userId}/${productId}`,
};
