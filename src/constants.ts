export const APP_ROUTES = {
  HOME: '/',
  DETAILS: (page: number, id: number) => `/?page=${page}&details=${id}`,
  DETAILS__TEMPLATE: `/?page=:page&details=:id`,
  ABOUT: '/about',
};
