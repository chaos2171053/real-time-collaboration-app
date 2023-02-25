import { createClient } from "@liveblocks/client";
import { liveblocksEnhancer } from "@liveblocks/redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const client = createClient({
  //   publicApiKey:
  //     "pk_dev_8J6eEBH8TjYzD4gJ_-_QjFksLv5zWX6ZdR3YIDPEDOy-CEAC_U6jnNp-4rM2aRAL",
  publicApiKey: process.env.REACT_APP_LIVE_BLOCKS_API_KEY as string,
});

const initialState = {
  cursor: { x: 0, y: 0 },
};

const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setCursor: (state, action) => {
      state.cursor = action.payload;
    },
  },
});

export const { setCursor } = slice.actions;

function makeStore() {
  return configureStore({
    reducer: slice.reducer,
    enhancers: [
      liveblocksEnhancer({
        client,
        presenceMapping: { cursor: true },
      }),
    ],
  });
}

const store = makeStore();

export default store;
