// // lib/store.js
// import { configureStore } from "@reduxjs/toolkit";
// import searchReducer from "./features/searchSlice";

// export const store = configureStore({
//   reducer: {
//     search: searchReducer,
//     // add other reducers here
//   },
// });

import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});