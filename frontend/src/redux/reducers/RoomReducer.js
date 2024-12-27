import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allRooms: [],
    currentRoom: {}
}

export const RoomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        setAllRooms: function(state,action) {
            state.allRooms = action.payload
        },
        setCurrentRoom: function(state,action) {
            state.currentRoom = action.payload
        }
    }
})

export default RoomSlice.reducer

export const { setAllRooms,setCurrentRoom } = RoomSlice.actions