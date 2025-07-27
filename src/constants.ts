export const APP_ROUTES = {
  HOME__TEMPLATE: '/page/:page',
  HOME: (page: number) => `/page/${page}`,
  DETAILS: (page: number, id: number) => `/page/${page}&details/${id}`,
  DETAILS__TEMPLATE: `/page/:page&details/:id`,
  ABOUT: '/about',
};
