import { createClient } from "@liveblocks/client";
import { liveblocksEnhancer } from "@liveblocks/redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const client = createClient({
  //   publicApiKey:
  //     "pk_dev_8J6eEBH8TjYzD4gJ_-_QjFksLv5zWX6ZdR3YIDPEDOy-CEAC_U6jnNp-4rM2aRAL",
  publicApiKey: process.env.REACT_APP_LIVE_BLOCKS_API_KEY as string,
});

const initialState: any = {
  todo: [],
  draft: "",
  isTyping: false,
};

const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setDraft: (state, action) => {
      state.isTyping = action.payload === "" ? false : true;
      state.draft = action.payload;
    },
    addTodo: (state) => {
      state.isTyping = false;
      state.todos.push({ text: state.draft });
      state.draft = "";
    },
    deleteTodo: (state, action) => {
      state.todos.splice(action.payload, 1);
    },
  },
});

export const { setDraft, addTodo, deleteTodo } = slice.actions;

function makeStore() {
  return configureStore({
    reducer: slice.reducer,
    enhancers: [
      liveblocksEnhancer({
        client,
        storageMapping: { todos: true },
        presenceMapping: { isTyping: true },
      }),
    ],
  });
}

const store = makeStore();

export default store;
