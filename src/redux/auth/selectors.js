
export const selectCurrentUser = (state) => state.auth.user;

export const selectAuthToken = (state) => state.auth.token;

export const selectUserPets = (state) => state.pets.pets;

export const selectLoadingStatus = (state) => state.pets.loading;

export const selectErrorMessage = (state) => state.pets.error;

export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
