import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";
import { handleRequestError } from "./reduxUtil";
import { createMessageInActiveChat } from "./messagesSlice";


const chatsSlice = createSlice({
  name: "chats",
  initialState: {
    // The `userChats` object maps `chatId` keys to a chat object.
    // Example: { "chatId1": chatObject1, "chatId2": chatObject2, }
    // Every single chat object should have their messages array filled in with real objects, rather than id's
    // when the chats are initially loaded, there should be one dispatch, then a loop of dispatches (similar to existing in Home.js)
    // one for populating the chats (normally, with the messages array just with id's)
    // and then a loop that goes and populates the actual message objects for each chat
    userChats: {},
    activeChat: null, // chat object, with the messages array filled in with real objects, rather than id's
    loading: false,
    error: null // string message
  },
  reducers: {
  },
});


export const { setActiveChat, setError } = chatsSlice.actions;
export default chatsSlice.reducer;

/**
 * All code written by team.
 * Helped with understanding:
 * - https://redux-toolkit.js.org/api/createAsyncThunk
 * - https://www.youtube.com/playlist?list=PLC3y8-rFHvwheJHvseC3I0HuYI2f46oAK
 * - Other general Redux docs
 * - Chat GPT
 * - Stack Overflow / Google
 */
