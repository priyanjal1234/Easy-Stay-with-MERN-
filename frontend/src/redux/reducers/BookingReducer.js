import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalprice: 0
}

export const BookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setTotalPrice: function(state,action) {
            state.totalprice = action.payload
        }
    }
})

export default BookingSlice.reducer

export const { setTotalPrice } = BookingSlice.actions